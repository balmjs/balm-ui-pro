<template>
  <div :class="className">
    <div
      v-for="(_, componentIndex) in componentData"
      :key="componentIndex"
      class="mdc-component-plus__item"
    >
      <div class="mdc-component-plus__content">
        <component
          :is="componentName"
          v-model="componentData[componentIndex]"
          v-bind="componentAttrOrProp"
          @[componentModelEvent]="handleChange"
        ></component>
      </div>
      <div class="mdc-component-plus__actions">
        <ui-icon-button
          v-if="canAdd(componentIndex)"
          icon="add"
          @click="onAdd"
        ></ui-icon-button>
        <ui-icon-button
          v-if="canRemove(componentIndex)"
          icon="remove"
          @click="onRemove(componentIndex)"
        ></ui-icon-button>
      </div>
    </div>
  </div>
</template>

<script>
import formItemMixin from '../../mixins/form-item';

// Define component plus constants
const UI_COMPONENT_PLUS = {
  NAME: 'UiComponentPlus',
  EVENTS: {
    CHANGE: 'change'
  }
};

export default {
  name: UI_COMPONENT_PLUS.NAME,
  mixins: [formItemMixin],
  model: {
    prop: 'modelValue',
    event: UI_COMPONENT_PLUS.EVENTS.CHANGE
  },
  props: {
    // States
    modelValue: {
      type: Array,
      default: () => []
    },
    // UI attributes
    componentName: {
      type: String,
      required: true
    },
    componentModelValue: {
      type: null,
      default: ''
    },
    componentModelEvent: {
      type: String,
      default: UI_COMPONENT_PLUS.EVENTS.CHANGE
    },
    componentAttrOrProp: {
      type: Object,
      default: () => ({})
    },
    fullwidth: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      componentData: this.modelValue
    };
  },
  computed: {
    className() {
      return {
        'mdc-component-plus': true,
        'mdc-component-plus--fullwidth': this.fullwidth
      };
    }
  },
  watch: {
    modelValue(val) {
      this.componentData = val;
    }
  },
  beforeMount() {
    this.onInit();
  },
  methods: {
    handleChange() {
      this.$emit(UI_COMPONENT_PLUS.EVENTS.CHANGE, this.componentData);
    },
    canAdd(index) {
      return index === this.componentData.length - 1;
    },
    canRemove(index) {
      return !(!index && this.componentData.length === 1);
    },
    onInit() {
      const initialValue = this.proFormDataSource[this.proConfig.key];
      this.componentData =
        Array.isArray(initialValue) && initialValue.length
          ? initialValue
          : [this.componentModelValue];
      this.handleChange();
    },
    onAdd() {
      this.componentData.push(this.componentModelValue);
    },
    onRemove(index) {
      this.componentData.splice(index, 1);
    }
  }
};
</script>
