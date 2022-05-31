<template>
  <div
    :class="[
      'mdc-form-view',
      {
        'mdc-form-view--use-grid': useGrid
      }
    ]"
  >
    <template v-if="debug">
      <div>Form config: {{ formConfig }}</div>
      <hr />
      <div>Form data: {{ formData }}</div>
    </template>
    <ui-form
      class="mdc-form-view__form"
      :type="useGrid ? 'horizontal' : 'vertical'"
      v-bind="formAttrOrProp"
    >
      <template #default="{ itemClass, subitemClass, actionClass }">
        <div class="mdc-form-view__items">
          <!-- For list view -->
          <ui-grid v-if="useGrid" v-bind="gridAttrOrProp">
            <slot
              name="before"
              :class-name="[itemClass, subitemClass, actionClass]"
            ></slot>
            <template
              v-for="(configData, configIndex) in formConfig"
              :key="`form-item-${configData.key || configIndex}`"
            >
              <ui-grid-cell v-bind="gridCellAttrOrProp">
                <ui-form-item
                  v-model="formData"
                  :debug="debug"
                  :item-class="itemClass"
                  :subitem-class="subitemClass"
                  :config="configData"
                  :attr-or-prop="formItemAttrOrProp"
                  @reload:form-config="setFormConfig"
                >
                  <template
                    v-for="(_, slotName) in $slots"
                    #[slotName]="{ value }"
                  >
                    <slot
                      :name="slotName"
                      :value="value"
                      :config="configData"
                    ></slot>
                  </template>
                </ui-form-item>
              </ui-grid-cell>
            </template>
            <slot
              name="after"
              :class-name="[itemClass, subitemClass, actionClass]"
            ></slot>
          </ui-grid>
          <!-- For detail view -->
          <template v-else>
            <slot
              name="before"
              :class-name="[itemClass, subitemClass, actionClass]"
            ></slot>
            <template
              v-for="(configData, configIndex) in formConfig"
              :key="`form-item-${configData.key || configIndex}`"
            >
              <ui-form-item
                v-model="formData"
                :debug="debug"
                :item-class="itemClass"
                :subitem-class="subitemClass"
                :config="configData"
                :attr-or-prop="formItemAttrOrProp"
                @reload:form-config="setFormConfig"
              >
                <template
                  v-for="(_, slotName) in $slots"
                  #[slotName]="{ value }"
                >
                  <slot
                    :name="slotName"
                    :value="value"
                    :config="configData"
                  ></slot>
                </template>
              </ui-form-item>
            </template>
            <slot
              name="after"
              :class-name="[itemClass, subitemClass, actionClass]"
            ></slot>
          </template>
          <!-- Form actions -->
          <ui-form-field :class="[itemClass, actionClass]">
            <slot name="actions"></slot>
          </ui-form-field>
        </div>
      </template>
    </ui-form>
  </div>
</template>

<script>
export default {
  name: 'UiFormView'
};
</script>

<script setup>
import { reactive, toRefs, watch, onBeforeMount } from 'vue';
import UiFormItem from './form-item.vue';
import getType from '../../utils/typeof';

const props = defineProps({
  debug: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Object,
    default: () => ({})
  },
  modelConfig: {
    type: [Array, Function],
    default: () => [],
    required: true
  },
  modelOptions: {
    type: Object,
    default: () => ({})
  },
  useGrid: {
    type: Boolean,
    default: false
  },
  formAttrOrProp: {
    type: Object,
    default: () => ({})
  },
  formItemAttrOrProp: {
    type: Object,
    default: () => ({})
  },
  gridAttrOrProp: {
    type: Object,
    default: () => ({})
  },
  gridCellAttrOrProp: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['update:modelValue', 'loaded']);

const state = reactive({
  formData: props.modelValue,
  formConfig: []
});
const { formData, formConfig } = toRefs(state);

onBeforeMount(() => {
  setFormConfig();
});

watch(
  () => props.modelValue,
  (val) => {
    state.formData = Object.assign(state.formData, val);
  }
);

watch(
  () => props.modelConfig,
  (val) => {
    setFormConfig(val);
  }
);

function setFormConfig(modelConfig = props.modelConfig) {
  const isFunctionConfig = getType(modelConfig) === 'function';
  const originalConfig = isFunctionConfig
    ? modelConfig({
        data: state.formData,
        ...props.modelOptions
      })
    : modelConfig;

  if (Array.isArray(originalConfig)) {
    const formConfig = originalConfig.filter(
      (configData) => getType(configData.if) === 'undefined' || configData.if
    );
    state.formConfig = formConfig;

    initFormDataByConfig();

    isFunctionConfig && emit('loaded', formConfig);
  } else {
    console.warn(`[UiFormView]: Invalid form model config`);
  }
}

function initFormDataByConfig() {
  const formConfig = state.formConfig;
  const needInit = formConfig.length && !Object.keys(state.formData).length;
  needInit &&
    formConfig
      .filter(({ key }) => key)
      .forEach(({ key, value }) => (state.formData[key] = value));
}
</script>
