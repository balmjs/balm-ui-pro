<template>
  <div class="top-app-toolbar">
    <ui-icon-button
      v-tooltip="'Support BalmUI Pro'"
      :class="[itemClass, 'donate']"
      icon="support"
      aria-describedby="donate"
      @click="openInNewTab('https://v8.material.balmjs.com/#/donate')"
    ></ui-icon-button>
    <a
      href="https://github.com/balmjs/balm-ui-pro/tree/legacy"
      target="_blank"
      rel="noopener"
    >
      <ui-icon-button :class="[itemClass, 'github']" aria-describedby="github">
        <svg-github></svg-github>
      </ui-icon-button>
    </a>
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
