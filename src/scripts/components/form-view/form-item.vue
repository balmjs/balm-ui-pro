<template>
  <ui-form-field
    v-show="displayFormItem(config)"
    :class="[className, attrOrProp.class || '']"
    v-bind="attrOrProp"
  >
    <slot :name="customSlots.before"></slot>
    <label
      v-if="config.label"
      :class="{
        'mdc-form-item__label': true,
        required: config.required
      }"
    >
      <slot :name="customSlots.beforeLabel"></slot>
      <span>{{ getFormLabel(config) }}</span>
      <slot :name="customSlots.afterLabel"></slot>
    </label>
    <div class="mdc-form-item__item">
      <slot :name="customSlots.beforeItem"></slot>
      <template v-if="config.slot">
        <slot v-if="isBoolean(config.slot)" :name="customSlots.item"></slot>
        <slot v-else :name="config.slot"></slot>
      </template>
      <template v-else>
        <slot :name="customSlots.componentItem">
          <template v-if="hasSubComponents">
            <component
              :is="getComponent(config.component)"
              v-if="config.component"
              :ref="componentKey"
              :components="config.components"
              v-bind="componentBind"
              v-on="config.listeners"
              @[eventName]="handleChange(config, $event)"
            ></component>
          </template>
          <template v-else>
            <ui-readonly-item
              v-if="config.component === 'ui-readonly-item'"
              v-bind="componentBind"
            ></ui-readonly-item>
            <template v-else>
              <component
                :is="getComponent(config.component)"
                v-if="config.component"
                :ref="componentKey"
                v-model="formData[config.key]"
                v-bind="componentBind"
                v-on="config.listeners"
                @[eventName]="handleChange(config, $event)"
              ></component>
            </template>
          </template>
        </slot>
      </template>
      <slot :name="customSlots.afterItem"></slot>
    </div>
    <slot :name="customSlots.after"></slot>
  </ui-form-field>
</template>

<script>
import UiReadonlyItem from '../readonly-item/readonly-item.vue';
import {
  isUndefined,
  isBoolean,
  isObject,
  isFunction
} from '../../utils/typeof';
import { toFirstUpperCase } from '../../utils/helpers';

const UI_FORM_ITEM = {
  NAME: 'UiFormItem',
  EVENTS: {
    update: 'change'
  },
  DEFAULT_INPUT_COMPONENTS: ['ui-textfield', 'ui-autocomplete'],
  UNKNOWN: 'unknown'
};

export default {
  name: UI_FORM_ITEM.NAME,
  components: {
    UiReadonlyItem
  },
  model: {
    prop: 'modelValue',
    event: UI_FORM_ITEM.EVENTS.update
  },
  props: {
    components: {
      type: Object,
      default: () => ({})
    },
    config: {
      type: Object,
      default: () => ({})
    },
    modelValue: {
      type: Object,
      default: () => ({})
    },
    modelValueSource: {
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
      return this.config.modelEvent ||
        this.formInputComponents.includes(this.config.component)
        ? 'input'
        : UI_FORM_ITEM.EVENTS.update;
    },
    component() {
      return this.config.component || `${UI_FORM_ITEM.UNKNOWN}-component`;
    },
    key() {
      return this.config.key || `${UI_FORM_ITEM.UNKNOWN}-key`;
    },
    componentKey() {
      return this.component === `${UI_FORM_ITEM.UNKNOWN}-component` ||
        this.key === `${UI_FORM_ITEM.UNKNOWN}-key`
        ? this.config.slot || null
        : `${this.component}--${this.key}`;
    },
    className() {
      return [
        'mdc-form__item',
        'mdc-form-item',
        `mdc-form-item__${this.component}`,
        `mdc-form-item__${this.key}`
      ];
    },
    componentBind() {
      return Object.assign(
        {},
        {
          proConfig: this.config,
          proFormData: this.formData,
          proFormDataSource: this.modelValueSource,
          proComponentKey: this.componentKey || UI_FORM_ITEM.UNKNOWN
        },
        this.config.attrOrProp || {},
        this.$attrs
      );
    },
    customSlots() {
      const componentKey = this.componentKey || UI_FORM_ITEM.UNKNOWN;
      return {
        before: 'before-form-item',
        beforeLabel: `before-label__${componentKey}`,
        afterLabel: `after-label__${componentKey}`,
        beforeItem: `before-item__${componentKey}`,
        item: 'form-item',
        componentItem: `form-item__${componentKey}`,
        afterItem: `after-item__${componentKey}`,
        after: 'after-form-item'
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
      const customSlotsNames = Object.values(this.customSlots).map((slot) => ({
        slot
      }));

      console.info(`[${UI_FORM_ITEM.NAME}] slots`);
      console.table(customSlotsNames, ['slot']);
    }
  },
  methods: {
    isBoolean,
    getComponent(component) {
      const customComponentName = toFirstUpperCase(component);
      const customComponent = this.components[customComponentName] || component;

      return customComponent;
    },
    displayFormItem({ show }) {
      const display = isFunction(show)
        ? show(this.formData)
        : isUndefined(show) || show;

      return display;
    },
    getFormLabel({ label }) {
      return isFunction(label) ? label(this.formData) : label;
    },
    handleChange({ component, key }, value) {
      this.config.debug &&
        console.info(
          `[${UI_FORM_ITEM.NAME}] ${component}@${this.eventName}`,
          this.hasSubComponents
            ? this.config.components.map(({ key }) => key)
            : key,
          isObject(value)
            ? Object.assign({}, value)
            : Array.isArray(value)
            ? [...value]
            : value
        );

      const result = this.hasSubComponents ? Object.values(value) : value;

      if (this.componentKey && isFunction(this.config.event)) {
        this.config.event(
          result,
          this.componentBind,
          this.$refs[this.componentKey]
        );
      }

      this.hasSubComponents
        ? this.$emit(UI_FORM_ITEM.EVENTS.update, Object.keys(value), result)
        : this.$emit(UI_FORM_ITEM.EVENTS.update, key, result);
    }
  }
};
</script>
