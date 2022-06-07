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
      <span>{{ getFormLabel(config) }}</span>
      <slot :name="customSlots.afterLabel" :value="value"></slot>
    </label>
    <div class="mdc-form-item__item">
      <slot :name="customSlots.beforeItem" :value="value"></slot>
      <ui-readonly-item
        v-if="config.readonly"
        :subitem-class="subitemClass"
        :value="value"
      >
        <slot :name="customSlots.readonlyItem" :value="value"></slot>
      </ui-readonly-item>
      <template v-else>
        <component
          :is="config.component"
          v-show="displayFormItem(config)"
          v-model="formData[config.key]"
          :form-data="formData"
          v-bind="config.attrOrProp"
          @input="handleInput(config, $event)"
          @change="handleChange(config, $event)"
        ></component>
      </template>
      <slot :name="customSlots.afterItem" :value="value"></slot>
    </div>
  </ui-form-field>
</template>

<script>
import UiReadonlyItem from './readonly-item.vue';
import formItemMixin from '../../mixins/form-item';
import getType from '../../utils/typeof';

const name = 'UiFormItem';
const UI_FORM_ITEM = {
  EVENTS: {
    update: 'change'
  },
  DEFAULT_INPUT_COMPONENTS: ['ui-textfield', 'ui-autocomplete']
};

export default {
  name,
  components: {
    UiReadonlyItem
  },
  mixins: [formItemMixin],
  model: {
    prop: 'modelValue',
    event: UI_FORM_ITEM.EVENTS.update
  },
  props: {
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
    attrOrProp: {
      type: Object,
      default: () => ({})
    },
    inputComponents: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      formData: this.modelValue,
      formInputComponents: [].concat(
        UI_FORM_ITEM.DEFAULT_INPUT_COMPONENTS,
        this.inputComponents
      )
    };
  },
  computed: {
    component() {
      return this.config.component || 'unknown-component';
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
        readonlyItem: `readonly__${this.componentKey}`
      };
    },
    value() {
      return this.getModelValue(this.config);
    }
  },
  watch: {
    modelValue(val) {
      this.formData = val;
    }
  },
  beforeMount() {
    if (this.config.showSlots) {
      const customSlotsNames = Object.values(this.customSlots);
      console.info(`[${name}] slots:`, customSlotsNames);
    }
  },
  methods: {
    displayFormItem({ show, key, value }) {
      const display =
        getType(show) === 'function'
          ? show(this.formData)
          : getType(show) === 'undefined' || show;

      !display && this.$emit(UI_FORM_ITEM.EVENTS.update, key, value);

      return display;
    },
    getFormLabel({ label }) {
      return getType(label) === 'function' ? label(this.formData) : label;
    },
    handleInput({ component, key }, value) {
      this.formInputComponents.includes(component) &&
        this.$emit(UI_FORM_ITEM.EVENTS.update, key, value);
    },
    handleChange({ component, key }, value) {
      !this.formInputComponents.includes(component) &&
        this.$emit(UI_FORM_ITEM.EVENTS.update, key, value);
    },
    getModelValue({ key, value }) {
      return this.formData[key] || value;
    }
  }
};
</script>
