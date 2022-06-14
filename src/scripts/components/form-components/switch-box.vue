<template>
  <ui-form-field class="mdc-switch-box">
    <ui-switch
      v-model="switchValue"
      :input-id="componentKey"
      :disabled="disabled"
      v-bind="switchAttrOrProp"
      @selected="handleSelected"
    ></ui-switch>
    <label :for="componentKey">{{ switchItem.label }}</label>
  </ui-form-field>
</template>

<script>
// Define switch box constants
const UI_SWITCH_BOX = {
  EVENTS: {
    CHANGE: 'update:modelValue'
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
    type: [Boolean, String, Number],
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
  switchValue: isTrueValue(props.modelValue)
});
const { switchValue } = toRefs(state);

const switchItem = computed(() => {
  const index = props.options.findIndex((option) =>
    state.switchValue
      ? isTrueValue(option.value)
      : option.value === props.switchAttrOrProp.falseValue || !option.value
  );
  return ~index ? props.options[index] : {};
});

watch(
  () => props.modelValue,
  (val) => (state.switchValue = isTrueValue(val))
);

function isTrueValue(selectedValue) {
  const hasTrueAndFalseValues =
    props.switchAttrOrProp.hasOwnProperty('trueValue') &&
    props.switchAttrOrProp.hasOwnProperty('falseValue');

  return hasTrueAndFalseValues
    ? selectedValue === props.switchAttrOrProp.trueValue
    : selectedValue;
}

function handleSelected(selectedValue) {
  emit(UI_SWITCH_BOX.EVENTS.CHANGE, selectedValue);
}
</script>
