<template>
  <div :class="['mdc-readonly-item', cssClasses.subitemClass]">
    <slot>{{ currentValue }}</slot>
  </div>
</template>

<script>
export default {
  name: 'UiReadonlyItem'
};
</script>

<script setup>
import { computed } from 'vue';
import { cssClasses, formItemProps } from '../../mixins/form-item';
import getType, { isFunction } from '../../utils/typeof';

const props = defineProps({
  ...formItemProps
});

const currentFormData = computed(() =>
  Object.assign({}, props.proFormDataSource, props.proFormData)
);
const currentValue = computed(() => {
  const value = currentFormData.value[props.proConfig.key];
  const type = getType(value);
  const propsData = Object.assign({}, props, {
    type,
    value: isFunction(value) ? undefined : value
  });

  return isFunction(props.proConfig.value)
    ? props.proConfig.value(currentFormData.value, propsData)
    : value;
});
</script>
