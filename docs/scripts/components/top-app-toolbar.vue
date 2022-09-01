<template>
  <div class="top-app-toolbar">
    <ui-icon-button
      v-tooltip="'Support BalmUI Pro'"
      :class="[itemClass, 'donate']"
      icon="support"
      aria-describedby="donate"
      @click="openInNewTab('https://v8.material.balmjs.com/#/donate')"
    ></ui-icon-button>
    <ui-icon-button
      :class="[itemClass, 'github']"
      aria-describedby="github"
      @click="openInNewTab('https://github.com/balmjs/balm-ui-pro/tree/legacy')"
    >
      <svg-github></svg-github>
    </ui-icon-button>
  </div>
</template>

<script>
import SvgGithub from '@/components/svg-github';
import { openInNewTab } from '@/utils';

export default {
  name: 'TopAppToolbar',
  components: {
    SvgGithub
  },
  props: {
    itemClass: {
      type: String,
      required: true
    }
  },
  methods: {
    openInNewTab
  }
};
</script>
