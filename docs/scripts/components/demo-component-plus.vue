<template>
  <ui-form-view
    v-model="currentValue"
    :model-config="formConfig"
    @change="onChange"
  ></ui-form-view>
</template>

<script>
const formConfig = [
  {
    label: 'Text',
    component: 'ui-textfield',
    key: 'key1',
    value: ''
  },
  {
    label: 'Textarea',
    component: 'ui-textfield',
    key: 'key2',
    value: '',
    attrOrProp: {
      inputType: 'textarea'
    }
  }
];

export default {
  name: 'DemoComponentPlus',
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      currentValue: this.modelValue,
      formConfig
    };
  },
  watch: {
    modelValue(val) {
      this.currentValue = val;
    }
  },
  methods: {
    onChange() {
      this.$emit('change', this.currentValue);
    }
  }
};
</script>
