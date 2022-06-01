<template>
  <div :class="['mdc-radio-group', cssClasses.subitemClass]">
    <ui-form-field
      v-for="(option, index) in options"
      :key="`radio-${key}-${index}`"
    >
      <ui-radio
        v-model="selectedValue"
        :input-id="`radio-${key}-${index}`"
        :value="option.value"
        :disabled="option.disabled || false"
        @update:modelValue="handleChange"
      ></ui-radio>
      <label :for="`radio-${key}-${index}`">{{ option.label }}</label>
    </ui-form-field>
  </div>
</template>

<script>
// Define radio group constants
const UI_RADIO_GROUP = {
  EVENTS: {
    CHANGE: 'update:modelValue'
  }
};

export default {
  name: 'UiRadioGroup',
  customOptions: {
    UI_RADIO_GROUP
  }
};
</script>

<script setup>
import { reactive, toRefs, watch } from 'vue';
import { cssClasses, formItemProps, useFormItem } from '../../mixins/form-item';

const props = defineProps({
  // States
  modelValue: {
    type: [String, Number],
    default: ''
  },
  // UI attributes
  options: {
    type: Array,
    default: () => []
  },
  ...formItemProps
});

const emit = defineEmits([UI_RADIO_GROUP.EVENTS.CHANGE]);

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
  emit(UI_RADIO_GROUP.EVENTS.CHANGE, selectedValue);
}
</script>
