<template>
  <ui-form-field class="mdc-switch-box">
    <ui-switch
      :model-value="selectedValue"
      :input-id="`switch-${key}`"
      @update:model-value="handleChange"
    ></ui-switch>
    <label :for="`switch-${key}`">{{ label }}</label>
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

const props = defineProps({
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
  // For form view
  config: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits([UI_SWITCH_BOX.EVENTS.CHANGE]);

const state = reactive({
  selectedValue: props.modelValue
});
const { selectedValue } = toRefs(state);

const key = computed(() => props.config.key || 'unknown-key');
const label = computed(() => {
  const index = props.options.findIndex(
    (option) => option.value === props.modelValue
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
