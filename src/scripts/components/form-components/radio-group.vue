<template>
  <div :class="['mdc-radio-group', cssClasses.subitemClass]">
    <ui-form-field
      v-for="(option, index) in options"
      :key="`radio-${key}-${index}`"
    >
      <ui-radio
        :model-value="selectedValue"
        :input-id="`radio-${key}-${index}`"
        :value="option.value"
        :disabled="option.disabled || false"
        @change="handleChange"
      ></ui-radio>
      <label :for="`radio-${key}-${index}`">{{ option.label }}</label>
    </ui-form-field>
  </div>
</template>

<script>
import { cssClasses } from './constants';

// Define radio group constants
const UI_RADIO_GROUP = {
  EVENTS: {
    CHANGE: 'change'
  }
};

export default {
  name: 'UiRadioGroup',
  model: {
    prop: 'modelValue',
    event: UI_RADIO_GROUP.EVENTS.CHANGE
  },
  props: {
    // States
    modelValue: {
      type: [String, Number],
      default: ''
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
      this.$emit(UI_RADIO_GROUP.EVENTS.CHANGE, selectedValue);
    }
  }
};
</script>
