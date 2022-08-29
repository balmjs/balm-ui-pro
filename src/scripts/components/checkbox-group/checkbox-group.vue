<template>
  <div :class="['mdc-checkbox-group', cssClasses.subitemClass]">
    <ui-form-field v-for="option in options" :key="option.uuid">
      <ui-checkbox
        v-model="selectedValue"
        :input-id="option.uuid"
        :value="option[optionFormat.value]"
        :disabled="option.disabled || false"
        @update:model-value="handleChange"
      ></ui-checkbox>
      <label :for="option.uuid">{{ option[optionFormat.label] }}</label>
    </ui-form-field>
  </div>
</template>

<script>
// Define checkbox group constants
const UI_CHECKBOX_GROUP = {
  name: 'UiCheckboxGroup',
  EVENTS: {
    CHANGE: 'update:modelValue'
  }
};

export default {
  name: UI_CHECKBOX_GROUP.name,
  customOptions: {}
};
</script>

<script setup>
import { reactive, toRefs, watch, onBeforeMount } from 'vue';
import { cssClasses, formItemProps, useFormItem } from '../../mixins/form-item';

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

const { checkOptionFormat } = useFormItem(props);
onBeforeMount(() => {
  checkOptionFormat(UI_CHECKBOX_GROUP.name);
});

watch(
  () => props.modelValue,
  (val) => (state.selectedValue = val)
);

function handleChange(selectedValue) {
  emit(UI_CHECKBOX_GROUP.EVENTS.CHANGE, selectedValue);
}
</script>
