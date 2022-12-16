<template>
  <div>
    <component :is="customComponent" />
  </div>
</template>

<script setup>
import { ref, markRaw, shallowRef, onMounted } from 'vue';

const props = defineProps({
  components: {
    type: Object,
    default: () => ({})
  },
  component: {
    type: String,
    default: ''
  }
});

let customComponent = ref(null);

// onMounted(() => {
customComponent.value = markRaw(props.components[props.component]);
// });
</script>
