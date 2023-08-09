<template>
  <div class="mdc-component-plus">
    <div
      v-for="(_, componentIndex) in componentData"
      :key="componentIndex"
      class="mdc-component-plus__item"
    >
      <component
        :is="componentName"
        v-model="componentData[componentIndex]"
        @[componentModelEvent]="handleChange"
      ></component>
      <div class="mdc-component-plus__actions">
        <ui-icon-button
          v-if="canRemove(componentIndex)"
          icon="remove"
          @click="onRemove(componentIndex)"
        ></ui-icon-button>
        <ui-icon-button
          v-if="canAdd(componentIndex)"
          icon="add"
          @click="onAdd"
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
    // States
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      componentData: this.modelValue
    };
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
      this.componentData = [this.componentModelValue];
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
