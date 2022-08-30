<template>
  <div class="top-app-toolbar">
    <ui-icon-button
      v-tooltip="'Support BalmUI'"
      :class="[itemClass, 'donate']"
      icon="support"
      aria-describedby="donate"
      @click="openInNewTab('https://material.balmjs.com/donate')"
    ></ui-icon-button>
    <a href="https://github.com/balmjs/balm-ui" target="_blank" rel="noopener">
      <ui-icon-button :class="[itemClass, 'github']" aria-describedby="github">
        <svg-github></svg-github>
      </ui-icon-button>
    </a>
  </div>
</template>

<script>
import SvgGithub from '@/components/svg-github';
import { translations } from '@/config';
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
  setup() {
    return {
      translations,
      openInNewTab
    };
  }
};
</script>
