<template>
  <ui-form-field
    v-show="displayFormItem(config)"
    :class="className"
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
      <span>{{ getFormLabel(config) }}</span>
      <slot :name="customSlots.afterLabel" :value="value"></slot>
    </label>
    <div class="mdc-form-item__item">
      <slot :name="customSlots.beforeItem" :value="value"></slot>
      <template v-if="config.slot">
        <slot :name="config.slot" :value="value"></slot>
      </template>
      <template v-else>
        <slot :name="customSlots.componentItem" :value="value">
          <component
            :is="config.component"
            v-show="displayFormItem(config)"
            v-model="formData[config.key]"
            v-bind="
              Object.assign(
                {
                  componentKey,
                  formData,
                  formDataSource
                },
                config.attrOrProp
              )
            "
            @[eventName]="handleChange(config, $event)"
          ></component>
        </slot>
      </template>
      <slot :name="customSlots.afterItem" :value="value"></slot>
    </div>
  </ui-form-field>
</template>

<script>
const name = 'UiFormItem';
const UI_FORM_ITEM = {
  EVENTS: {
    update: 'update:modelValue'
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
import getType from '../../utils/typeof';

const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  },
  modelValue: {
    type: Object,
    default: () => ({})
  },
  formDataSource: {
    type: Object,
    default: () => ({})
  },
  attrOrProp: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits([UI_FORM_ITEM.EVENTS.update]);

const state = reactive({
  formData: props.modelValue
});
const { formData } = toRefs(state);

const eventName = computed(() => {
  return props.config.event || UI_FORM_ITEM.EVENTS.update;
});
const component = computed(() => props.config.component || 'unknown-component');
const key = computed(() => props.config.key || 'unknown-key');
const componentKey = computed(() => `${component.value}--${key.value}`);
const className = computed(() => [
  'mdc-form__item',
  'mdc-form-item',
  `mdc-form-item__${component.value}`,
  `mdc-form-item__${key.value}`
]);
const customSlots = computed(() => ({
  beforeLabel: `before-label__${componentKey.value}`,
  afterLabel: `after-label__${componentKey.value}`,
  beforeItem: `before-item__${componentKey.value}`,
  componentItem: `form-item__${componentKey.value}`,
  afterItem: `after-item__${componentKey.value}`
}));
const value = computed(() => getModelValue(props.config));

onBeforeMount(() => {
  if (props.config.debug) {
    const customSlotsNames = Object.values(customSlots.value);
    console.info(`[${name}] slots:`, customSlotsNames);
  }
});

watch(
  () => props.modelValue,
  (val) => (state.formData = val)
);

function displayFormItem({ show, key, value }) {
  const display =
    getType(show) === 'function'
      ? show(state.formData)
      : getType(show) === 'undefined' || show;

  !display && emit(UI_FORM_ITEM.EVENTS.update, key, value);

  return display;
}

function getFormLabel({ label }) {
  return getType(label) === 'function' ? label(state.formData) : label;
}

function handleChange({ component, key }, value) {
  props.config.debug &&
    console.info(`[${name}] ${component}@${eventName.value}`, key, value);

  emit(UI_FORM_ITEM.EVENTS.update, key, value);
}

function getModelValue({ key, value }) {
  return state.formData[key] || value;
}
</script>
