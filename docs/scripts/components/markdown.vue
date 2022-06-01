<template>
  <div v-if="html" :class="className" v-html="html"></div>
  <ui-skeleton v-else active></ui-skeleton>
</template>

<script>
export default {
  name: 'UiMarkdown',
  inheritAttrs: false
};
</script>

<script setup>
import { reactive, toRefs, computed, watch, onMounted, nextTick } from 'vue';
import { usePrism } from '@/plugins/prism';

const props = defineProps({
  // 文档内容
  text: {
    type: String,
    default: ''
  },
  // 代码片段
  code: {
    type: Boolean,
    default: false
  }
});

const state = reactive({
  html: props.text
});

const className = computed(() =>
  props.code ? 'snippet-code' : 'markdown-body'
);

const text = watch(
  () => state.html,
  (val) => {
    state.html = val;
    init();
  }
);

function init() {
  if (state.html) {
    nextTick(() => {
      const prism = usePrism();
      prism.highlightAll();
    });
  }
}

onMounted(() => init());

const { html } = toRefs(state);
</script>
