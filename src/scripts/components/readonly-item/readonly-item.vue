<template>
  <div :class="['mdc-readonly-item', cssClasses.subitemClass]">
    <slot>{{ rendering($props) || value }}</slot>
  </div>
</template>

<script>
import formItemMixin from '../../mixins/form-item';

export default {
  name: 'UiReadonlyItem',
  mixins: [formItemMixin],
  props: {
    value: {
      type: null,
      default: ''
    },
    rendering: {
      type: Function,
      default: () => ''
    }
  }
};
</script>
