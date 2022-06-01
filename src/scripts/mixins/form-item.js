import { computed } from 'vue';

const cssClasses = {
  subitemClass: 'mdc-form__subitem'
};

const formItemProps = {
  // For form view
  config: {
    type: Object,
    default: () => ({})
  }
};

function useFormItem(props) {
  const key = computed(() => props.config.key || 'unknown-key');

  return { key };
}

export { cssClasses, formItemProps, useFormItem };
