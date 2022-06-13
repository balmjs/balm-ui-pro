<template>
  <ui-form-field class="mdc-switch-box">
    <ui-switch
      v-model="selectedValue"
      :input-id="componentKey"
      :disabled="disabled"
      v-bind="switchAttrOrProp"
      @update:model-value="handleChange"
    ></ui-switch>
    <label :for="componentKey">{{ label }}</label>
  </ui-form-field>
</template>

<script>
// Define switch box constants
const UI_SWITCH_BOX = {
  EVENTS: {
    CHANGE: 'update:model-value'
  }
};

export default {
  name: 'UiSwitchBox',
  customOptions: {
    UI_SWITCH_BOX
  }
};
</script>

<script setup>
import { reactive, toRefs, computed, watch } from 'vue';
import { formItemProps } from '../../mixins/form-item';

const props = defineProps({
  ...formItemProps,
  // States
  modelValue: {
    type: Boolean,
    default: false
  },
  // UI attributes
  options: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  switchAttrOrProp: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits([UI_SWITCH_BOX.EVENTS.CHANGE]);

const state = reactive({
  selectedValue: props.modelValue
});
const { selectedValue } = toRefs(state);

const label = computed(() => {
  const index = props.options.findIndex((option) =>
    state.selectedValue
      ? option.value === props.switchAttrOrProp.trueValue || option.value
      : option.value === props.switchAttrOrProp.falseValue || !option.value
  );
  return ~index && props.options[index].label;
});

watch(
  () => props.modelValue,
  (val) => (state.selectedValue = val)
);

function handleChange(selectedValue) {
  emit(UI_SWITCH_BOX.EVENTS.CHANGE, selectedValue);
}
</script>
