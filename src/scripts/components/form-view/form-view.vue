<template>
  <ui-form
    :class="{
      'mdc-form-view': true,
      'mdc-form-view--use-grid': useGrid
    }"
    v-bind="
      Object.assign(
        {},
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
            data: formData,
            dataSource: formDataSource
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
                      Object.assign({}, slotData, {
                        config: configData,
                        data: formData,
                        dataSource: formDataSource
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
              <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
                <slot
                  :name="slotName"
                  v-bind="
                    Object.assign({}, slotData, {
                      config: configData,
                      data: formData,
                      dataSource: formDataSource
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
            data: formData,
            dataSource: formDataSource
          }"
        ></slot>
        <!-- Action view -->

        <slot
          name="form-view-actions"
          v-bind="{
            className: [itemClass, actionClass],
            config: formConfig,
            data: formData,
            dataSource: formDataSource
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
</template>

<script>
const UI_FORM_VIEW = {
  name: 'UiFormView',
  EVENTS: {
    loaded: 'loaded',
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
  name: UI_FORM_VIEW.name,
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

const validator = inject('validator');

const props = defineProps({
  modelConfig: {
    type: [Array, Function, Boolean],
    required: true
  },
  modelValue: {
    type: Object,
    default: () => ({})
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
  UI_FORM_VIEW.EVENTS.loaded,
  UI_FORM_VIEW.EVENTS.update,
  UI_FORM_VIEW.EVENTS.updateFormItem,
  UI_FORM_VIEW.EVENTS.action
]);

const state = reactive({
  formConfig: [],
  formData: {},
  formDataSource: props.modelValue,
  formOptions: {},
  formUpdating: false
});
const { formConfig, formData, formDataSource } = toRefs(state);

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
  Object.assign({}, state.formDataSource, state.formData)
);

onBeforeMount(async () => {
  await setFormConfig(props.modelConfig, true);

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

    if (!state.formUpdating) {
      state.formUpdating = true;

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

      state.formUpdating = false;
    }
  }
);

watch(
  () => props.modelConfig,
  async (val) => {
    if (val === false) {
      resetFormView();
    } else {
      if (!state.formUpdating) {
        state.formUpdating = true;

        await setFormConfig(val, true);

        if (hasFormDataSource.value) {
          updateFormData();
        } else {
          const synchronized = Object.keys(state.formData).length;
          !synchronized && syncFormData();
        }

        state.formUpdating = false;
      }
    }
  }
);

watch(
  () => props.modelOptions,
  async (val, oldVal) => {
    if (
      !state.formUpdating &&
      isFunctionConfig.value &&
      Object.keys(val).length !== Object.keys(oldVal).length
    ) {
      state.formUpdating = true;

      await setFormConfig();

      if (hasFormDataSource.value) {
        updateFormData();
      }

      state.formUpdating = false;
    }
  }
);

function resetFormView() {
  state.formConfig = [];
  state.formData = {};
}

async function setModelOptions() {
  const originalConfig = isFunctionConfig.value
    ? await props.modelConfig(
        Object.assign({}, state.formDataSource),
        Object.assign({}, props.modelOptions)
      )
    : props.modelConfig;

  const modelList = originalConfig
    .filter(({ model }) => model)
    .map(({ model }) => model);

  state.formOptions = modelList.length
    ? await props.setModelOptionsFn(modelList)
    : {};

  if (getType(state.formOptions) !== 'object') {
    state.formOptions = {};
    console.warn(`[${UI_FORM_VIEW.name}]: Invalid form model options`);
  }
}

async function setFormConfig(
  modelConfig = props.modelConfig,
  needInit = false
) {
  if (needInit && isFunction(props.setModelOptionsFn)) {
    await setModelOptions();
  }

  const originalConfig = isFunctionConfig.value
    ? await modelConfig(
        Object.assign({}, state.formDataSource),
        Object.assign({}, state.formOptions, props.modelOptions)
      )
    : modelConfig;

  if (Array.isArray(originalConfig)) {
    state.formConfig = originalConfig.filter(
      (configData) => !configData.hasOwnProperty('if') || configData.if
    );

    if (needInit) {
      initFormData();

      if (Object.keys(state.formData).length) {
        emit(UI_FORM_VIEW.EVENTS.loaded, Object.assign({}, state.formData));
      }
    }
  } else {
    console.warn(`[${UI_FORM_VIEW.name}]: Invalid form model config`);
  }
}

function syncFormData() {
  if (!state.formUpdating) {
    emit(UI_FORM_VIEW.EVENTS.update, state.formData);
  }
}

function initFormData(needSync = false) {
  state.formData = {};

  formDataConfig.value.forEach(({ key, value, components }) => {
    if (Array.isArray(components)) {
      components.forEach(({ key, value }) => {
        const initialValue = state.formDataSource[key] || value;
        key && (state.formData[key] = initialValue);
      });
    } else {
      const initialValue = state.formDataSource[key] || value;
      key && (state.formData[key] = initialValue);
    }
  });

  needSync && syncFormData();
}

function updateFormData() {
  let needSync = false;

  const newFormData = state.formDataSource;
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

function exposeAction(action, result = {}) {
  const { handler, ...actionConfig } = action;
  const customHandler = isFunction(handler) ? handler : false;

  customHandler
    ? customHandler(actionConfig, result)
    : emit(UI_FORM_VIEW.EVENTS.action, actionConfig, result);
}

function handleAction(action) {
  let debounceConfig = {};

  switch (action.type) {
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

              exposeAction(action, result);

              validator.clear();
            } else {
              console.warn(
                `[${UI_FORM_VIEW.name}]: BalmUI $validator plugin is missing`
              );
            }
          } else {
            exposeAction(action, { valid: true });
          }
        },
        delay: action.delay || 250
      };
      break;
    case NATIVE_BUTTON_TYPES.reset:
      initFormData(true);
      break;
  }

  return action.type === NATIVE_BUTTON_TYPES.submit
    ? debounceConfig
    : exposeAction(action);
}
</script>
