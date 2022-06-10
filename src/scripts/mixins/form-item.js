const cssClasses = {
  subitemClass: 'mdc-form__subitem'
};

const formItemProps = {
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
};

export { cssClasses, formItemProps };
