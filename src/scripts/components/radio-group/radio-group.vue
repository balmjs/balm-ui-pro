<template>
  <div :class="['mdc-radio-group', cssClasses.subitemClass]">
    <ui-form-field
      v-for="(option, index) in options"
      :key="`${componentKey}-${index}`"
    >
      <ui-radio
        v-model="selectedValue"
        :input-id="`${componentKey}-${index}`"
        :value="option[optionFormat.value]"
        :disabled="option.disabled || false"
        @update:model-value="handleChange"
      ></ui-radio>
      <label :for="`${componentKey}-${index}`">{{
        option[optionFormat.label]
      }}</label>
    </ui-form-field>
  </div>
</template>

<script>
// Define radio group constants
const UI_RADIO_GROUP = {
  name: 'UiRadioGroup',
  EVENTS: {
    CHANGE: 'update:modelValue'
  }
};

export default {
  name: UI_RADIO_GROUP.name,
  customOptions: {}
};
</script>

<script setup>
import { reactive, toRefs, watch } from 'vue';
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

const emit = defineEmits([UI_RADIO_GROUP.EVENTS.CHANGE]);

const state = reactive({
  selectedValue: props.modelValue
});
const { selectedValue } = toRefs(state);

const { checkOptionFormat } = useFormItem(props);
onBeforeMount(() => {
  checkOptionFormat(UI_RADIO_GROUP.name);
});

watch(
  () => props.modelValue,
  (val) => (state.selectedValue = val)
);

function handleChange(selectedValue) {
  emit(UI_RADIO_GROUP.EVENTS.CHANGE, selectedValue);
}
</script>
