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
          :name="`before-${UI_FORM_VIEW.NAMESPACE}`"
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
            <ui-grid-cell
              v-bind="configData.gridCellAttrOrProp || gridCellAttrOrProp"
            >
              <ui-form-item
                v-bind="{
                  components,
                  config: configData,
                  modelValue: formData,
                  modelValueSource: formDataSource,
                  attrOrProp: formItemAttrOrProp
                }"
                @update:model-value="handleChange"
              >
                <template
                  v-for="(_, slotName) in $slots"
                  #[slotName]="slotData"
                >
                  <slot
                    :name="slotName"
                    v-bind="getSlotData(slotData, configData)"
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
              v-bind="{
                components,
                config: configData,
                modelValue: formData,
                modelValueSource: formDataSource,
                attrOrProp: formItemAttrOrProp
              }"
              @update:model-value="handleChange"
            >
              <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
                <slot
                  :name="slotName"
                  v-bind="getSlotData(slotData, configData)"
                ></slot>
              </template>
            </ui-form-item>
          </template>
        </template>
        <!-- After from view -->
        <slot
          :name="`after-${UI_FORM_VIEW.NAMESPACE}`"
          v-bind="{
            itemClass,
            subitemClass,
            data: formData,
            dataSource: formDataSource
          }"
        ></slot>
        <!-- Action view -->

        <slot
          :name="`${UI_FORM_VIEW.NAMESPACE}-actions`"
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
              <template v-if="ifAction(buttonData)">
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
            </template>
          </ui-form-field>
        </slot>
      </div>
    </template>
  </ui-form>
</template>

<script>
const UI_FORM_VIEW = {
  NAME: 'UiFormView',
  NAMESPACE: 'form-view',
  EVENTS: {
    loaded: 'loaded',
    reload: 'reload',
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
  name: UI_FORM_VIEW.NAME,
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
  components: {
    type: Object,
    default: () => ({})
  },
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
  actionRendering: {
    type: Function,
    default: () => true
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
  formDataKeys: {},
  formDataSource: props.modelValue,
  formData: {},
  formOptions: props.modelOptions,
  privateModelOptions: {},
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
  () => props.modelValue,
  async (val) => {
    if (JSON.stringify(val) !== JSON.stringify(state.formDataSource)) {
      state.formDataSource = Object.assign({}, state.formDataSource, val);

      if (!state.formUpdating) {
        state.formUpdating = true;

        if (isFunctionConfig.value) {
          await setFormConfig();
        }

        if (hasFormDataSource.value) {
          updateFormData();
        } else {
          initFormData();
        }

        state.formUpdating = false;
      }
    }
  },
  {
    deep: true
  }
);

watch(
  () => props.modelOptions,
  async (val) => {
    if (
      !state.formUpdating &&
      isFunctionConfig.value &&
      JSON.stringify(val) !== JSON.stringify(state.formOptions)
    ) {
      state.formUpdating = true;

      await setFormConfig();

      if (hasFormDataSource.value) {
        updateFormData();
      }

      state.formUpdating = false;
    }
  },
  {
    deep: true
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
        state.formOptions
      )
    : props.modelConfig;

  const modelList = originalConfig
    .filter(({ model }) => model)
    .map(({ model }) => model);

  state.privateModelOptions = modelList.length
    ? await props.setModelOptionsFn(modelList)
    : {};

  if (getType(state.privateModelOptions) !== 'object') {
    state.privateModelOptions = {};
    console.warn(`[${UI_FORM_VIEW.NAME}]: Invalid form model options`);
  }
}

async function setFormConfig(
  modelConfig = props.modelConfig,
  needInit = false
) {
  if (needInit && isFunction(props.setModelOptionsFn)) {
    await setModelOptions();
  }

  state.formOptions = Object.assign(
    {},
    state.privateModelOptions,
    props.modelOptions
  );

  const originalConfig = isFunctionConfig.value
    ? await modelConfig(
        Object.assign({}, state.formDataSource),
        state.formOptions
      )
    : modelConfig;

  if (Array.isArray(originalConfig)) {
    state.formConfig = originalConfig.filter(
      (configData) => !configData.hasOwnProperty('if') || configData.if
    );

    if (needInit) {
      initFormData();
      loadFormData();
    } else {
      changeFormData();
    }
  } else {
    console.warn(`[${UI_FORM_VIEW.NAME}]: Invalid form model config`);
  }
}

function loadFormData(reload = false) {
  if (state.formDataKeys.length) {
    emit(
      reload ? UI_FORM_VIEW.EVENTS.reload : UI_FORM_VIEW.EVENTS.loaded,
      Object.assign({}, state.formData)
    );
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
        key && (state.formData[key] = value);
      });
    } else {
      key && (state.formData[key] = value);
    }
  });

  state.formDataKeys = Object.keys(state.formData);

  needSync && syncFormData();
}

function changeFormData() {
  const newFormData = {};

  formDataConfig.value.forEach(({ key, value, components }) => {
    if (Array.isArray(components)) {
      components.forEach(({ key, value }) => {
        newFormData[key] = state.formData.hasOwnProperty(key)
          ? state.formData[key]
          : value;
      });
    } else {
      newFormData[key] = state.formData.hasOwnProperty(key)
        ? state.formData[key]
        : value;
    }
  });

  const newFormDataKeys = Object.keys(newFormData);
  const needSync =
    JSON.stringify(newFormDataKeys) !== JSON.stringify(state.formDataKeys);

  if (needSync) {
    state.formDataKeys = newFormDataKeys;
    state.formData = Object.assign({}, newFormData);
    loadFormData(true);
  }
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

function exposeAction(action, result) {
  const { handler, ...actionConfig } = action;
  const customHandler = isFunction(handler) ? handler : false;

  customHandler
    ? customHandler(actionConfig, result)
    : emit(UI_FORM_VIEW.EVENTS.action, actionConfig, result);
}

function ifAction(action) {
  let result = false;

  if (state.formDataKeys.length) {
    const currentAction = action.if;

    const formViewData = {
      config: state.formConfig,
      data: state.formData,
      dataSource: state.formDataSource
    };

    result = isFunction(currentAction)
      ? currentAction(formViewData)
      : props.actionRendering(action, formViewData);
  }

  return result;
}

function validateForm(action) {
  const validations = state.formConfig.filter(({ validator }) => validator);

  if (validations.length) {
    if (validator.validate) {
      validator.set(validations);

      const result = validator.validate(state.formData);

      exposeAction(action, result);

      validator.clear();
    } else {
      console.warn(
        `[${UI_FORM_VIEW.NAME}]: BalmUI $validator plugin is missing`
      );
    }
  } else {
    exposeAction(action, {
      valid: true,
      message: '',
      messages: [],
      validMsg: {}
    });
  }
}

function handleAction(action) {
  let debounceConfig = {};

  switch (action.type) {
    case NATIVE_BUTTON_TYPES.submit:
      debounceConfig = {
        callback: () => validateForm(action),
        delay: action.delay || 250
      };
      break;
    case NATIVE_BUTTON_TYPES.reset:
      initFormData(true);
      break;
  }

  return action.type === NATIVE_BUTTON_TYPES.submit
    ? debounceConfig
    : validateForm(action);
}

function getSlotData(slotData, config) {
  return Object.assign({}, slotData, {
    config,
    data: state.formData,
    dataSource: state.formDataSource
  });
}
</script>
