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
            <template v-for="(configData, configIndex) in formConfig">
              <ui-grid-cell
                :key="`form-item-${configData.key || configIndex}`"
                v-bind="gridCellAttrOrProp"
              >
                <ui-form-item
                  :config="configData"
                  :model-value="formData"
                  :form-data-source="formDataSource"
                  :attr-or-prop="
                    Object.assign(
                      { itemClass, subitemClass },
                      formItemAttrOrProp
                    )
                  "
                  @change="handleChange"
                >
                  <template
                    v-for="(_, slotName) in $scopedSlots"
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
            <template v-for="(configData, configIndex) in formConfig">
              <ui-form-item
                :key="`form-item-${configData.key || configIndex}`"
                :config="configData"
                :model-value="formData"
                :form-data-source="formDataSource"
                :attr-or-prop="
                  Object.assign({ itemClass, subitemClass }, formItemAttrOrProp)
                "
                @change="handleChange"
              >
                <template
                  v-for="(_, slotName) in $scopedSlots"
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
              <template v-for="(buttonData, buttonIndex) in actionConfig">
                <ui-button
                  v-if="buttonData.type === NATIVE_BUTTON_TYPES.submit"
                  :key="`form-submit-${buttonIndex}`"
                  v-debounce="handleAction(buttonData)"
                  v-bind="buttonData.attrOrProp"
                >
                  {{ buttonData.text }}
                </ui-button>
                <ui-button
                  v-else
                  :key="`form-button-${buttonIndex}`"
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
import UiFormItem from './form-item';
import getType from '../../utils/typeof';

const UI_FORM_VIEW = {
  EVENTS: {
    update: 'change',
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
  components: {
    UiFormItem
  },
  model: {
    prop: 'modelValue',
    event: UI_FORM_VIEW.EVENTS.update
  },
  props: {
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
  },
  data() {
    return {
      NATIVE_BUTTON_TYPES,
      formConfig: [],
      formData: {},
      formDataSource: this.modelValue
    };
  },
  computed: {
    currentFormConfig() {
      return this.formConfig.filter(({ key }) => key);
    },
    formDataKeys() {
      return this.currentFormConfig.map(({ key }) => key);
    },
    hasFormDataSource() {
      return Object.keys(this.formDataSource).length;
    }
  },
  watch: {
    modelConfig(val, oldVal) {
      if (!val.length && oldVal.length) {
        this.resetFormView();
      } else {
        this.setFormConfig(val);
        if (this.hasFormDataSource) {
          this.updateFormData();
        }
      }
    },
    modelValue(val, oldVal) {
      this.formDataSource = Object.assign({}, val);
      if (this.hasFormDataSource) {
        this.updateFormData();
      } else {
        this.resetFormData(Object.keys(oldVal).length);
      }
    }
  },
  beforeMount() {
    this.setFormConfig();
    const synchronized = this.updateFormData();
    if (!synchronized) {
      this.$emit(UI_FORM_VIEW.EVENTS.update, this.formData);
    }
  },
  beforeDestroy() {
    this.resetFormView();
  },
  methods: {
    resetFormView() {
      this.formConfig = [];
      this.formData = {};
      this.formDataSource = {};
    },
    setFormConfig(modelConfig = this.modelConfig) {
      const isFunctionConfig = getType(modelConfig) === 'function';
      const originalConfig = isFunctionConfig
        ? modelConfig({
            data: this.formData,
            dataSource: this.formDataSource,
            ...this.modelOptions
          })
        : modelConfig;

      if (Array.isArray(originalConfig)) {
        const formConfig = originalConfig.filter(
          (configData) =>
            getType(configData.if) === 'undefined' || configData.if
        );
        this.formConfig = formConfig;

        this.initFormData();
      } else {
        console.warn(`[UiFormView]: Invalid form model config`);
      }
    },
    initFormData() {
      const formConfig = this.currentFormConfig;
      const formConfigCount = formConfig.length;
      if (formConfigCount) {
        for (let i = 0; i < formConfigCount; i++) {
          const { key, value } = formConfig[i];
          this.$set(this.formData, key, value);
        }
      }
    },
    updateFormData(newFormData = this.formDataSource) {
      let needSync = false;

      if (this.currentFormConfig.length) {
        const formDataKeys = this.formDataKeys;
        const newFormDataKeys = Object.keys(newFormData).filter((key) =>
          formDataKeys.includes(key)
        );
        const newFormDataKeysCount = newFormDataKeys.length;
        for (let i = 0; i < newFormDataKeysCount; i++) {
          const key = newFormDataKeys[i];
          if (this.formData[key] !== newFormData[key]) {
            this.$set(this.formData, key, newFormData[key]);
            needSync = true;
          }
        }

        needSync && this.$emit(UI_FORM_VIEW.EVENTS.update, this.formData);
      }

      return needSync;
    },
    resetFormData(needSync) {
      this.formData = {};
      const formConfig = this.currentFormConfig;
      formConfig.forEach(({ key, value }) => {
        this.$set(this.formData, key, value);
      });
      needSync && this.$emit(UI_FORM_VIEW.EVENTS.update, this.formData);
    },
    handleChange(key, value) {
      this.$set(this.formData, key, value);
      this.$emit(UI_FORM_VIEW.EVENTS.update, this.formData);
    },
    handleAction({ type, delay }) {
      let debounceConfig = {};

      switch (type) {
        case NATIVE_BUTTON_TYPES.submit:
          debounceConfig = {
            callback: () => {
              const validations = this.formConfig.filter(
                ({ validator }) => validator
              );
              if (validations.length) {
                if (this.$validate) {
                  this.$validations.set(validations);

                  const result = this.$validate(this.formData);

                  this.$emit(UI_FORM_VIEW.EVENTS.action, {
                    type: NATIVE_BUTTON_TYPES.submit,
                    ...result
                  });

                  this.$validations.clear();
                } else {
                  console.warn(
                    `[UiFormView]: BalmUI $validator plugin is missing`
                  );
                }
              } else {
                this.$emit(UI_FORM_VIEW.EVENTS.action, {
                  type: NATIVE_BUTTON_TYPES.submit
                });
              }
            },
            delay: delay || 250
          };
          break;
        case NATIVE_BUTTON_TYPES.reset:
          this.resetFormData(true);
          break;
      }

      return type === NATIVE_BUTTON_TYPES.submit
        ? debounceConfig
        : this.$emit(UI_FORM_VIEW.EVENTS.action, {
            type: type || NATIVE_BUTTON_TYPES.button
          });
    }
  }
};
</script>
