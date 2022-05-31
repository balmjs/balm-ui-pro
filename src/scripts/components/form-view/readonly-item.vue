<template>
  <div
    :class="[subitemClass, 'mdc-readonly-item', `mdc-readonly-item__${key}`]"
  >
    <slot>{{ value }}</slot>
  </div>
</template>

<script>
export default {
  name: 'UiReadonlyItem'
};
</script>

<script setup>
import { useFormItem } from '../../mixins/form-item';

const props = defineProps({
  subitemClass: {
    type: String,
    default: ''
  },
  config: {
    type: Object,
    default: () => ({})
  },
  value: {
    type: null,
    default: ''
  }
});

const { key } = useFormItem(props.config);
</script>
