<template>
  <div :class="['mdc-checkbox-group', cssClasses.subitemClass]">
    <ui-form-field
      v-for="(option, index) in options"
      :key="`checkbox-${key}-${index}`"
    >
      <ui-checkbox
        :model-value="selectedValue"
        :input-id="`checkbox-${key}-${index}`"
        :value="option.value"
        :disabled="option.disabled || false"
        @change="handleChange"
      ></ui-checkbox>
      <label :for="`checkbox-${key}-${index}`">{{ option.label }}</label>
    </ui-form-field>
  </div>
</template>

<script>
import { cssClasses } from './constants';

// Define checkbox group constants
const UI_CHECKBOX_GROUP = {
  EVENTS: {
    CHANGE: 'change'
  }
};

export default {
  name: 'UiCheckboxGroup',
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
    },
    // For form view
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      cssClasses,
      selectedValue: this.modelValue
    };
  },
  computed: {
    key() {
      return this.config.key || 'unknown-key';
    }
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
