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
  Object.assign({}, props.formDataSource, props.formData)
);
const currentValue = computed(() => {
  const value = currentFormData.value[props.config.key];
  const type = getType(value);
  const data = Object.assign({}, props, {
    type,
    value
  });

  return isFunction(props.config.value) ? props.config.value(data) : value;
});
</script>
