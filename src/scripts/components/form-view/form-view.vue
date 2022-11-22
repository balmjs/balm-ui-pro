<template>
  <ui-form
    :class="{
      'mdc-form-view': true,
      'mdc-form-view--use-grid': useGrid
    }"
    v-bind="
      Object.assign(
        {},
        { type: useGrid ? 'horizontal' : 'vertical' },
        formAttrOrProp
      )
    "
  >
    <template #default="{ itemClass, subitemClass, actionClass }">
      <div class="mdc-form-view__items">
        <!-- Before from view -->
        <slot
          :name="`before-${namespace}`"
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
          <ui-grid-cell
            v-for="(configData, configIndex) in formConfig"
            :key="`form-item-${configData.key || configIndex}`"
            v-bind="gridCellAttrOrProp"
          >
            <ui-form-item
              v-bind="{
                config: configData,
                modelValue: formData,
                formDataSource,
                attrOrProp: formItemAttrOrProp
              }"
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
                  v-bind="getSlotData(slotData, configData)"
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
            v-bind="{
              config: configData,
              modelValue: formData,
              formDataSource,
              attrOrProp: formItemAttrOrProp
            }"
            @change="handleChange"
          >
            <slot v-for="(_, name) in $slots" :slot="name" :name="name"></slot>
            <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
              <slot
                :name="name"
                v-bind="getSlotData(slotData, configData)"
              ></slot>
            </template>
          </ui-form-item>
        </template>
        <!-- After from view -->
        <slot
          :name="`after-${namespace}`"
          v-bind="{
            itemClass,
            subitemClass,
            data: formData,
            dataSource: formDataSource
          }"
        ></slot>
        <!-- Action view -->
        <slot
          :name="`${namespace}-actions`"
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
            <template v-for="(buttonData, buttonIndex) in actionConfig">
              <template v-if="ifAction(buttonData)">
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
            </template>
          </ui-form-field>
        </slot>
      </div>
    </template>
  </ui-form>
</template>

<script>
import UiFormItem from './form-item.vue';
import getType, { isFunction } from '../../utils/typeof';

const UI_FORM_VIEW = {
  NAME: 'UiFormView',
  NAMESPACE: 'form-view',
  EVENTS: {
    loaded: 'loaded',
    reload: 'reload',
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
  name: UI_FORM_VIEW.NAME,
  components: {
    UiFormItem
  },
  model: {
    prop: 'modelValue',
    event: UI_FORM_VIEW.EVENTS.update
  },
  props: {
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
  },
  data() {
    return {
      namespace: UI_FORM_VIEW.NAMESPACE,
      NATIVE_BUTTON_TYPES,
      formConfig: [],
      formDataKeys: {},
      formDataSource: this.modelValue,
      formData: {},
      formOptions: this.modelOptions,
      privateModelOptions: {},
      formUpdating: false
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
    }
  },
  watch: {
    async modelConfig(val) {
      if (val === false) {
        this.resetFormView();
      } else {
        if (!this.formUpdating) {
          this.formUpdating = true;

          await this.setFormConfig(val, true);

          if (this.hasFormDataSource) {
            this.updateFormData();
          } else {
            const synchronized = Object.keys(this.formData).length;
            !synchronized && this.syncFormData();
          }

          this.formUpdating = false;
        }
      }
    },
    modelValue: {
      async handler(val) {
        if (JSON.stringify(val) !== JSON.stringify(this.formDataSource)) {
          this.formDataSource = Object.assign({}, this.formDataSource, val);

          if (!this.formUpdating) {
            this.formUpdating = true;

            if (this.isFunctionConfig) {
              await this.setFormConfig();
            }

            if (this.hasFormDataSource) {
              this.updateFormData();
            } else {
              this.initFormData();
            }

            this.formUpdating = false;
          }
        }
      },
      deep: true
    },
    modelOptions: {
      async handler(val) {
        if (
          !this.formUpdating &&
          this.isFunctionConfig &&
          JSON.stringify(val) !== JSON.stringify(this.formOptions)
        ) {
          this.formUpdating = true;

          await this.setFormConfig();

          if (this.hasFormDataSource) {
            this.updateFormData();
          }

          this.formUpdating = false;
        }
      },
      deep: true
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
        ? await this.modelConfig(
            Object.assign({}, this.formDataSource),
            this.formOptions
          )
        : this.modelConfig;

      const modelList = originalConfig
        .filter(({ model }) => model)
        .map(({ model }) => model);

      this.privateModelOptions = modelList.length
        ? await this.setModelOptionsFn(modelList)
        : {};

      if (getType(this.privateModelOptions) !== 'object') {
        this.privateModelOptions = {};
        console.warn(`[${UI_FORM_VIEW.NAME}]: Invalid form model options`);
      }
    },
    async setFormConfig(modelConfig = this.modelConfig, needInit = false) {
      if (needInit && isFunction(this.setModelOptionsFn)) {
        await this.setModelOptions();
      }

      this.formOptions = Object.assign(
        {},
        this.privateModelOptions,
        this.modelOptions
      );

      const originalConfig = this.isFunctionConfig
        ? await modelConfig(
            Object.assign({}, this.formDataSource),
            this.formOptions
          )
        : modelConfig;

      if (Array.isArray(originalConfig)) {
        this.formConfig = originalConfig.filter(
          (configData) => !configData.hasOwnProperty('if') || configData.if
        );

        if (needInit) {
          this.initFormData();
          this.loadFormData();
        } else {
          this.changeFormData();
        }
      } else {
        console.warn(`[${UI_FORM_VIEW.NAME}]: Invalid form model config`);
      }
    },
    loadFormData(reload = false) {
      if (this.formDataKeys.length) {
        this.$emit(
          reload ? UI_FORM_VIEW.EVENTS.reload : UI_FORM_VIEW.EVENTS.loaded,
          Object.assign({}, this.formData)
        );
      }
    },
    syncFormData() {
      if (!this.formUpdating) {
        this.$emit(UI_FORM_VIEW.EVENTS.update, this.formData);
      }
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

      this.formDataKeys = Object.keys(this.formData);

      needSync && this.syncFormData();
    },
    changeFormData() {
      const newFormData = {};

      this.formDataConfig.forEach(({ key, value, components }) => {
        if (Array.isArray(components)) {
          components.forEach(({ key, value }) => {
            newFormData[key] = this.formData.hasOwnProperty(key)
              ? this.formData[key]
              : value;
          });
        } else {
          newFormData[key] = this.formData.hasOwnProperty(key)
            ? this.formData[key]
            : value;
        }
      });

      const newFormDataKeys = Object.keys(newFormData);
      const needSync =
        JSON.stringify(newFormDataKeys) !== JSON.stringify(this.formDataKeys);

      if (needSync) {
        this.formDataKeys = newFormDataKeys;
        this.formData = Object.assign({}, newFormData);
        this.loadFormData(true);
      }
    },
    updateFormData() {
      let needSync = false;

      const newFormData = this.formDataSource;
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
    exposeAction(action, result = {}) {
      const { handler, ...actionConfig } = action;
      const customHandler = isFunction(handler) ? handler : false;

      customHandler
        ? customHandler(actionConfig, result)
        : this.$emit(UI_FORM_VIEW.EVENTS.action, actionConfig, result);
    },
    ifAction(action) {
      let result = false;

      if (this.formDataKeys.length) {
        const currentAction = action.if;

        const formViewData = {
          config: this.formConfig,
          data: this.formData,
          dataSource: this.formDataSource
        };

        result = isFunction(currentAction)
          ? currentAction(formViewData)
          : this.actionRendering(action, formViewData);
      }

      return result;
    },
    handleAction(action) {
      let debounceConfig = {};

      switch (action.type) {
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

                  this.exposeAction(action, result);

                  this.$validations.clear();
                } else {
                  console.warn(
                    `[${UI_FORM_VIEW.NAME}]: BalmUI $validator plugin is missing`
                  );
                }
              } else {
                this.exposeAction(action, { valid: true });
              }
            },
            delay: action.delay || 250
          };
          break;
        case NATIVE_BUTTON_TYPES.reset:
          this.initFormData(true);
          break;
      }

      return action.type === NATIVE_BUTTON_TYPES.submit
        ? debounceConfig
        : this.exposeAction(action);
    },
    getSlotData(slotData, config) {
      return Object.assign({}, slotData, {
        config,
        data: this.formData,
        dataSource: this.formDataSource
      });
    }
  }
};
</script>
