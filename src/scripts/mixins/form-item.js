const cssClasses = {
  subitemClass: 'mdc-form__subitem'
};

export default {
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    formDataSource: {
      type: Object,
      default: () => ({})
    },
    componentKey: {
      type: String,
      default: 'unknown'
    },
    optionFormat: {
      type: Object,
      default: () => ({
        label: 'label',
        value: 'value'
      })
    }
  },
  data() {
    return {
      cssClasses
    };
  },
  methods: {
    checkOptionFormat(componentName) {
      const { label, value } = this.optionFormat;
      if (!(label && value)) {
        console.error(
          `[${componentName}]: Invalid option format ({ label: string; value: string })`
        );
      }
    }
  }
};
