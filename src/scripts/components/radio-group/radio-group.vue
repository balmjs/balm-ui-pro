<template>
  <div :class="['mdc-radio-group', cssClasses.subitemClass]">
    <ui-form-field v-for="option in currentOptions" :key="option.uuid">
      <ui-radio
        v-model="selectedValue"
        :input-id="option.uuid"
        :value="option[optionFormat.value]"
        :disabled="option.disabled || false"
        @change="handleChange"
      ></ui-radio>
      <label :for="option.uuid">{{ option[optionFormat.label] }}</label>
    </ui-form-field>
  </div>
</template>

<script>
import formItemMixin from '../../mixins/form-item';

// Define radio group constants
const UI_RADIO_GROUP = {
  name: 'UiRadioGroup',
  EVENTS: {
    CHANGE: 'change'
  }
};

export default {
  name: UI_RADIO_GROUP.name,
  mixins: [formItemMixin],
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
    this.checkOptionFormat(UI_RADIO_GROUP.name);
  },
  methods: {
    handleChange(selectedValue) {
      this.$emit(UI_RADIO_GROUP.EVENTS.CHANGE, selectedValue);
    }
  }
};
</script>
