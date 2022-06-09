<template>
  <div :class="['mdc-checkbox-group', cssClasses.subitemClass]">
    <ui-form-field
      v-for="(option, index) in options"
      :key="`${componentKey}-${index}`"
    >
      <ui-checkbox
        v-model="selectedValue"
        :input-id="`${componentKey}-${index}`"
        :value="option.value"
        :disabled="option.disabled || false"
        @change="handleChange"
      ></ui-checkbox>
      <label :for="`${componentKey}-${index}`">{{ option.label }}</label>
    </ui-form-field>
  </div>
</template>

<script>
import formItemMixin from '../../mixins/form-item';
import { cssClasses } from './constants';

// Define checkbox group constants
const UI_CHECKBOX_GROUP = {
  EVENTS: {
    CHANGE: 'change'
  }
};

export default {
  name: 'UiCheckboxGroup',
  mixins: [formItemMixin],
  model: {
    prop: 'modelValue',
    event: UI_CHECKBOX_GROUP.EVENTS.CHANGE
  },
  props: {
    // States
    modelValue: {
      type: Array,
      default: () => []
    },
    // UI attributes
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      cssClasses,
      selectedValue: this.modelValue
    };
  },
  watch: {
    modelValue(val) {
      this.selectedValue = val;
    }
  },
  methods: {
    handleChange(selectedValue) {
      this.$emit(UI_CHECKBOX_GROUP.EVENTS.CHANGE, selectedValue);
    }
  }
};
</script>
