<template>
  <div :class="['mdc-radio-group', cssClasses.subitemClass]">
    <ui-form-field v-for="option in currentOptions" :key="option.uuid">
      <ui-radio
        v-model="selectedValue"
        :input-id="option.uuid"
        :value="option[optionFormat.value]"
        :disabled="option.disabled || false"
        @update:model-value="handleChange"
      ></ui-radio>
      <label :for="option.uuid">{{ option[optionFormat.label] }}</label>
    </ui-form-field>
  </div>
</template>

<script>
// Define radio group constants
const UI_RADIO_GROUP = {
  NAME: 'UiRadioGroup',
  EVENTS: {
    change: 'update:modelValue'
  }
};

export default {
  name: UI_RADIO_GROUP.NAME,
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
    type: [String, Number],
    default: ''
  },
  // UI attributes
  options: {
    type: Array,
    default: () => []
  }
});
const emit = defineEmits([UI_RADIO_GROUP.EVENTS.change]);

const state = reactive({
  selectedValue: props.modelValue
});
const { selectedValue } = toRefs(state);

const { currentOptions, checkOptionFormat } = useFormItem(props);
onBeforeMount(() => {
  checkOptionFormat(UI_RADIO_GROUP.NAME);
});

watch(
  () => props.modelValue,
  (val) => (state.selectedValue = val)
);

function handleChange(selectedValue) {
  emit(UI_RADIO_GROUP.EVENTS.change, selectedValue);
}
</script>
