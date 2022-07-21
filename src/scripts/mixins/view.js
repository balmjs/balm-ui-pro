export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    model: {
      type: String,
      default: ''
    },
    modelName: {
      type: String,
      default: ''
    },
    modelOptions: {
      type: Object,
      default: () => ({})
    },
    to: {
      type: [Boolean, Object, String],
      default: false
    },
    replace: {
      type: Boolean,
      default: false
    },
    keyName: {
      type: String,
      default: 'id'
    },
    defaultParams: {
      type: Object,
      default: () => ({})
    },
    getModelConfigFn: {
      type: Function,
      default: () => {}
    },
    getModelDataFn: {
      type: Function,
      default: () => {}
    },
    requestConfig: {
      type: Object,
      default: () => ({})
    },
    useValidator: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    hasTitle() {
      return this.title || this.$slots.title;
    }
  }
};
