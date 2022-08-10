import { isFunction } from '../utils/typeof';

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
    }
  },
  computed: {
    hasTitle() {
      return this.title || this.$slots.title;
    }
  },
  methods: {
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
      const refreshData = this.getModelData;

      customHandler
        ? customHandler(actionConfig, data, refreshData)
        : this.$emit('action', actionConfig, data, refreshData);
    }
  }
};
