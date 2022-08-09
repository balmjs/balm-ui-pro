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
  }
};
