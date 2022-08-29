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
  // States
  modelValue: {
    type: Object,
    default: () => ({})
  },
  // UI attributes
  components: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits([UI_MULTI_SELECT.EVENTS.CHANGE]);

const state = reactive({
  selectedData: props.modelValue,
  selectedOptions: {},
  selectedOptionsMap: {},
  loading: false
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
    initSelectedData();
  } else {
    console.warn(
      `[${UI_MULTI_SELECT.name}]: form config 'components' are empty`
    );
  }
});

watch(
  () => props.modelValue,
  (val) => {
    state.selectedData = val;
  }
);

watch(
  () => props.components,
  () => {
    initRootSelectedOptions();
  }
);

watch(
  () => props.formData,
  (val) => {
    if (JSON.stringify(val) !== JSON.stringify(state.selectedData)) {
      updateSelected();
    }
  },
  {
    deep: true
  }
);

function initSelectedData() {
  if (!hasSelectedOptions.value) {
    for (const { key, value } of props.components) {
      const initialValue =
        state.selectedData[key] || props.formDataSource[key] || value;
      state.selectedData[key] = initialValue;
      state.selectedOptions[key] = [];
      state.selectedOptionsMap[key] = new Map();
    }

    initSelectedOptions();
  }
}

async function initSelectedOptions() {
  const selectedData = Object.assign({}, state.selectedData);

  for await (const key of selectedKeys.value) {
    const index = selectedKeys.value.findIndex(
      (selectedKey) => selectedKey === key
    );
    const parentKey = selectedKeys.value[index - 1];
    const parentValue =
      key === rootSelectedKey.value ? 0 : selectedData[parentKey];

    if (key === rootSelectedKey.value || parentValue) {
      await setSelectedOptions(parentValue, props.components[index]);
    }
  }
}

function initRootSelectedOptions() {
  if (!hasSelectedOptions.value) {
    setSelectedOptions(0, props.components[0]);
  }
}

async function setSelectedOptions(parentValue, { key, options }) {
  const selectedOptionsMap = state.selectedOptionsMap[key];
  let selectedOptions = selectedOptionsMap.get(parentValue) || [];

  if (!selectedOptions.has(parentValue)) {
    let newSelectedOptions = [];
    if (isFunction(options)) {
      const canLoad =
        key === rootSelectedKey.value ||
        (key !== rootSelectedKey.value && parentValue);
      if (canLoad && !state.loading) {
        state.loading = true;
        newSelectedOptions = await options(state.selectedData);
        state.loading = false;
      }
    } else {
      newSelectedOptions = options || [];
    }

    if (Array.isArray(newSelectedOptions)) {
      if (newSelectedOptions.length) {
        selectedOptionsMap.set(parentValue, newSelectedOptions);
        selectedOptions = selectedOptionsMap.get(parentValue);
      }
    } else {
      console.warn(`[${UI_MULTI_SELECT.name}]: 'options' must return an array`);
    }
  }

  state.selectedOptions[key] = selectedOptions;
}

async function updateSelected(formData) {
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

async function getNextSelected(parentKey, parentValue) {
  const selectedIndex = selectedKeys.value.findIndex(
    (key) => key === parentKey
  );
  const nextSelectedKey = selectedKeys.value[selectedIndex + 1];
  if (nextSelectedKey) {
    parentValue
      ? await getNextOptions(nextSelectedKey, parentValue)
      : clearSelectedData(selectedIndex);
  }
}

async function getNextOptions(key, parentValue) {
  const currentComponent = props.components.find(
    (component) => component.key === key
  );
  const { options } = currentComponent;

  await setSelectedOptions(parentValue, { key, options });
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
    await getNextSelected(key, value);
  }

  emit(UI_MULTI_SELECT.EVENTS.CHANGE, state.selectedData);
}
</script>
