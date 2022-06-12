<template>
  <div class="x-form-item">
    <input v-model="value" @input="handleEvent" />
  </div>
</template>

<script>
const eventName = 'input';

export default {
  name: 'XFormItem',
  model: {
    prop: 'modelValue',
    event: eventName
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value: this.modelValue
    };
  },
  watch: {
    modelValue(val) {
      this.value = val;
    }
  },
  methods: {
    handleEvent(event) {
      this.$emit(eventName, event.target.value);
    }
  }
};
</script>
