<template>
  <ui-form-field class="mdc-switch-box">
    <ui-switch
      v-model="switchValue"
      :input-id="uuid"
      v-bind="switchAttrOrProp"
      @selected="handleSelected"
    ></ui-switch>
    <label :for="uuid">{{ switchItem[optionFormat.label] }}</label>
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
      type: [Boolean, String, Number],
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
      switchValue: this.isTrueValue(this.modelValue)
    };
  },
  computed: {
    uuid() {
      return this.generateRandomString(this.componentKey);
    },
    switchItem() {
      const index = this.options.findIndex((option) =>
        this.switchValue
          ? this.isTrueValue(option[this.optionFormat.value])
          : option[this.optionFormat.value] ===
              this.switchAttrOrProp.falseValue ||
            !option[this.optionFormat.value]
      );
      return ~index ? this.options[index] : {};
    }
  },
  watch: {
    modelValue(val) {
      this.switchValue = this.isTrueValue(val);
    }
  },
  methods: {
    isTrueValue(selectedValue) {
      const hasTrueAndFalseValues =
        this.switchAttrOrProp.hasOwnProperty('trueValue') &&
        this.switchAttrOrProp.hasOwnProperty('falseValue');

      return hasTrueAndFalseValues
        ? selectedValue === this.switchAttrOrProp.trueValue
        : selectedValue;
    },
    handleSelected(selectedValue) {
      this.$emit(UI_SWITCH_BOX.EVENTS.CHANGE, selectedValue);
    }
  }
};
</script>
