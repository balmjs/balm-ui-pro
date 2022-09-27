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
  computed: {
    currentFormData() {
      return Object.assign({}, this.proFormDataSource, this.proFormData);
    },
    currentValue() {
      const value = this.currentFormData[this.proConfig.key];
      const type = getType(value);
      const data = Object.assign({}, this.$props, {
        type,
        value
      });

      return isFunction(this.proConfig.value)
        ? this.proConfig.value(data)
        : value;
    }
  }
};
</script>
