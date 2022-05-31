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
              :class-name="{ itemClass, subitemClass }"
            ></slot>
            <template v-for="(configData, configIndex) in formConfig">
              <ui-grid-cell
                :key="`form-item-${configData.key || configIndex}`"
                v-bind="gridCellAttrOrProp"
              >
                <ui-form-item
                  v-model="formData"
                  :debug="debug"
                  :item-class="itemClass"
                  :subitem-class="subitemClass"
                  :config="configData"
                  :attr-or-prop="formItemAttrOrProp"
                  @reload-form-config="setFormConfig"
                >
                  <template
                    v-for="(_, slotName) in $scopedSlots"
                    v-slot:[slotName]="{ value }"
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
              :class-name="{ itemClass, subitemClass, actionClass }"
            ></slot>
          </ui-grid>
          <!-- For detail view -->
          <template v-else>
            <slot
              name="before"
              :class-name="{ itemClass, subitemClass }"
            ></slot>
            <template v-for="(configData, configIndex) in formConfig">
              <ui-form-item
                v-model="formData"
                :key="`form-item-${configData.key || configIndex}`"
                :debug="debug"
                :item-class="itemClass"
                :subitem-class="subitemClass"
                :config="configData"
                :attr-or-prop="formItemAttrOrProp"
                @reload-form-config="setFormConfig"
              >
                <template
                  v-for="(_, slotName) in $scopedSlots"
                  v-slot:[slotName]="{ value }"
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
              :class-name="{ itemClass, subitemClass, actionClass }"
            ></slot>
          </template>
        </div>
      </template>
    </ui-form>
  </div>
</template>

<script>
import UiFormItem from './form-item.vue';
import getType from '../../utils/typeof';

export default {
  name: 'UiFormView',
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
  },
  data() {
    return {
      formData: this.modelValue,
      formConfig: []
    };
  },
  watch: {
    modelValue(val) {
      this.formData = Object.assign(this.formData, val);
    },
    modelConfig(val) {
      this.setFormConfig(val);
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
      const formConfig = this.formConfig;
      const needInit = formConfig.length && !Object.keys(this.formData).length;
      needInit &&
        formConfig
          .filter(({ key }) => key)
          .forEach(({ key, value }) => (this.formData[key] = value));
    }
  }
};
</script>
