<template>
  <ui-form-field
    v-show="displayFormItem(config)"
    :class="[className, attrOrProp.class || '']"
    v-bind="attrOrProp"
  >
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
        <slot :name="config.slot"></slot>
      </template>
      <template v-else>
        <slot :name="customSlots.componentItem">
          <template v-if="hasSubComponents">
            <component
              :is="getComponent(config.component)"
              v-if="config.component"
              :components="config.components"
              v-bind="componentBind"
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
                v-model="formData[config.key]"
                v-bind="componentBind"
                @[eventName]="handleChange(config, $event)"
              ></component>
            </template>
          </template>
        </slot>
      </template>
      <slot :name="customSlots.afterItem"></slot>
    </div>
  </ui-form-field>
</template>

<script>
import UiReadonlyItem from '../readonly-item/readonly-item.vue';
import { isUndefined, isObject, isFunction } from '../../utils/typeof';
import { toFirstUpperCase } from '../../utils/helpers';

const UI_FORM_ITEM = {
  NAME: 'UiFormItem',
  EVENTS: {
    update: 'change'
  },
  DEFAULT_INPUT_COMPONENTS: ['ui-textfield', 'ui-autocomplete']
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
    componentBind() {
      return Object.assign(
        {},
        {
          proConfig: this.config,
          proFormData: this.formData,
          proFormDataSource: this.modelValueSource,
          proComponentKey: this.componentKey
        },
        this.config.attrOrProp || {}
      );
    },
    customSlots() {
      return {
        beforeLabel: `before-label__${this.componentKey}`,
        afterLabel: `after-label__${this.componentKey}`,
        beforeItem: `before-item__${this.componentKey}`,
        componentItem: `form-item__${this.componentKey}`,
        afterItem: `after-item__${this.componentKey}`
      };
    },
    customEvents() {
      // TODO:
      return [];
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
