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
        @update:model-value="handleChange"
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
    CHANGE: 'update:modelValue'
  }
};

export default {
  name: 'UiCheckboxGroup',
  customOptions: {
    UI_CHECKBOX_GROUP,
    cssClasses
  }
};
</script>

<script setup>
import { reactive, toRefs, computed, watch } from 'vue';

const props = defineProps({
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
});

const emit = defineEmits([UI_CHECKBOX_GROUP.EVENTS.CHANGE]);

const state = reactive({
  selectedValue: props.modelValue
});
const { selectedValue } = toRefs(state);

const key = computed(() => props.config.key || 'unknown-key');

watch(
  () => props.modelValue,
  (val) => (state.selectedValue = val)
);

function handleChange(selectedValue) {
  emit(UI_CHECKBOX_GROUP.EVENTS.CHANGE, selectedValue);
}
</script>
