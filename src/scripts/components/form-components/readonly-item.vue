<template>
  <div :class="['mdc-readonly-item', cssClasses.subitemClass]">
    <slot>{{ value }}</slot>
  </div>
</template>

<script>
import formItemMixin from '../../mixins/form-item';
import { cssClasses } from './constants';

export default {
  name: 'UiReadonlyItem',
  mixins: [formItemMixin],
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
