import { computed } from 'vue';
import { generateRandomString } from '../utils/helpers';

const cssClasses = {
  subitemClass: 'mdc-form__subitem'
};

const formItemProps = {
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
};

function useFormItem(props) {
  const currentOptions = computed(() =>
    Array.isArray(props.options)
      ? props.options.map((option) => {
          option.uuid = generateRandomString(props.componentKey);
          return option;
        })
      : []
  );

  function checkOptionFormat(componentName) {
    const { label, value } = props.optionFormat;
    if (!(label && value)) {
      console.error(
        `[${componentName}]: Invalid option format ({ label: string; value: string })`
      );
    }
  }

  return {
    currentOptions,
    checkOptionFormat
  };
}

export { cssClasses, formItemProps, useFormItem, generateRandomString };
