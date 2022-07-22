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
    modelPath: {
      type: String,
      default: ''
    },
    modelOptions: {
      type: Object,
      default: () => ({})
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
