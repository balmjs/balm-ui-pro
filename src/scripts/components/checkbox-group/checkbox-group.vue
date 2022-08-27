<template>
  <div :class="['mdc-checkbox-group', cssClasses.subitemClass]">
    <ui-form-field v-for="option in currentOptions" :key="option.uuid">
      <ui-checkbox
        v-model="selectedValue"
        :input-id="option.uuid"
        :value="option[optionFormat.value]"
        :disabled="option.disabled || false"
        @change="handleChange"
      ></ui-checkbox>
      <label :for="option.uuid">{{ option[optionFormat.label] }}</label>
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
