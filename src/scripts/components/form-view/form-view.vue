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
            <ui-grid-cell
              v-for="(configData, configIndex) in formConfig"
              :key="`form-item-${configData.key || configIndex}`"
              v-bind="gridCellAttrOrProp"
            >
              <ui-form-item
                :config="configData"
                :model-value="formData"
                :form-data-source="formDataSource"
                :attr-or-prop="formItemAttrOrProp"
                @change="handleChange"
              >
                <slot
                  v-for="(_, name) in $slots"
                  :slot="name"
                  :name="name"
                ></slot>
                <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
                  <slot
                    :name="name"
                    v-bind="
                      Object.assign({}, slotData, {
                        config: configData,
                        data: currentFormData
                      })
                    "
                  ></slot>
                </template>
              </ui-form-item>
            </ui-grid-cell>
          </ui-grid>
          <!-- Detail view -->
          <template v-else>
            <ui-form-item
              v-for="(configData, configIndex) in formConfig"
              :key="`form-item-${configData.key || configIndex}`"
              :config="configData"
              :model-value="formData"
              :form-data-source="formDataSource"
              :attr-or-prop="formItemAttrOrProp"
              @change="handleChange"
            >
              <slot
                v-for="(_, name) in $slots"
                :slot="name"
                :name="name"
              ></slot>
              <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
                <slot
                  :name="name"
                  v-bind="
                    Object.assign({}, slotData, {
                      config: configData,
                      data: currentFormData
                    })
                  "
                ></slot>
              </template>
            </ui-form-item>
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
              <template v-for="(buttonData, buttonIndex) in actionConfig">
                <ui-button
                  v-if="buttonData.type === NATIVE_BUTTON_TYPES.submit"
                  :key="`form-submit-${buttonIndex}`"
                  v-debounce="handleAction(buttonData)"
                  v-bind="buttonData.attrOrProp || {}"
                >
                  {{ buttonData.text }}
                </ui-button>
                <ui-button
                  v-else
                  :key="`form-button-${buttonIndex}`"
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
import UiFormItem from './form-item';
import getType, { isFunction } from '../../utils/typeof';

const UI_FORM_VIEW = {
  name: 'UiFormView',
  EVENTS: {
    loaded: 'loaded',
    update: 'change',
    updateFormItem: 'change:x',
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
  },
  data() {
    return {
      NATIVE_BUTTON_TYPES,
      formConfig: [],
      formData: {},
      formDataSource: this.modelValue,
      defaultModelOptions: {}
    };
  },
  computed: {
    isFunctionConfig() {
      return isFunction(this.modelConfig);
    },
    formDataConfig() {
      return this.formConfig.filter(
        ({ key, components }) =>
          getType(key) === 'string' || Array.isArray(components)
      );
    },
    hasFormDataSource() {
      return !!Object.keys(this.formDataSource).length;
    },
    currentFormData() {
      return this.useSource
        ? Object.assign({}, this.formDataSource, this.formData)
        : this.formData;
    }
  },
  watch: {
    async modelValue(val, oldVal) {
      this.formDataSource = Object.assign({}, oldVal, val);

      if (
        this.isFunctionConfig &&
        JSON.stringify(val) !== JSON.stringify(oldVal)
      ) {
        await this.setFormConfig();
      }

      if (this.hasFormDataSource) {
        this.updateFormData();
      } else {
        this.initFormData(Object.keys(oldVal).length);
      }
    },
    async modelConfig(val) {
      if (val === false) {
        this.resetFormView();
      } else {
        await this.setFormConfig(val, true);

        if (this.hasFormDataSource) {
          this.updateFormData();
        } else {
          const currentFormData = Object.assign(
            {},
            this.formDataSource,
            this.formData
          );
          const synchronized = Object.keys(currentFormData).length;
          !synchronized && this.syncFormData();
        }
      }
    },
    async modelOptions() {
      this.isFunctionConfig && (await this.setFormConfig());

      if (this.hasFormDataSource) {
        this.updateFormData();
      }
    }
  },
  async beforeMount() {
    await this.setFormConfig(this.modelConfig, true);

    const synchronized = this.updateFormData();
    !synchronized && this.syncFormData();
  },
  beforeDestroy() {
    this.resetFormView();
  },
  methods: {
    resetFormView() {
      this.formConfig = [];
      this.formData = {};
    },
    async setModelOptions() {
      const originalConfig = this.isFunctionConfig
        ? await this.modelConfig({
            data: this.formDataSource,
            ...this.modelOptions
          })
        : this.modelConfig;

      const modelList = originalConfig
        .filter(({ model }) => model)
        .map(({ model }) => model);

      this.defaultModelOptions = modelList.length
        ? await this.setModelOptionsFn(modelList)
        : {};

      if (getType(this.defaultModelOptions) !== 'object') {
        this.defaultModelOptions = {};
        console.warn(`[${UI_FORM_VIEW.name}]: Invalid form model options`);
      }
    },
    async setFormConfig(modelConfig = this.modelConfig, needInit = false) {
      if (needInit && isFunction(this.setModelOptionsFn)) {
        await this.setModelOptions();
      }

      const currentModelOptions = Object.assign(
        {},
        this.defaultModelOptions,
        this.modelOptions
      );

      const originalConfig = this.isFunctionConfig
        ? await modelConfig({
            data: this.formDataSource,
            ...currentModelOptions
          })
        : modelConfig;

      if (Array.isArray(originalConfig)) {
        this.formConfig = originalConfig.filter(
          (configData) => !configData.hasOwnProperty('if') || configData.if
        );

        if (needInit) {
          this.initFormData();

          if (Object.keys(this.formData).length) {
            this.$emit(UI_FORM_VIEW.EVENTS.loaded, this.formData);
          }
        }
      } else {
        console.warn(`[${UI_FORM_VIEW.name}]: invalid form model config`);
      }
    },
    syncFormData() {
      this.$emit(UI_FORM_VIEW.EVENTS.update, this.currentFormData);
    },
    initFormData(needSync = false) {
      this.formData = {};

      this.formDataConfig.forEach(({ key, value, components }) => {
        if (Array.isArray(components)) {
          components.forEach(({ key, value }) => {
            key && this.$set(this.formData, key, value);
          });
        } else {
          key && this.$set(this.formData, key, value);
        }
      });

      needSync && this.syncFormData();
    },
    updateFormData(newFormData = this.formDataSource) {
      let needSync = false;

      const newFormDataKeys = Object.keys(newFormData);
      const newFormConfig = this.formDataConfig.filter(
        ({ key, components }) =>
          newFormDataKeys.includes(key) ||
          (Array.isArray(components) &&
            components.some((component) =>
              newFormDataKeys.includes(component.key)
            ))
      );

      newFormConfig.forEach(({ key, components }) => {
        if (Array.isArray(components)) {
          components.forEach(({ key }) => {
            const newValue = newFormData[key];
            if (this.formData[key] !== newValue) {
              this.$set(this.formData, key, newValue);
              needSync = true;
            }
          });
        } else {
          const newValue = newFormData[key];
          if (this.formData[key] !== newValue) {
            this.$set(this.formData, key, newValue);
            needSync = true;
          }
        }
      });

      needSync && this.syncFormData();

      return needSync;
    },
    handleChange(key, value) {
      if (Array.isArray(key)) {
        for (let i = 0, len = key.length; i < len; i++) {
          const k = key[i];
          const v = value[i];
          if (this.formData[k] !== v) {
            this.$set(this.formData, k, v);
            this.$emit(UI_FORM_VIEW.EVENTS.updateFormItem, k, v);
          }
        }
      } else {
        this.$set(this.formData, key, value);
        this.$emit(UI_FORM_VIEW.EVENTS.updateFormItem, key, value);
      }

      this.syncFormData();
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
                    `[${UI_FORM_VIEW.name}]: BalmUI $validator plugin is missing`
                  );
                }
              } else {
                this.$emit(UI_FORM_VIEW.EVENTS.action, {
                  type: NATIVE_BUTTON_TYPES.submit,
                  valid: true
                });
              }
            },
            delay: delay || 250
          };
          break;
        case NATIVE_BUTTON_TYPES.reset:
          this.initFormData(true);
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
