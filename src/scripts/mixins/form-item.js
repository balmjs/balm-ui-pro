export default {
  props: {
    componentKey: {
      type: String,
      default: 'unknown'
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    formDataSource: {
      type: Object,
      default: () => ({})
    }
  }
};
