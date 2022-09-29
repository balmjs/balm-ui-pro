import { computed } from 'vue';
import { generateRandomString } from '../utils/helpers';

const cssClasses = {
  subitemClass: 'mdc-form__subitem'
};

const formItemProps = {
  proConfig: {
    type: Object,
    default: () => ({})
  },
  proFormData: {
    type: Object,
    default: () => ({})
  },
  proFormDataSource: {
    type: Object,
    default: () => ({})
  },
  proComponentKey: {
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
  const uuid = generateRandomString(props.proComponentKey);

  const currentOptions = computed(() =>
    Array.isArray(props.options)
      ? props.options.map((option) => {
          option.uuid = generateRandomString(props.proComponentKey);
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
    uuid,
    currentOptions,
    checkOptionFormat
  };
}

export { cssClasses, formItemProps, useFormItem };
