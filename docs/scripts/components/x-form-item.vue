<template>
  <div class="x-form-item">
    <input v-model="value" @input="handleEvent" />
  </div>
</template>

<script>
const eventName = 'input';

export default {
  name: 'XFormItem'
};
</script>

<script setup>
import { reactive, toRefs, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits([eventName]);

const state = reactive({
  value: props.modelValue
});
const { value } = toRefs(state);

watch(
  () => props.modelValue,
  (val) => {
    state.value = val;
  }
);

function handleEvent(event) {
  emit(eventName, event.target.value);
}
</script>
