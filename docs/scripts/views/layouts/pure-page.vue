<template>
  <div :class="$tt('body1')">
    <div :class="[$tt('body2'), 'pure-docs']">
      <ui-markdown :text="docs"></ui-markdown>
      <ui-footer-nav :prev="prev" :next="next"></ui-footer-nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PurePage',
  customOptions: {}
};
</script>

<script setup>
import { ref, onBeforeMount } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  prev: {
    type: [Object, null],
    default: null
  },
  next: {
    type: [Object, null],
    default: null
  }
});

const docs = ref('');

onBeforeMount(async () => {
  const filename = `en/guide/${props.name}.md`;
  docs.value = (await import(`@/docs/${filename}`)).default;
});
</script>
