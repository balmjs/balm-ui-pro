const cssClasses = {
  subitemClass: 'mdc-form__subitem'
};

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
  },
  data() {
    return {
      cssClasses
    };
  }
};
