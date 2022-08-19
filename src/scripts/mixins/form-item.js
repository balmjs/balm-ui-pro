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
  },
  optionFormat: {
    type: Object,
    default: () => ({
      label: 'label',
      value: 'value'
    })
  }
};

function useFormItem(props) {
  function checkOptionFormat(componentName) {
    const { label, value } = props.optionFormat;
    if (!(label && value)) {
      console.error(
        `[${componentName}]: Invalid option format ({ label: string; value: string })`
      );
    }
  }

  return {
    checkOptionFormat
  };
}

export { cssClasses, formItemProps, useFormItem };
