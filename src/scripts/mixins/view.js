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
    modelPath: {
      type: String,
      default: ''
    },
    modelOptions: {
      type: Object,
      default: () => ({})
    },
    keyName: {
      type: [String, Array],
      default: 'id'
    },
    defaultParams: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    hasTitle() {
      return this.title || this.$slots.title;
    }
  },
  methods: {
    handleChange(key, value) {
      this.$emit(FORM_VIEW_EVENTS.updateFormItem, key, value);
    },
    exposeAction(action, result = {}) {
      const { handler, ...actionConfig } = action;
      const customHandler = isFunction(handler) ? handler : false;

      const { model, modelOptions, keyName, defaultParams } = this.$props;
      const data = {
        model,
        modelOptions,
        keyName,
        defaultParams,
        ...this.$data,
        ...result
      };
      const refreshData = this.getModelData;

      customHandler
        ? customHandler(actionConfig, data, refreshData)
        : this.$emit(FORM_VIEW_EVENTS.action, actionConfig, data, refreshData);
    }
  }
};
