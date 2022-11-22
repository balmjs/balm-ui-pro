<template>
  <div :class="['mdc-checkbox-group', cssClasses.subitemClass]">
    <ui-form-field v-if="allSelected">
      <ui-checkbox
        v-model="selectedAll"
        :input-id="uuid"
        :indeterminate="indeterminate"
        @change="handleSelectAll"
      ></ui-checkbox>
      <label :for="uuid">{{ allSelectedLabel }}</label>
    </ui-form-field>
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
  NAME: 'UiCheckboxGroup',
  EVENTS: {
    CHANGE: 'change'
  }
};

export default {
  name: UI_CHECKBOX_GROUP.NAME,
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
    },
    allSelected: {
      type: Boolean,
      default: false
    },
    allSelectedLabel: {
      type: String,
      default: 'All'
    },
    selectedAllValue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedValue: this.modelValue,
      selectedAll: this.selectedAllValue
    };
  },
  computed: {
    selectedCount() {
      return this.selectedValue.length;
    },
    indeterminate() {
      return this.selectedCount
        ? this.selectedCount !== this.currentOptions.length
        : false;
    }
  },
  watch: {
    modelValue(val) {
      this.selectedValue = val;

      this.selectedAll =
        this.currentOptions.length &&
        this.selectedCount === this.currentOptions.length;
    }
  },
  beforeMount() {
    this.checkOptionFormat(UI_CHECKBOX_GROUP.NAME);

    this.handleSelectAll(this.selectedAll);
  },
  methods: {
    handleChange(selectedValue) {
      this.$emit(UI_CHECKBOX_GROUP.EVENTS.CHANGE, selectedValue);
    },
    handleSelectAll(checked) {
      this.selectedValue = checked
        ? this.currentOptions.map((option) => option[this.optionFormat.value])
        : [];
      this.handleChange(this.selectedValue);
    }
  }
};
</script>
