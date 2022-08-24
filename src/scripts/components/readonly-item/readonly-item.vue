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
      return Object.assign({}, this.formDataSource, this.formData);
    },
    currentValue() {
      const value = this.currentFormData[this.config.key];
      const type = getType(value);
      const data = Object.assign({}, this.$props, {
        type,
        value
      });

      return isFunction(this.config.value) ? this.config.value(data) : value;
    }
  }
};
</script>
