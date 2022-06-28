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
      <slot :name="customSlots.beforeLabel"></slot>
      <span>{{ getFormLabel(config) }}</span>
      <slot :name="customSlots.afterLabel"></slot>
    </label>
    <div class="mdc-form-item__item">
      <slot :name="customSlots.beforeItem"></slot>
      <template v-if="config.slot">
        <slot :name="config.slot"></slot>
      </template>
      <template v-else>
        <slot :name="customSlots.componentItem">
          <template v-if="hasSubComponents">
            <component
              :is="config.component"
              :components="config.components"
              v-bind="
                Object.assign(
                  {
                    formData,
                    formDataSource
                  },
                  config.attrOrProp
                )
              "
              @[eventName]="handleChange(config, $event)"
            ></component>
          </template>
          <template v-else>
            <component
              :is="config.component"
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
              @[eventName]="handleChange(config, $event)"
            ></component>
          </template>
        </slot>
      </template>
      <slot :name="customSlots.afterItem"></slot>
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
    hasSubComponents() {
      return Array.isArray(this.config.components);
    },
    eventName() {
      return this.config.event ||
        this.formInputComponents.includes(this.config.component)
        ? 'input'
        : UI_FORM_ITEM.EVENTS.update;
    },
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
        componentItem: `form-item__${this.componentKey}`,
        afterItem: `after-item__${this.componentKey}`
      };
    }
  },
  watch: {
    modelValue(val) {
      this.formData = val;
    }
  },
  beforeMount() {
    if (this.config.debug) {
      const customSlotsNames = Object.values(this.customSlots);
      console.info(`[${name}] slots:`, customSlotsNames);
    }
  },
  methods: {
    displayFormItem({ show }) {
      const display =
        getType(show) === 'function'
          ? show(this.formData)
          : getType(show) === 'undefined' || show;

      return display;
    },
    getFormLabel({ label }) {
      return getType(label) === 'function' ? label(this.formData) : label;
    },
    handleChange({ component, key }, value) {
      this.config.debug &&
        console.info(`[${name}] ${component}@${this.eventName}`, key, value);

      this.hasSubComponents
        ? this.$emit(
            UI_FORM_ITEM.EVENTS.update,
            Object.keys(value),
            Object.values(value)
          )
        : this.$emit(UI_FORM_ITEM.EVENTS.update, key, value);
    }
  }
};
</script>
