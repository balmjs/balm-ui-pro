<template>
  <div :class="['mdc-readonly-item', cssClasses.subitemClass]">
    <slot>{{ value }}</slot>
  </div>
</template>

<script>
export default {
  name: 'UiReadonlyItem'
};
</script>

<script setup>
import { cssClasses, formItemProps } from '../../mixins/form-item';

const props = defineProps({
  ...formItemProps,
  value: {
    type: null,
    default: ''
  }
});
</script>
