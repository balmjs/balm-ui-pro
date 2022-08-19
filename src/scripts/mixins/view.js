import { isFunction } from '../utils/typeof';

const FORM_VIEW_EVENTS = {
  updateFormItem: 'change:x',
  action: 'action'
};

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    model: {
      type: String,
      required: true
    },
    modelConfig: {
      type: [Array, Function, Boolean],
      default: false
    },
    modelPath: {
      type: String,
      default: ''
    },
    defaultModelValue: {
      type: Object,
      default: () => ({})
    },
    modelOptions: {
      type: Object,
      default: () => ({})
    },
    keyName: {
      type: [String, Array],
      default: 'id'
    }
  },
  computed: {
    hasTitle() {
      return this.title || this.$slots.title;
    },
    refreshData() {
      return /UiTableView$/.test(this.$vnode.tag) ? this.getModelData : null;
    }
  },
  methods: {
    handleChange(key, value) {
      this.$emit(FORM_VIEW_EVENTS.updateFormItem, key, value, this.refreshData);
    },
    exposeAction(action, result = {}) {
      const { handler, ...actionConfig } = action;
      const customHandler = isFunction(handler) ? handler : false;

      const { model, modelOptions, keyName } = this.$props;
      const data = {
        model,
        modelOptions,
        keyName,
        ...this.$data,
        ...result
      };

      customHandler
        ? customHandler(actionConfig, data, this.refreshData)
        : this.$emit(
            FORM_VIEW_EVENTS.action,
            actionConfig,
            data,
            this.refreshData
          );
    }
  }
};
