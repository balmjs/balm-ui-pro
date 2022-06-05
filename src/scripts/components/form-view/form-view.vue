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
      :type="useGrid ? 'horizontal' : 'vertical'"
      v-bind="formAttrOrProp"
    >
      <template #default="{ itemClass, subitemClass, actionClass }">
        <div class="mdc-form-view__items">
          <!-- For list view -->
          <ui-grid v-if="useGrid" v-bind="gridAttrOrProp">
            <slot
              name="before"
              v-bind="{
                itemClass,
                subitemClass,
                data: formData
              }"
            ></slot>
            <template
              v-for="(configData, configIndex) in formConfig"
              :key="`form-item-${configData.key || configIndex}`"
            >
              <ui-grid-cell v-bind="gridCellAttrOrProp">
                <ui-form-item
                  :item-class="itemClass"
                  :subitem-class="subitemClass"
                  :model-value="formData"
                  :config="configData"
                  :attr-or-prop="formItemAttrOrProp"
                  @update:model-value="handleChange"
                  @reload:form-config="setFormConfig"
                >
                  <template
                    v-for="(_, slotName) in $slots"
                    #[slotName]="{ value }"
                  >
                    <slot
                      :name="slotName"
                      v-bind="{
                        value,
                        config: configData,
                        data: formData
                      }"
                    ></slot>
                  </template>
                </ui-form-item>
              </ui-grid-cell>
            </template>
            <slot
              name="after"
              v-bind="{
                itemClass,
                subitemClass,
                data: formData
              }"
            ></slot>
          </ui-grid>
          <!-- For detail view -->
          <template v-else>
            <slot
              name="before"
              v-bind="{
                itemClass,
                subitemClass,
                data: formData
              }"
            ></slot>
            <template
              v-for="(configData, configIndex) in formConfig"
              :key="`form-item-${configData.key || configIndex}`"
            >
              <ui-form-item
                :item-class="itemClass"
                :subitem-class="subitemClass"
                :model-value="formData"
                :config="configData"
                :attr-or-prop="formItemAttrOrProp"
                @update:model-value="handleChange"
                @reload:form-config="setFormConfig"
              >
                <template
                  v-for="(_, slotName) in $slots"
                  #[slotName]="{ value }"
                >
                  <slot
                    :name="slotName"
                    v-bind="{
                      value,
                      config: configData,
                      data: formData
                    }"
                  ></slot>
                </template>
              </ui-form-item>
            </template>
            <slot
              name="after"
              v-bind="{
                itemClass,
                subitemClass,
                data: formData
              }"
            ></slot>
          </template>
          <slot
            name="actions"
            v-bind="{
              className: [itemClass, actionClass],
              data: formData
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
                  v-bind="buttonData.attrOrProp"
                >
                  {{ buttonData.text }}
                </ui-button>
                <ui-button
                  v-else
                  v-bind="buttonData.attrOrProp"
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
const UI_FORM_VIEW = {
  EVENTS: {
    update: 'update:model-value',
    action: 'action'
  }
};

const NATIVE_BUTTON_TYPES = {
  button: 'button',
  submit: 'submit',
  reset: 'reset'
};

export default {
  name: 'UiFormView',
  customOptions: {
    UI_FORM_VIEW,
    NATIVE_BUTTON_TYPES
  }
};
</script>

<script setup>
import { inject, reactive, toRefs, computed, watch, onBeforeMount } from 'vue';
import UiFormItem from './form-item.vue';
import getType from '../../utils/typeof';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  modelConfig: {
    type: [Array, Function],
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
  syncModelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits([
  UI_FORM_VIEW.EVENTS.update,
  UI_FORM_VIEW.EVENTS.action
]);

const validator = inject('validator');
const state = reactive({
  formConfig: [],
  formData: {},
  formDataSource: props.modelValue
});
const { formData, formConfig } = toRefs(state);

const currentFormConfig = computed(() =>
  state.formConfig.filter(({ key }) => key)
);
const formDataKeys = computed(() =>
  currentFormConfig.value.map(({ key }) => key)
);
const hasFormDataSource = computed(
  () => Object.keys(state.formDataSource).length
);

onBeforeMount(() => {
  setFormConfig();
  updateFormData();
});

watch(
  () => props.modelConfig,
  (val) => {
    setFormConfig(val);
    if (hasFormDataSource.value) {
      updateFormData();
    }
  }
);

watch(
  () => props.modelValue,
  (val) => {
    state.formDataSource = Object.assign({}, val);
    updateFormData();
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

    initFormData();
  } else {
    console.warn(`[UiFormView]: Invalid form model config`);
  }
}

function initFormData() {
  const formConfig = currentFormConfig.value;
  const formConfigCount = formConfig.length;
  if (formConfigCount) {
    for (let i = 0; i < formConfigCount; i++) {
      const { key, value } = formConfig[i];
      state.formData[key] = value;
    }
  }
}

function updateFormData(newFormData = state.formDataSource) {
  if (currentFormConfig.value.length) {
    let needSync = false;

    const newFormDataKeys = Object.keys(newFormData).filter((key) =>
      formDataKeys.value.includes(key)
    );
    const newFormDataKeysCount = newFormDataKeys.length;
    for (let i = 0; i < newFormDataKeysCount; i++) {
      const key = newFormDataKeys[i];
      if (state.formData[key] !== newFormData[key]) {
        state.formData[key] = newFormData[key];
        needSync = true;
      }
    }

    if (needSync) {
      emit(UI_FORM_VIEW.EVENTS.update, state.formData);
    }
  }
}

function handleChange(key, value) {
  state.formData[key] = value;
  emit(UI_FORM_VIEW.EVENTS.update, state.formData);
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
              console.warn(`[UiFormView]: BalmUI $validator plugin is missing`);
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
      const formConfig = currentFormConfig.value;
      if (formConfig.length) {
        formConfig.forEach(({ key, value }) => {
          state.formData[key] = value;
        });
      }
      emit(UI_FORM_VIEW.EVENTS.update, state.formData);
      break;
  }

  return type === NATIVE_BUTTON_TYPES.submit
    ? debounceConfig
    : emit(UI_FORM_VIEW.EVENTS.action, {
        type: type || NATIVE_BUTTON_TYPES.button
      });
}
</script>
