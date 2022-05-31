<template>
  <div :class="[subitemClass, 'mdc-readonly-item']">
    <slot>{{ value }}</slot>
  </div>
</template>

<script>
export default {
  name: 'UiReadonlyItem'
};
</script>

<script setup>
const props = defineProps({
  subitemClass: {
    type: String,
    default: ''
  },
  value: {
    type: null,
    default: ''
  }
});
</script>
