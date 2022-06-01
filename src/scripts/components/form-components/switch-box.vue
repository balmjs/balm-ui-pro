<template>
  <ui-form-field class="mdc-switch-box">
    <ui-switch
      v-model="selectedValue"
      :input-id="`switch-${key}`"
      :disabled="config.disabled || false"
      v-bind="switchAttrOrProp"
      @change="handleChange"
    ></ui-switch>
    <label :for="`switch-${key}`">{{ label }}</label>
  </ui-form-field>
</template>

<script>
import formItemMixin from '../../mixins/form-item';

// Define switch box constants
const UI_SWITCH_BOX = {
  EVENTS: {
    CHANGE: 'change'
  }
};

export default {
  name: 'UiSwitchBox',
  mixins: [formItemMixin],
  model: {
    prop: 'modelValue',
    event: UI_SWITCH_BOX.EVENTS.CHANGE
  },
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
    switchAttrOrProp: {
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
    label() {
      const index = this.options.findIndex((option) =>
        this.selectedValue
          ? option.value === this.switchAttrOrProp.trueValue || option.value
          : option.value === this.switchAttrOrProp.falseValue || !option.value
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
