<template>
  <div :class="['mdc-multi-select', cssClasses.subitemClass]">
    <template
      v-for="(component, index) in components"
      :key="`${component.key}-${index}`"
    >
      <ui-select
        v-model="selectedData[component.key]"
        :options="optionsMap[component.key]"
        v-bind="component.attrOrProp || {}"
        @update:modelValue="handleChange(component.key, $event)"
      ></ui-select>
    </template>
  </div>
</template>

<script>
// Define multi select constants
const UI_MULTI_SELECT = {
  EVENTS: {
    CHANGE: 'update:modelValue'
  }
};

export default {
  name: 'UiMultiSelect',
  customOptions: {}
};
</script>

<script setup>
import { reactive, toRefs, computed, watch, onBeforeMount } from 'vue';
import { cssClasses, formItemProps } from '../../mixins/form-item';
import getType from '../../utils/typeof';

const props = defineProps({
  ...formItemProps,
  // UI attributes
  components: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits([UI_MULTI_SELECT.EVENTS.CHANGE]);

const state = reactive({
  selectedData: {},
  selectedDataSource: {},
  optionsMap: {},
  subOptionsSourceMap: {}
});
const { selectedData, optionsMap } = toRefs(state);

const selectedDataKeys = computed(() => props.components.map(({ key }) => key));

const hasRootOptions = computed(() => {
  let result = false;
  if (props.components.length) {
    const { key, options } = props.components[0];
    result =
      getType(options) !== 'undefined' &&
      Array.isArray(state.optionsMap[key]) &&
      state.optionsMap[key].length;
  }
  return result;
});

onBeforeMount(() => {
  initFormData();
});

watch(
  () => props.components,
  () => {
    if (!hasRootOptions.value) {
      initRootOptions();
    }
  }
);

watch(
  () => props.formData,
  (val) => {
    if (hasRootOptions.value) {
      selectedDataKeys.value.forEach((key) => {
        const value = val[key];
        if (state.selectedDataSource[key] !== value) {
          state.selectedDataSource[key] = value;
          getNextSelectKey(key, value);
        }
      });
    }
  },
  {
    deep: true
  }
);

function initFormData() {
  if (props.components.length) {
    for (const { key, value } of props.components) {
      state.selectedData[key] = value;
      state.optionsMap[key] = [];
      state.subOptionsSourceMap[key] = new Map();
    }
    emit(UI_MULTI_SELECT.EVENTS.CHANGE, state.selectedData);
  } else {
    console.warn('components are empty');
  }
}

async function initRootOptions() {
  const { key, options } = props.components[0];
  const rootOptions =
    getType(options) === 'function' ? await options(props.formData) : options;
  state.optionsMap[key] = rootOptions;
}

function getNextSelectKey(parentKey, parentValue) {
  const index = selectedDataKeys.value.findIndex((key) => key === parentKey);
  const nextKey = selectedDataKeys.value[index + 1];
  if (nextKey) {
    parentValue ? getNextOptions(nextKey) : resetSelectedData(index);
  }
}

async function getNextOptions(currentKey) {
  const currentComponent = props.components.find(
    ({ key }) => key === currentKey
  );
  const { options } = currentComponent;
  const currentOptions =
    getType(options) === 'function' ? await options(props.formData) : options;
  state.optionsMap[currentKey] = currentOptions;
}

function resetSelectedData(parentIndex) {
  const nextSelectedDataKeys = selectedDataKeys.value.filter(
    (key, index) => index > parentIndex
  );
  nextSelectedDataKeys.forEach((key) => {
    state.selectedDataSource[key] = '';
    state.selectedData[key] = '';
    state.optionsMap[key] = [];
  });
  emit(UI_MULTI_SELECT.EVENTS.CHANGE, state.selectedData);
}

async function handleChange(key, value) {
  state.selectedData[key] = value;
  emit(UI_MULTI_SELECT.EVENTS.CHANGE, state.selectedData);
}
</script>
