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
import getType from '../utils/typeof';
import { createDiv, removeDiv } from '../utils/div';

// Define confirm dialog constants
const UI_PRO_DIALOG = {
  id: 'balmui-pro-dialog'
};

const DEFAULT_OPTIONS = {
  // Dialog
  className: '',
  title: '',
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

let globalOptions = DEFAULT_OPTIONS;
let dialogApp;

const template = `<mdc-dialog :class="className" :open="open" :title="title" :mask-closable="maskClosable" @close="handleClose">
  <component :is="component" v-model="modelValue" v-bind="attrOrProp" @[event]="handleComponentAction"></component>
  <template #actions>
    <template v-for="(buttonData, buttonIndex) in actionConfig">
      <ui-button
        v-if="buttonData.type === 'submit'"
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

  dialogApp = createVueApp({
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
          : getType(modelValueDefaults) === 'object'
          ? ''
          : modelValueDefaults;

      const state = reactive({
        open: false,
        modelValue: currentModelValue,
        ...otherConfig
      });

      const useDialogAction = computed(() => !!state.actionConfig.length);

      onMounted(() =>
        nextTick(() => {
          if (state.component) {
            state.open = true;
          } else {
            throw new Error('[$dialog]: Missing component');
          }
        })
      );

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
            ...result
          };

          switch (action.type) {
            case 'submit':
              if (state.closeOnSave) {
                handleClose(true);
              }

              state.handler(action, actionResult, () => {
                handleClose(true);
              });
              break;
            case 'cancel':
            case 'close':
              handleClose();
              break;
          }

          if (action.type !== 'submit') {
            state.handler(action, actionResult, handleClose);
          }
        }
      }

      function handleDialogAction(action) {
        if (useDialogAction.value) {
          const actionResult = {
            data: state.modelValue
          };

          let debounceConfig = {};

          switch (action.type) {
            case 'submit':
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
            case 'cancel':
            case 'close':
              handleClose();
              break;
          }

          return action.type === 'submit'
            ? debounceConfig
            : state.handler(action, actionResult, handleClose);
        }
      }

      return {
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

  createDialog(options).mount(`#${UI_PRO_DIALOG.id}`);
}

function install(app, options = {}) {
  globalOptions = Object.assign({}, DEFAULT_OPTIONS, options);

  app.config.globalProperties.$dialog = dialog;
  app.provide('dialog', dialog);
}

const $dialog = {
  install
};
const useDialog = () => dialog;

export default $dialog;
export { install, useDialog };
