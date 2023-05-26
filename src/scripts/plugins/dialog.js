import Vue from 'vue';
import MdcDialog from '../components/dialog/mdc-dialog.vue';
import { isObject } from '../utils/typeof';

const DEFAULT_OPTIONS = {
  // Basic
  id: null, // NOTE: control whether the dialog is destroyed
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
  listeners: {},
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

let globalOptions = DEFAULT_OPTIONS;

const template = `<mdc-dialog :id="id" :class="className" :open="open" :title="title" :mask-closable="maskClosable" @close="handleClose">
  <template v-if="customComponent">
    <component :is="customComponent" v-model="modelValue" v-bind="attrOrProp" v-on="listeners" @[event]="handleComponentAction"></component>
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

function createDialog(options) {
  const { id, components, component, ...config } = options;

  let dialogApp = new Vue({
    el: document.getElementById(id) || document.createElement('div'),
    name: 'ProDialog',
    components: {
      MdcDialog,
      ...components
    },
    data() {
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

      return {
        PRO_DIALOG_BUTTON_TYPES,
        id,
        open: false,
        customComponent: component,
        modelValue: currentModelValue,
        modelValueSource: currentModelValue,
        ...otherConfig
      };
    },
    computed: {
      useDialogAction() {
        return !!this.actionConfig.length;
      }
    },
    mounted() {
      if (config.content || component) {
        document.body.appendChild(this.$el);

        this.open = true;
      } else {
        throw new Error('[$dialog]: Missing `content` or `component` option');
      }
    },
    methods: {
      handleClose(onSave = false) {
        if (dialogApp) {
          this.open = false;

          if (!id) {
            document.body.removeChild(this.$el);
            dialogApp = null;
          }

          if (onSave && this.refreshOnSave) {
            this.refresh();
          }
        }
      },
      handleComponentAction(action, result) {
        if (!this.useDialogAction) {
          const actionResult = {
            data: this.modelValue,
            dataSource: this.modelValueSource,
            ...result
          };

          switch (action.type) {
            case PRO_DIALOG_BUTTON_TYPES.submit:
              if (this.closeOnSave) {
                this.handleClose(true);
              }

              this.handler(action, actionResult, () => {
                this.handleClose(true);
              });
              break;
            case PRO_DIALOG_BUTTON_TYPES.cancel:
            case PRO_DIALOG_BUTTON_TYPES.close:
              this.handleClose();
              break;
          }

          if (action.type !== PRO_DIALOG_BUTTON_TYPES.submit) {
            this.handler(action, actionResult, this.handleClose);
          }
        }
      },
      handleDialogAction(action) {
        if (this.useDialogAction) {
          let debounceConfig = {};

          switch (action.type) {
            case PRO_DIALOG_BUTTON_TYPES.submit:
              debounceConfig = {
                callback: () => {
                  if (this.closeOnSave) {
                    this.handleClose(true);
                  }

                  this.handler(
                    action,
                    // NOTE: direct assignment in here
                    {
                      data: this.modelValue,
                      dataSource: this.modelValueSource
                    },
                    () => {
                      this.handleClose(true);
                    }
                  );
                },
                delay: action.delay || 250
              };
              break;
            case PRO_DIALOG_BUTTON_TYPES.cancel:
            case PRO_DIALOG_BUTTON_TYPES.close:
              this.handleClose();
              break;
          }

          return action.type === PRO_DIALOG_BUTTON_TYPES.submit
            ? debounceConfig
            : this.handler(
                action,
                {
                  data: this.modelValue,
                  dataSource: this.modelValueSource
                },
                this.handleClose
              );
        }
      }
    },
    template
  });

  return dialogApp;
}

function dialog(customOptions = {}) {
  const options = Object.assign({}, globalOptions, customOptions);

  createDialog(options);
}

function install(Vue, options = {}) {
  globalOptions = Object.assign({}, DEFAULT_OPTIONS, options);

  Vue.prototype.$dialog = dialog;
}

const $dialog = {
  install
};
const useDialog = () => dialog;

export default $dialog;
export { useDialog };
