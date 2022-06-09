<template>
  <div :class="['mdc-readonly-item', cssClasses.subitemClass]">
    <slot>{{ value }}</slot>
  </div>
</template>

<script>
import { cssClasses } from './constants';

export default {
  name: 'UiReadonlyItem',
  props: {
    value: {
      type: null,
      default: ''
    }
  },
  data() {
    return {
      cssClasses
    };
  }
};
</script>
