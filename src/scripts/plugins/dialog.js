import Vue from 'vue';
import MdcDialog from '../components/dialog/mdc-dialog';
import getType from '../utils/typeof';

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
  attrOrProp: {},
  event: 'action',
  // Action handler
  handler: () => {}
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

function createDialog(options) {
  const { components, ...config } = options;

  dialogApp = new Vue({
    el: document.createElement('div'),
    name: 'ProDialog',
    components: {
      MdcDialog,
      ...components
    },
    data() {
      const { modelValueType, modelValueDefaults, ...otherConfig } = config;

      const currentModelValue =
        modelValueType === 'object'
          ? Object.assign({}, modelValueDefaults)
          : getType(modelValueDefaults) === 'object'
          ? ''
          : modelValueDefaults;

      return {
        open: false,
        modelValue: currentModelValue,
        ...otherConfig
      };
    },
    computed: {
      useDialogAction() {
        return !!this.actionConfig.length;
      }
    },
    mounted() {
      if (this.component) {
        document.body.appendChild(this.$el);

        this.open = true;
      } else {
        throw new Error('[$dialog]: Missing component');
      }
    },
    methods: {
      handleClose() {
        if (dialogApp) {
          this.open = false;

          document.body.removeChild(this.$el);
          dialogApp = null;
        }
      },
      handleComponentAction(action, result) {
        if (!this.useDialogAction) {
          const actionResult = {
            data: this.modelValue,
            ...result
          };

          this.handleAction(action, actionResult);

          this.handler(action, actionResult, this.handleClose);
        }
      },
      handleDialogAction(action) {
        if (this.useDialogAction) {
          const actionResult = {
            data: this.modelValue
          };

          const debounceConfig = this.handleAction(action, actionResult);

          return action.type === 'submit'
            ? debounceConfig
            : this.handler(action, actionResult, this.handleClose);
        }
      },
      handleAction(action, actionResult) {
        let debounceConfig = {};

        switch (action.type) {
          case 'submit':
            debounceConfig = {
              callback: () => {
                this.handler(action, actionResult, this.handleClose);
              },
              delay: action.delay || 250
            };
            break;
          case 'cancel':
          case 'close':
            this.handleClose();
            break;
        }

        return debounceConfig;
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
