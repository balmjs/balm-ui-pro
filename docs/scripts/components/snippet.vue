<template>
  <ui-collapse v-model="show" class="ui-snippet">
    <template #toggle>
      <ui-button :icon="show ? 'code' : 'settings_ethernet'">
        {{ show ? 'Hide' : 'Show' }} Code
      </ui-button>
    </template>
    <div class="snippet-content">
      <ui-markdown code :text="code"></ui-markdown>
    </div>
  </ui-collapse>
</template>

<script>
export default {
  name: 'ui-snippet',
  inheritAttrs: false
};
</script>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  code: {
    type: String,
    default: ''
  }
});

const show = ref(false);
</script>
