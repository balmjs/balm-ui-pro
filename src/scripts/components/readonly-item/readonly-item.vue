<template>
  <div :class="['mdc-readonly-item', cssClasses.subitemClass]">
    <slot>
      <div v-if="isRawHtml" v-html="currentValue"></div>
      <div v-else v-text="currentValue"></div>
    </slot>
  </div>
</template>

<script>
import formItemMixin from '../../mixins/form-item';
import getType, { isFunction } from '../../utils/typeof';

export default {
  name: 'UiReadonlyItem',
  mixins: [formItemMixin],
  props: {
    raw: {
      type: [Boolean, Function],
      default: false
    }
  },
  computed: {
    currentFormData() {
      return Object.assign({}, this.proFormDataSource, this.proFormData);
    },
    currentValue() {
      const value = this.currentFormData[this.proConfig.key];
      const type = getType(value);
      const propsData = Object.assign({}, this.$props, {
        type,
        value: isFunction(value) ? undefined : value
      });

      return isFunction(this.proConfig.value)
        ? this.proConfig.value(this.currentFormData, propsData)
        : value;
    },
    isRawHtml() {
      return isFunction(this.raw) ? this.raw(this.currentFormData) : this.raw;
    }
  }
};
</script>
