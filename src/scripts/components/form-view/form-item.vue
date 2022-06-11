<template>
  <ui-form-field
    v-show="displayFormItem(config)"
    :class="className"
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
      <template v-if="config.slot">
        <slot :name="config.slot" :value="value"></slot>
      </template>
      <template v-else>
        <template v-if="config.useSlot">
          <slot :name="customSlots.componentItem" :value="value"></slot>
        </template>
        <template v-else>
          <component
            :is="config.component"
            v-show="displayFormItem(config)"
            v-model="formData[config.key]"
            v-bind="
              Object.assign(
                {
                  componentKey,
                  formData,
                  formDataSource
                },
                config.attrOrProp
              )
            "
            @input="handleInput(config, $event)"
            @change="handleChange(config, $event)"
          ></component>
        </template>
      </template>
      <slot :name="customSlots.afterItem" :value="value"></slot>
    </div>
  </ui-form-field>
</template>

<script>
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
  model: {
    prop: 'modelValue',
    event: UI_FORM_ITEM.EVENTS.update
  },
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    modelValue: {
      type: Object,
      default: () => ({})
    },
    formDataSource: {
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
    key() {
      return this.config.key || 'unknown-key';
    },
    componentKey() {
      return `${this.component}--${this.key}`;
    },
    className() {
      return [
        'mdc-form__item',
        'mdc-form-item',
        `mdc-form-item__${this.component}`,
        `mdc-form-item__${this.key}`
      ];
    },
    customSlots() {
      return {
        beforeLabel: `before-label__${this.componentKey}`,
        afterLabel: `after-label__${this.componentKey}`,
        beforeItem: `before-item__${this.componentKey}`,
        componentItem: this.config.useSlot
          ? this.componentKey
          : `'useSlot' is not enabled`,
        afterItem: `after-item__${this.componentKey}`
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
