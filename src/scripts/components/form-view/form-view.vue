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
                  :debug="debug"
                  :item-class="itemClass"
                  :subitem-class="subitemClass"
                  :model-value="formData"
                  :config="configData"
                  :attr-or-prop="formItemAttrOrProp"
                  @change="handleChange"
                  @reload-form-config="setFormConfig"
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
                :debug="debug"
                :item-class="itemClass"
                :subitem-class="subitemClass"
                :model-value="formData"
                :config="configData"
                :attr-or-prop="formItemAttrOrProp"
                @change="handleChange"
                @reload-form-config="setFormConfig"
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
                  v-if="buttonData.type === 'submit'"
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
import UiFormItem from './form-item.vue';
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
      formConfig: [],
      formData: {}
    };
  },
  computed: {
    currentFormConfig() {
      return this.formConfig.filter(({ key }) => key);
    }
  },
  watch: {
    modelConfig(val) {
      this.setFormConfig(val);
    },
    modelValue(val) {
      this.formData = Object.assign(this.formData, val);
      this.syncModelValue && this.syncFormData(val);
    }
  },
  beforeMount() {
    this.setFormConfig();
  },
  methods: {
    setFormConfig(modelConfig = this.modelConfig) {
      const isFunctionConfig = getType(modelConfig) === 'function';
      const originalConfig = isFunctionConfig
        ? modelConfig({
            data: this.formData,
            ...this.modelOptions
          })
        : modelConfig;

      if (Array.isArray(originalConfig)) {
        const formConfig = originalConfig.filter(
          (configData) =>
            getType(configData.if) === 'undefined' || configData.if
        );
        this.formConfig = formConfig;

        this.initFormDataByConfig();
      } else {
        console.warn(`[UiFormView]: Invalid form model config`);
      }
    },
    initFormDataByConfig() {
      const formConfig = this.currentFormConfig;
      const formDataKeys = Object.keys(this.formData);
      const needInit =
        formConfig.length && formConfig.length !== formDataKeys.length;
      if (needInit) {
        for (let i = 0, len = formConfig.length; i < len; i++) {
          const { key, value } = formConfig[i];
          if (getType(this.formData[key]) === 'undefined') {
            this.$set(this.formData, key, value);
          }
        }
        this.$emit(UI_FORM_VIEW.EVENTS.update, this.formData);
      }
    },
    syncFormData(newFormData) {
      const formConfigKeys = this.currentFormConfig.map(({ key }) => key);
      const newFormDataKeys = Object.keys(newFormData).filter((key) =>
        formConfigKeys.includes(key)
      );
      const needSync =
        formConfigKeys.length &&
        formConfigKeys.length !== newFormDataKeys.length;
      if (needSync) {
        this.$emit(UI_FORM_VIEW.EVENTS.update, this.formData);
      }
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
            callback: () =>
              this.$emit(
                UI_FORM_VIEW.EVENTS.action,
                NATIVE_BUTTON_TYPES.submit
              ),
            delay: delay || 250
          };
          break;
        case NATIVE_BUTTON_TYPES.reset:
          const formConfig = this.currentFormConfig;
          if (formConfig.length) {
            formConfig.forEach(({ key, value }) => {
              this.formData[key] = value;
            });
          }
          this.$emit(UI_FORM_VIEW.EVENTS.update, this.formData);
          break;
      }

      return type === NATIVE_BUTTON_TYPES.submit
        ? debounceConfig
        : this.$emit(
            UI_FORM_VIEW.EVENTS.action,
            type || NATIVE_BUTTON_TYPES.button
          );
    }
  }
};
</script>
