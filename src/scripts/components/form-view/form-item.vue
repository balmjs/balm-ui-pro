<template>
  <ui-form-field
    v-show="displayFormItem(config)"
    :class="[
      itemClass,
      'mdc-form-item',
      `mdc-form-item__${component}`,
      `mdc-form-item__${key}`
    ]"
    v-bind="attrOrProp"
  >
    <label
      v-if="config.label"
      :class="[
        'mdc-form-item__label',
        {
          required: config.required
        }
      ]"
    >
      <slot :name="customSlots.beforeLabel" :value="value"></slot>
      <span>{{ config.label }}</span>
      <slot :name="customSlots.afterLabel" :value="value"></slot>
    </label>
    <div class="mdc-form-item__item">
      <slot :name="customSlots.beforeItem" :value="value"></slot>
      <ui-readonly-item
        v-if="config.readonly"
        :subitem-class="subitemClass"
        :config="config"
        :value="value"
      >
        <slot :name="customSlots.readonly" :value="value"></slot>
      </ui-readonly-item>
      <template v-else>
        <component
          :is="config.component"
          v-show="displayFormItem(config)"
          v-model="formData[config.key]"
          v-bind="config.attrOrProp"
          @update:model-value="handleChange(config)"
        ></component>
      </template>
      <slot :name="customSlots.afterItem" :value="value"></slot>
    </div>
  </ui-form-field>
</template>

<script>
const name = 'UiFormItem';
const UI_FORM_ITEM = {
  EVENTS: {
    update: 'update:model-value',
    reload: 'reload:form-config'
  }
};

export default {
  name,
  customOptions: {
    name,
    UI_FORM_ITEM
  }
};
</script>

<script setup>
import { reactive, toRefs, computed, watch, onBeforeMount } from 'vue';
import UiReadonlyItem from './readonly-item.vue';
import { useFormItem } from '../../mixins/form-item';
import getType from '../../utils/typeof';

const props = defineProps({
  debug: {
    type: Boolean,
    default: false
  },
  itemClass: {
    type: String,
    default: ''
  },
  subitemClass: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Object,
    default: () => ({})
  },
  config: {
    type: Object,
    default: () => ({})
  },
  attrOrProp: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits([UI_FORM_ITEM.EVENTS.reload]);

const state = reactive({
  formData: props.modelValue
});
const { formData } = toRefs(state);

const { component, key, componentKey } = useFormItem(props.config);

const customSlots = computed(() => ({
  beforeLabel: `before-label__${componentKey.value}`,
  afterLabel: `after-label__${componentKey.value}`,
  beforeItem: `before-item__${componentKey.value}`,
  afterItem: `after-item__${componentKey.value}`,
  readonly: `readonly__${componentKey.value}`
}));
const value = computed(() => getModelValue(props.config));

onBeforeMount(() => {
  const customSlotsNames = Object.values(customSlots.value);
  props.debug &&
    customSlotsNames.length &&
    console.log(`[${name}] slots:`, customSlotsNames);
});

watch(
  () => props.modelValue,
  (val) => (state.formData = val)
);

function displayFormItem({ show }) {
  return getType(show) === 'undefined' || show;
}

function handleChange({ reload }) {
  reload && emit(UI_FORM_ITEM.EVENTS.reload);
}

function getModelValue({ key, value, defaultValue }) {
  return state.formData[key] || value || defaultValue;
}
</script>
