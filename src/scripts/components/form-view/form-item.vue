<template>
  <ui-form-field
    v-show="displayFormItem(config)"
    :class="[
      itemClass,
      'mdc-form-item',
      `mdc-form-item__${component}`,
      `mdc-form-item__${key}`
    ]"
    v-bind="attrOrProp"
  >
    <label
      v-if="config.label"
      :class="[
        'mdc-form-item__label',
        {
          required: config.required
        }
      ]"
    >
      <slot :name="customSlots.beforeLabel" :value="value"></slot>
      <span>{{ config.label }}</span>
      <slot :name="customSlots.afterLabel" :value="value"></slot>
    </label>
    <div class="mdc-form-item__item">
      <slot :name="customSlots.beforeItem" :value="value"></slot>
      <ui-readonly-item
        v-if="config.readonly"
        :subitem-class="subitemClass"
        :value="value"
      >
        <slot :name="customSlots.readonly" :value="value"></slot>
      </ui-readonly-item>
      <template v-else>
        <component
          :is="config.component"
          v-show="displayFormItem(config)"
          v-model="formData[config.key]"
          v-bind="config.attrOrProp"
          @change="handleChange(config)"
        ></component>
      </template>
      <slot :name="customSlots.afterItem" :value="value"></slot>
    </div>
  </ui-form-field>
</template>

<script>
import UiReadonlyItem from './readonly-item.vue';
import getType from '../../utils/typeof';

const name = 'UiFormItem';
const UI_FORM_ITEM = {
  EVENTS: {
    update: 'change',
    reload: 'reload-form-config'
  }
};

export default {
  name,
  components: {
    UiReadonlyItem
  },
  model: {
    prop: 'modelValue',
    event: UI_FORM_ITEM.EVENTS.update
  },
  props: {
    debug: {
      type: Boolean,
      default: false
    },
    itemClass: {
      type: String,
      default: ''
    },
    subitemClass: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Object,
      default: () => ({})
    },
    config: {
      type: Object,
      default: () => ({})
    },
    attrOrProp: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      formData: this.modelValue
    };
  },
  computed: {
    component() {
      return this.config.component || 'unknown-component';
    },
    key() {
      return this.config.key || 'unknown-key';
    },
    componentKey() {
      return `${this.component}--${this.key}`;
    },
    customSlots() {
      return {
        beforeLabel: `before-label__${this.componentKey}`,
        afterLabel: `after-label__${this.componentKey}`,
        beforeItem: `before-item__${this.componentKey}`,
        afterItem: `after-item__${this.componentKey}`,
        readonly: `readonly__${this.componentKey}`
      };
    },
    value() {
      return getModelValue(this.config);
    }
  },
  watch: {
    modelValue(val) {
      this.formData = val;
    }
  },
  beforeMount() {
    const customSlotsNames = Object.values(this.customSlots);
    this.debug &&
      customSlotsNames.length &&
      console.log(`[${name}] slots:`, customSlotsNames);
  },
  methods: {
    displayFormItem({ show }) {
      return getType(show) === 'undefined' || show;
    },
    handleChange({ reload }) {
      reload && this.$emit(UI_FORM_ITEM.EVENTS.reload);
    },
    getModelValue({ key, value, defaultValue }) {
      return this.formData[key] || value || defaultValue;
    }
  }
};
</script>
