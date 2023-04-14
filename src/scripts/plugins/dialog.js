import {
  reactive,
  toRefs,
  computed,
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
  nextTick
} from 'vue';
import createVueApp from '../config/ssr';
import MdcDialog from '../components/dialog/mdc-dialog.vue';
import { isObject } from '../utils/typeof';
import { createDiv, removeDiv } from '../utils/div';

// Define confirm dialog constants
const UI_PRO_DIALOG = {
  id: 'balmui-pro-dialog'
};

const DEFAULT_OPTIONS = {
  // Dialog
  className: '',
  title: '',
  content: '',
  actionConfig: [],
  maskClosable: false,
  // Custom component
  components: {},
  component: '',
  modelValueType: 'object',
  modelValueDefaults: {},
  modelValueKeys: [],
  attrOrProp: {},
  event: 'action',
  // Action handler
  handler: () => {},
  // Others
  closeOnSave: true,
  refreshOnSave: false,
  refresh: location.reload
};

const PRO_DIALOG_BUTTON_TYPES = {
  submit: 'submit',
  cancel: 'cancel',
  close: 'close'
};

let globalRegistration = [];
let globalOptions = DEFAULT_OPTIONS;

const template = `<mdc-dialog :class="className" :open="open" :title="title" :mask-closable="maskClosable" @close="handleClose">
  <template v-if="component">
    <component :is="component" v-model="modelValue" v-bind="attrOrProp" @[event]="handleComponentAction"></component>
  </template>
  <div v-else class="mdc-dialog__custom-content" v-html="content"></div>
  <template v-if="actionConfig.length" #actions>
    <template v-for="(buttonData, buttonIndex) in actionConfig">
      <ui-button
        v-if="buttonData.type === PRO_DIALOG_BUTTON_TYPES.submit"
        v-debounce="handleDialogAction(buttonData)"
        v-bind="buttonData.attrOrProp || {}"
      >
        {{ buttonData.text }}
      </ui-button>
      <ui-button
        v-else
        v-bind="buttonData.attrOrProp || {}"
        @click="handleDialogAction(buttonData)"
      >
        {{ buttonData.text }}
      </ui-button>
    </template>
  </template>
</mdc-dialog>`;

function createElement(id) {
  return document.getElementById(id) || createDiv(id);
}

function removeElement(el) {
  removeDiv(el);
}

function createDialog(options) {
  const el = createElement(UI_PRO_DIALOG.id);
  const { components, ...config } = options;

  let dialogApp = createVueApp({
    el,
    name: 'ProDialog',
    components: {
      MdcDialog,
      ...components
    },
    setup() {
      const {
        modelValueType,
        modelValueDefaults,
        modelValueKeys,
        ...otherConfig
      } = config;

      const currentModelValue =
        modelValueType === 'object'
          ? modelValueKeys.length
            ? modelValueKeys.reduce((formData, key) => {
                formData[key] = modelValueDefaults[key];
                return formData;
              }, {})
            : Object.assign({}, modelValueDefaults)
          : isObject(modelValueDefaults)
          ? ''
          : modelValueDefaults;

      const state = reactive({
        open: false,
        modelValue: currentModelValue,
        modelValueSource: currentModelValue,
        ...otherConfig
      });

      const useDialogAction = computed(() => !!state.actionConfig.length);

      onMounted(() => {
        nextTick(() => {
          if (config.content || config.component) {
            state.open = true;
          } else {
            throw new Error(
              '[$dialog]: Missing `content` or `component` option'
            );
          }
        });
      });

      onBeforeUnmount(() => removeElement(el));

      function handleClose(onSave = false) {
        if (dialogApp) {
          state.open = false;

          dialogApp.unmount(`#${UI_PRO_DIALOG.id}`);

          if (onSave && state.refreshOnSave) {
            state.refresh();
          }
        }
      }

      function handleComponentAction(action, result) {
        if (!useDialogAction.value) {
          const actionResult = {
            data: state.modelValue,
            dataSource: state.modelValueSource,
            ...result
          };

          switch (action.type) {
            case PRO_DIALOG_BUTTON_TYPES.submit:
              if (state.closeOnSave) {
                handleClose(true);
              }

              state.handler(action, actionResult, () => {
                handleClose(true);
              });
              break;
            case PRO_DIALOG_BUTTON_TYPES.cancel:
            case PRO_DIALOG_BUTTON_TYPES.close:
              handleClose();
              break;
          }

          if (action.type !== PRO_DIALOG_BUTTON_TYPES.submit) {
            state.handler(action, actionResult, handleClose);
          }
        }
      }

      function handleDialogAction(action) {
        if (useDialogAction.value) {
          const actionResult = {
            data: state.modelValue,
            dataSource: state.modelValueSource
          };

          let debounceConfig = {};

          switch (action.type) {
            case PRO_DIALOG_BUTTON_TYPES.submit:
              debounceConfig = {
                callback: () => {
                  if (state.closeOnSave) {
                    handleClose(true);
                  }

                  state.handler(action, actionResult, () => {
                    handleClose(true);
                  });
                },
                delay: action.delay || 250
              };
              break;
            case PRO_DIALOG_BUTTON_TYPES.cancel:
            case PRO_DIALOG_BUTTON_TYPES.close:
              handleClose();
              break;
          }

          return action.type === PRO_DIALOG_BUTTON_TYPES.submit
            ? debounceConfig
            : state.handler(action, actionResult, handleClose);
        }
      }

      return {
        PRO_DIALOG_BUTTON_TYPES,
        ...toRefs(state),
        handleClose,
        handleComponentAction,
        handleDialogAction
      };
    },
    template
  });

  return dialogApp;
}

function dialog(customOptions = {}) {
  const options = Object.assign({}, globalOptions, customOptions);

  const dialogApp = createDialog(options);

  if (globalRegistration.length) {
    globalRegistration.forEach((component) => dialogApp.use(component));
  }

  dialogApp.mount(`#${UI_PRO_DIALOG.id}`);
}

function install(app, options = {}) {
  const { globalComponents, ...otherOptions } = options;
  globalOptions = Object.assign({}, DEFAULT_OPTIONS, otherOptions);

  if (Array.isArray(globalComponents)) {
    globalRegistration = globalComponents;
  }

  app.config.globalProperties.$dialog = dialog;
  app.provide('dialog', dialog);
}

const $dialog = {
  install
};
const useDialog = () => dialog;

export default $dialog;
export { install, useDialog };
