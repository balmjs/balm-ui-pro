<template>
  <div
    :class="[
      'mdc-form-view',
      {
        'mdc-form-view--use-grid': useGrid
      }
    ]"
  >
    <ui-form
      class="mdc-form-view__form"
      v-bind="
        Object.assign(
          {
            type: useGrid ? 'horizontal' : 'vertical'
          },
          formAttrOrProp
        )
      "
    >
      <template #default="{ itemClass, subitemClass, actionClass }">
        <div class="mdc-form-view__items">
          <!-- Before from view -->
          <slot
            name="before-form-view"
            v-bind="{
              itemClass,
              subitemClass,
              data: currentFormData
            }"
          ></slot>
          <!-- List view -->
          <ui-grid
            v-if="useGrid"
            class="mdc-form-view__grid"
            v-bind="gridAttrOrProp"
          >
            <template
              v-for="(configData, configIndex) in formConfig"
              :key="`form-item-${configData.key || configIndex}`"
            >
              <ui-grid-cell v-bind="gridCellAttrOrProp">
                <ui-form-item
                  :config="configData"
                  :model-value="formData"
                  :form-data-source="formDataSource"
                  :attr-or-prop="formItemAttrOrProp"
                  @update:model-value="handleChange"
                >
                  <template
                    v-for="(_, slotName) in $slots"
                    #[slotName]="slotData"
                  >
                    <slot
                      :name="slotName"
                      v-bind="
                        Object.assign(slotData, {
                          config: configData,
                          data: currentFormData
                        })
                      "
                    ></slot>
                  </template>
                </ui-form-item>
              </ui-grid-cell>
            </template>
          </ui-grid>
          <!-- Detail view -->
          <template v-else>
            <template
              v-for="(configData, configIndex) in formConfig"
              :key="`form-item-${configData.key || configIndex}`"
            >
              <ui-form-item
                :config="configData"
                :model-value="formData"
                :form-data-source="formDataSource"
                :attr-or-prop="formItemAttrOrProp"
                @update:model-value="handleChange"
              >
                <template
                  v-for="(_, slotName) in $slots"
                  #[slotName]="slotData"
                >
                  <slot
                    :name="slotName"
                    v-bind="
                      Object.assign(slotData, {
                        config: configData,
                        data: currentFormData
                      })
                    "
                  ></slot>
                </template>
              </ui-form-item>
            </template>
          </template>
          <!-- After from view -->
          <slot
            name="after-form-view"
            v-bind="{
              itemClass,
              subitemClass,
              data: currentFormData
            }"
          ></slot>
          <!-- Action view -->

          <slot
            name="form-view-actions"
            v-bind="{
              className: [itemClass, actionClass],
              config: formConfig,
              data: currentFormData
            }"
          >
            <ui-form-field
              v-if="actionConfig.length"
              :class="[itemClass, actionClass]"
            >
              <template
                v-for="(buttonData, buttonIndex) in actionConfig"
                :key="`form-action-${buttonIndex}`"
              >
                <ui-button
                  v-if="buttonData.type === NATIVE_BUTTON_TYPES.submit"
                  v-debounce="handleAction(buttonData)"
                  v-bind="buttonData.attrOrProp || {}"
                >
                  {{ buttonData.text }}
                </ui-button>
                <ui-button
                  v-else
                  v-bind="buttonData.attrOrProp || {}"
                  @click="handleAction(buttonData)"
                >
                  {{ buttonData.text }}
                </ui-button>
              </template>
            </ui-form-field>
          </slot>
        </div>
      </template>
    </ui-form>
  </div>
</template>

<script>
const name = 'UiFormView';

const UI_FORM_VIEW = {
  EVENTS: {
    update: 'update:modelValue',
    updateFormItem: 'update:x',
    action: 'action'
  }
};

const NATIVE_BUTTON_TYPES = {
  button: 'button',
  submit: 'submit',
  reset: 'reset'
};

export default {
  name,
  customOptions: {
    NATIVE_BUTTON_TYPES
  }
};
</script>

<script setup>
import {
  inject,
  reactive,
  toRefs,
  computed,
  watch,
  onBeforeMount,
  onBeforeUnmount
} from 'vue';
import UiFormItem from './form-item.vue';
import getType, { isFunction } from '../../utils/typeof';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  useSource: {
    type: Boolean,
    default: false
  },
  modelConfig: {
    type: [Array, Function, Boolean],
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
  },
  actionConfig: {
    type: Array,
    default: () => []
  },
  setModelOptionsFn: {
    type: [Function, Boolean],
    default: false
  }
});

const emit = defineEmits([
  UI_FORM_VIEW.EVENTS.update,
  UI_FORM_VIEW.EVENTS.updateFormItem,
  UI_FORM_VIEW.EVENTS.action
]);

const validator = inject('validator');
const state = reactive({
  formConfig: [],
  formData: {},
  formDataSource: props.modelValue,
  defaultModelOptions: {}
});
const { formData, formConfig, formDataSource } = toRefs(state);

const isFunctionConfig = computed(() => isFunction(props.modelConfig));
const formDataConfig = computed(() =>
  state.formConfig.filter(
    ({ key, components }) =>
      getType(key) === 'string' || Array.isArray(components)
  )
);
const hasFormDataSource = computed(
  () => !!Object.keys(state.formDataSource).length
);
const currentFormData = computed(() =>
  props.useSource
    ? Object.assign({}, state.formDataSource, state.formData)
    : state.formData
);

onBeforeMount(() => {
  setFormConfig(props.modelConfig, true);

  const synchronized = updateFormData();
  !synchronized && syncFormData();
});

onBeforeUnmount(() => {
  resetFormView();
});

watch(
  () => props.modelValue,
  async (val, oldVal) => {
    state.formDataSource = Object.assign({}, oldVal, val);

    if (
      isFunctionConfig.value &&
      JSON.stringify(val) !== JSON.stringify(oldVal)
    ) {
      await setFormConfig();
    }

    if (hasFormDataSource.value) {
      updateFormData();
    } else {
      initFormData(Object.keys(oldVal).length);
    }
  }
);

watch(
  () => props.modelConfig,
  async (val) => {
    if (val === false) {
      resetFormView();
    } else {
      await setFormConfig(val, true);

      if (hasFormDataSource.value) {
        updateFormData();
      } else {
        const currentFormData = Object.assign(
          {},
          state.formDataSource,
          state.formData
        );
        const synchronized = Object.keys(currentFormData).length;
        !synchronized && syncFormData();
      }
    }
  }
);

watch(
  () => props.modelOptions,
  async (val) => {
    isFunctionConfig.value && (await setFormConfig());

    if (hasFormDataSource.value) {
      updateFormData();
    }
  }
);

function resetFormView() {
  state.formConfig = [];
  state.formData = {};
}

async function setModelOptions() {
  const originalConfig = isFunctionConfig.value
    ? await props.modelConfig({
        data: Object.assign({}, state.formDataSource),
        ...props.modelOptions
      })
    : props.modelConfig;

  const modelList = originalConfig
    .filter(({ model }) => model)
    .map(({ model }) => model);

  state.defaultModelOptions = modelList.length
    ? await props.setModelOptionsFn(modelList)
    : {};

  if (getType(state.defaultModelOptions) !== 'object') {
    state.defaultModelOptions = {};
    console.warn(`[${name}]: Invalid form model options`);
  }
}

async function setFormConfig(
  modelConfig = props.modelConfig,
  needInit = false
) {
  if (needInit && isFunction(props.setModelOptionsFn)) {
    await setModelOptions();
  }

  const currentModelOptions = Object.assign(
    {},
    state.defaultModelOptions,
    props.modelOptions
  );

  const originalConfig = isFunctionConfig.value
    ? await modelConfig({
        data: Object.assign({}, state.formDataSource),
        ...currentModelOptions
      })
    : modelConfig;

  if (Array.isArray(originalConfig)) {
    state.formConfig = originalConfig.filter(
      (configData) => !configData.hasOwnProperty('if') || configData.if
    );

    needInit && initFormData();
  } else {
    console.warn(`[${name}]: Invalid form model config`);
  }
}

function syncFormData() {
  emit(UI_FORM_VIEW.EVENTS.update, currentFormData.value);
}

function initFormData(needSync = false) {
  state.formData = {};

  formDataConfig.value.forEach(({ key, value, components }) => {
    if (Array.isArray(components)) {
      components.forEach(({ key, value }) => {
        key && (state.formData[key] = value);
      });
    } else {
      key && (state.formData[key] = value);
    }
  });

  needSync && syncFormData();
}

function updateFormData(newFormData = state.formDataSource) {
  let needSync = false;

  const newFormDataKeys = Object.keys(newFormData);
  const newFormConfig = formDataConfig.value.filter(
    ({ key, components }) =>
      newFormDataKeys.includes(key) ||
      (Array.isArray(components) &&
        components.some((component) => newFormDataKeys.includes(component.key)))
  );

  newFormConfig.forEach(({ key, components }) => {
    if (Array.isArray(components)) {
      components.forEach(({ key }) => {
        const newValue = newFormData[key];
        if (state.formData[key] !== newValue) {
          state.formData[key] = newValue;
          needSync = true;
        }
      });
    } else {
      const newValue = newFormData[key];
      if (state.formData[key] !== newValue) {
        state.formData[key] = newValue;
        needSync = true;
      }
    }
  });

  needSync && syncFormData();

  return needSync;
}

function handleChange(key, value) {
  if (Array.isArray(key)) {
    for (let i = 0, len = key.length; i < len; i++) {
      const k = key[i];
      const v = value[i];
      if (state.formData[k] !== v) {
        state.formData[k] = v;
        emit(UI_FORM_VIEW.EVENTS.updateFormItem, k, v);
      }
    }
  } else {
    state.formData[key] = value;
    emit(UI_FORM_VIEW.EVENTS.updateFormItem, key, value);
  }

  syncFormData();
}

function handleAction({ type, delay }) {
  let debounceConfig = {};

  switch (type) {
    case NATIVE_BUTTON_TYPES.submit:
      debounceConfig = {
        callback: () => {
          const validations = state.formConfig.filter(
            ({ validator }) => validator
          );
          if (validations.length) {
            if (validator.validate) {
              validator.set(validations);

              const result = validator.validate(state.formData);

              emit(UI_FORM_VIEW.EVENTS.action, {
                type: NATIVE_BUTTON_TYPES.submit,
                ...result
              });

              validator.clear();
            } else {
              console.warn(`[${name}]: BalmUI $validator plugin is missing`);
            }
          } else {
            emit(UI_FORM_VIEW.EVENTS.action, {
              type: NATIVE_BUTTON_TYPES.submit
            });
          }
        },
        delay: delay || 250
      };
      break;
    case NATIVE_BUTTON_TYPES.reset:
      initFormData(true);
      break;
  }

  return type === NATIVE_BUTTON_TYPES.submit
    ? debounceConfig
    : emit(UI_FORM_VIEW.EVENTS.action, {
        type: type || NATIVE_BUTTON_TYPES.button
      });
}
</script>
