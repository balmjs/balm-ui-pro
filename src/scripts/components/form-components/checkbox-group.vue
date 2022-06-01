<template>
  <div :class="['mdc-checkbox-group', cssClasses.subitemClass]">
    <ui-form-field
      v-for="(option, index) in options"
      :key="`checkbox-${key}-${index}`"
    >
      <ui-checkbox
        v-model="selectedValue"
        :input-id="`checkbox-${key}-${index}`"
        :value="option.value"
        :disabled="option.disabled || false"
        @update:modelValue="handleChange"
      ></ui-checkbox>
      <label :for="`checkbox-${key}-${index}`">{{ option.label }}</label>
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
  customOptions: {
    UI_CHECKBOX_GROUP
  }
};
</script>

<script setup>
import { reactive, toRefs, watch } from 'vue';
import { cssClasses, formItemProps, useFormItem } from '../../mixins/form-item';

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
  ...formItemProps
});

const emit = defineEmits([UI_CHECKBOX_GROUP.EVENTS.CHANGE]);

const state = reactive({
  selectedValue: props.modelValue
});
const { selectedValue } = toRefs(state);

const { key } = useFormItem(props);

watch(
  () => props.modelValue,
  (val) => (state.selectedValue = val)
);

function handleChange(selectedValue) {
  emit(UI_CHECKBOX_GROUP.EVENTS.CHANGE, selectedValue);
}
</script>
