<template>
  <ui-form-field class="mdc-switch-box">
    <ui-switch
      :model-value="selectedValue"
      :input-id="`switch-${key}`"
      @change="handleChange"
    ></ui-switch>
    <label :for="`switch-${key}`">{{ label }}</label>
  </ui-form-field>
</template>

<script>
// Define switch box constants
const UI_SWITCH_BOX = {
  EVENTS: {
    CHANGE: 'change'
  }
};

export default {
  name: 'UiSwitchBox',
  props: {
    // States
    modelValue: {
      type: Boolean,
      default: false
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
      selectedValue: this.modelValue
    };
  },
  computed: {
    key() {
      return this.config.key || 'unknown-key';
    },
    label() {
      const index = this.options.findIndex(
        (option) => option.value === this.modelValue
      );
      return ~index && this.options[index].label;
    }
  },
  watch: {
    modelValue(val) {
      this.selectedValue = val;
    }
  },
  methods: {
    handleChange(selectedValue) {
      this.$emit(UI_SWITCH_BOX.EVENTS.CHANGE, selectedValue);
    }
  }
};
</script>
