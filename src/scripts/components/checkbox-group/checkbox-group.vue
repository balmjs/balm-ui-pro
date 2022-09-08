<template>
  <div :class="['mdc-checkbox-group', cssClasses.subitemClass]">
    <ui-form-field v-if="allSelected">
      <ui-checkbox
        v-model="selectedAll"
        :input-id="uuid"
        :indeterminate="indeterminate"
        @change="handleSelectAll"
      ></ui-checkbox>
      <label :for="uuid">{{ allSelectedLabel }}</label>
    </ui-form-field>
    <ui-form-field v-for="option in currentOptions" :key="option.uuid">
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
import { reactive, toRefs, computed, watch, onBeforeMount } from 'vue';
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
  },
  allSelected: {
    type: Boolean,
    default: false
  },
  allSelectedLabel: {
    type: String,
    default: 'All'
  },
  selectedAllValue: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits([UI_CHECKBOX_GROUP.EVENTS.CHANGE]);

const state = reactive({
  selectedValue: props.modelValue,
  selectedAll: props.selectedAllValue
});
const { selectedValue } = toRefs(state);

const { uuid, currentOptions, checkOptionFormat } = useFormItem(props);
const selectedCount = computed(() => state.selectedValue.length);
const indeterminate = computed(() =>
  selectedCount.value
    ? selectedCount.value !== currentOptions.value.length
    : false
);

onBeforeMount(() => {
  checkOptionFormat(UI_CHECKBOX_GROUP.name);

  handleSelectAll(state.selectedAll);
});

watch(
  () => props.modelValue,
  (val) => {
    state.selectedValue = val;
    state.selectedAll =
      currentOptions.value.length &&
      selectedCount.value === currentOptions.value.length;
  }
);

function handleChange(selectedValue) {
  emit(UI_CHECKBOX_GROUP.EVENTS.CHANGE, selectedValue);
}

function handleSelectAll(checked) {
  state.selectedValue = checked
    ? currentOptions.value.map((option) => option[props.optionFormat.value])
    : [];
  handleChange(state.selectedValue);
}
</script>
