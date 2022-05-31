import { computed } from 'vue';

function useFormItem(config) {
  const component = computed(() => config.component || 'unknown-component');
  const key = computed(() => config.key || 'unknown-key');
  const componentKey = computed(() => `${component.value}--${key.value}`);

  return {
    component,
    key,
    componentKey
  };
}

export { useFormItem };
