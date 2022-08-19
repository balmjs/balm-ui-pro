<template>
  <div :class="['mdc-multi-select', cssClasses.subitemClass]">
    <template
      v-for="(component, index) in components"
      :key="`${component.key}-${index}`"
    >
      <ui-select
        v-model="selectedData[component.key]"
        :options="selectedOptions[component.key]"
        v-bind="component.attrOrProp || {}"
        @update:model-value="handleChange(component.key, $event)"
      ></ui-select>
    </template>
  </div>
</template>

<script>
// Define multi select constants
const UI_MULTI_SELECT = {
  name: 'UiMultiSelect',
  EVENTS: {
    CHANGE: 'update:modelValue'
  }
};

export default {
  name: UI_MULTI_SELECT.name,
  customOptions: {}
};
</script>

<script setup>
import { reactive, toRefs, computed, watch, onBeforeMount } from 'vue';
import { cssClasses, formItemProps } from '../../mixins/form-item';
import getType, { isFunction } from '../../utils/typeof';

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
  selectedOptions: {},
  optionsMap: {}
});
const { selectedData, selectedOptions } = toRefs(state);

const selectedKeys = computed(() => props.components.map(({ key }) => key));
const rootSelectedKey = computed(() => selectedKeys.value[0]);
const lastSelectedKey = computed(
  () => selectedKeys.value[selectedKeys.value.length - 1]
);
const hasSelectedOptions = computed(() => {
  const rootSelectedOptions = state.selectedOptions[rootSelectedKey.value];
  return Array.isArray(rootSelectedOptions) && !!rootSelectedOptions.length;
});

onBeforeMount(() => {
  if (props.components.length) {
    initOptions();
  } else {
    console.warn(
      `[${UI_MULTI_SELECT.name}]: form config 'components' are empty`
    );
  }
});

watch(
  () => props.components,
  () => {
    initRootOptions(); // NOTE: for static options
  },
  {
    immediate: true // NOTE: for dynamic form config
  }
);

watch(
  () => props.formData,
  (val) => {
    updateOptions(val);
  },
  {
    deep: true,
    immediate: true // NOTE: for dynamic form config
  }
);

function initOptions() {
  if (!hasSelectedOptions.value) {
    for (const { key, value } of props.components) {
      state.selectedData[key] = value;
      state.selectedOptions[key] = [];
      state.optionsMap[key] = new Map();
    }
  }
}

async function setSelectedOptions(parentValue, { key, options }) {
  let optionsMap = state.optionsMap[key];

  if (getType(optionsMap) !== 'map') {
    optionsMap = new Map();
  }

  if (!optionsMap.has(parentValue)) {
    const currentFormData = Object.assign(
      {},
      props.formData,
      state.selectedData
    );

    const selectedOptions = isFunction(options)
      ? await options(currentFormData)
      : options || [];

    if (Array.isArray(selectedOptions)) {
      if (selectedOptions.length) {
        optionsMap.set(parentValue, selectedOptions);
      }
    } else {
      console.warn(`[${UI_MULTI_SELECT.name}]: 'options' must return an array`);
    }
  }

  const selectedOptions = optionsMap.get(parentValue) || [];
  state.selectedOptions[key] = selectedOptions;
}

function initRootOptions() {
  if (!hasSelectedOptions.value) {
    initOptions();
    setSelectedOptions(0, props.components[0]);
  }
}

async function updateOptions(formData) {
  let updateSelectedKeys = [];
  selectedKeys.value.forEach((key) => {
    const newValue = formData[key];
    if (state.selectedData[key] !== newValue) {
      state.selectedData[key] = newValue;

      if (newValue) {
        updateSelectedKeys.push({
          key,
          newValue
        });
      }
    }
  });

  if (updateSelectedKeys.length) {
    for await (const { key, newValue } of updateSelectedKeys) {
      if (key !== lastSelectedKey.value) {
        await getNextSelected(key, newValue);
      }
    }
  }
}

function getNextSelected(parentKey, parentValue) {
  const selectedIndex = selectedKeys.value.findIndex(
    (key) => key === parentKey
  );
  const nextSelectedKey = selectedKeys.value[selectedIndex + 1];
  if (nextSelectedKey) {
    parentValue
      ? getNextOptions(nextSelectedKey, parentValue)
      : clearSelectedData(selectedIndex);
  }
}

function getNextOptions(key, parentValue) {
  const currentComponent = props.components.find(
    (component) => component.key === key
  );
  const { options } = currentComponent;

  setSelectedOptions(parentValue, { key, options });
}

function clearSelectedData(parentIndex) {
  const nextSelectedDataKeys = selectedKeys.value.filter(
    (key, index) => index > parentIndex
  );
  nextSelectedDataKeys.forEach((key) => {
    state.selectedData[key] = '';
    state.selectedOptions[key] = [];
  });
}

async function handleChange(key, value) {
  state.selectedData[key] = value;
  if (key !== lastSelectedKey.value) {
    getNextSelected(key, value);
  }

  emit(UI_MULTI_SELECT.EVENTS.CHANGE, state.selectedData);
}
</script>
