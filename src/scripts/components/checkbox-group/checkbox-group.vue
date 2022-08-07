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
        @update:model-value="handleChange"
      ></ui-checkbox>
      <label :for="`${componentKey}-${index}`">{{ option.label }}</label>
    </ui-form-field>
  </div>
</template>

<script>
// Define checkbox group constants
const UI_CHECKBOX_GROUP = {
  EVENTS: {
    CHANGE: 'update:modelValue'
  }
};

export default {
  name: 'UiCheckboxGroup',
  customOptions: {}
};
</script>

<script setup>
import { reactive, toRefs, watch } from 'vue';
import { cssClasses, formItemProps } from '../../mixins/form-item';

const props = defineProps({
  ...formItemProps,
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
});

const emit = defineEmits([UI_CHECKBOX_GROUP.EVENTS.CHANGE]);

const state = reactive({
  selectedValue: props.modelValue
});
const { selectedValue } = toRefs(state);

watch(
  () => props.modelValue,
  (val) => (state.selectedValue = val)
);

function handleChange(selectedValue) {
  emit(UI_CHECKBOX_GROUP.EVENTS.CHANGE, selectedValue);
}
</script>
