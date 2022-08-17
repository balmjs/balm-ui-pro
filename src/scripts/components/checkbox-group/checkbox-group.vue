<template>
  <div :class="['mdc-checkbox-group', cssClasses.subitemClass]">
    <ui-form-field
      v-for="(option, index) in options"
      :key="`${componentKey}-${index}`"
    >
      <ui-checkbox
        v-model="selectedValue"
        :input-id="`${componentKey}-${index}`"
        :value="option[optionFormat.value]"
        :disabled="option.disabled || false"
        @change="handleChange"
      ></ui-checkbox>
      <label :for="`${componentKey}-${index}`">{{
        option[optionFormat.label]
      }}</label>
    </ui-form-field>
  </div>
</template>

<script>
import formItemMixin from '../../mixins/form-item';

// Define checkbox group constants
const UI_CHECKBOX_GROUP = {
  name: 'UiCheckboxGroup',
  EVENTS: {
    CHANGE: 'change'
  }
};

export default {
  name: UI_CHECKBOX_GROUP.name,
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
      selectedValue: this.modelValue
    };
  },
  watch: {
    modelValue(val) {
      this.selectedValue = val;
    }
  },
  beforeMount() {
    this.checkOptionFormat(UI_CHECKBOX_GROUP.name);
  },
  methods: {
    handleChange(selectedValue) {
      this.$emit(UI_CHECKBOX_GROUP.EVENTS.CHANGE, selectedValue);
    }
  }
};
</script>
