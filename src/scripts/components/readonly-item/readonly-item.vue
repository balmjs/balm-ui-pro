<template>
  <div :class="['mdc-readonly-item', cssClasses.subitemClass]">
    <slot>{{ currentValue }}</slot>
  </div>
</template>

<script>
import formItemMixin from '../../mixins/form-item';
import getType, { isFunction } from '../../utils/typeof';

export default {
  name: 'UiReadonlyItem',
  mixins: [formItemMixin],
  props: {
    value: {
      type: null,
      default: ''
    },
    config: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    currentValue() {
      const type = getType(this.value);
      return isFunction(this.config.value)
        ? this.config.value({
            type,
            ...this.$props
          })
        : this.value;
    }
  }
};
</script>
