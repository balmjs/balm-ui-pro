<template>
  <div :class="noLayout ? null : 'balmui-container'">
    <router-view v-if="noLayout"></router-view>
    <ui-layout-view
      v-else
      ref="layout"
      drawer-below-top-app-bar
      :top-app-bar-attr-or-prop="{
        class: 'balmui-head',
        fixed: true
      }"
      :breakpoint="MIN_WIDTH"
    >
      <!-- Top App Bar -->
      <template #title>
        <router-link
          to="/"
          :class="['catalog-title', $theme.getThemeClass('on-primary')]"
        >
          BalmUI Pro
        </router-link>
      </template>
      <template #toolbar="{ toolbarItemClass }">
        <top-app-toolbar :item-class="toolbarItemClass"></top-app-toolbar>
      </template>
      <!-- Global Message -->
      <template #before-layout-view>
        <ui-banner
          v-model="showBanner"
          class="global-message-banner"
          centered
          fixed
          with-image
          mobile-stacked
        >
          <template #image>
            <ui-icon>{{ hasNewVersion ? 'refresh' : 'celebration' }}</ui-icon>
          </template>
          <template v-if="hasNewVersion">New content is available.</template>
          <template v-else>
            You’re browsing the documentation for vue@2.x.
            <a href="https://pro.balmjs.com/" target="_blank" rel="noopener">
              Click here
            </a>
            for vue@3.x documentation.
          </template>
          <template #actions>
            <ui-button outlined @click="$balmUI.onHide('showBanner', refresh)">
              {{ hasNewVersion ? 'Refresh' : 'GOT IT' }}
            </ui-button>
          </template>
        </ui-banner>
      </template>
      <!-- Drawer -->
      <template #drawer-title>
        <ui-drawer-title>
          <router-link
            v-slot="{ navigate, href }"
            :to="{ name: 'home' }"
            custom
          >
            <a :href="href" @click="handleMenu($event, navigate)">
              BalmUI Pro
            </a>
          </router-link>
        </ui-drawer-title>
        <ui-drawer-subtitle>
          <i class="balmui-version">
            v
            <span class="version">{{ version }}</span>
          </i>
        </ui-drawer-subtitle>
      </template>
      <template #drawer-content>
        <ui-nav class="catalog-list">
          <template v-for="(item, index) in menu">
            <router-link
              v-if="item.url || item.isSubmenu"
              v-slot="{ navigate, href, isActive }"
              :key="`item${index}`"
              :to="{ name: item.url }"
              custom
            >
              <ui-nav-item
                :href="href"
                :active="isActive"
                :class="{
                  submenu: item.isSubmenu,
                  'no-icon': !item.icon
                }"
                @click="handleMenu($event, navigate)"
              >
                <template #before="{ iconClass }">
                  <ui-icon
                    v-if="item.icon"
                    :class="[
                      'catalog-list-icon',
                      iconClass,
                      $theme.getTextClass('secondary', 'light')
                    ]"
                  >
                    {{ item.icon }}
                  </ui-icon>
                </template>
                <span :class="$theme.getTextClass('primary', 'light')">
                  {{ $t(`menu.${item.name}`) }}
                </span>
              </ui-nav-item>
            </router-link>
            <ui-list-divider
              v-else-if="item === '-'"
              :key="`divider${index}`"
            ></ui-list-divider>
            <ui-list-group-subheader
              v-else-if="item === 'footer'"
              :key="`footer${index}`"
            >
              Powered by
              <a href="https://balm.js.org/" target="_blank" rel="noopener">
                BalmJS
              </a>
            </ui-list-group-subheader>
            <ui-list-group-subheader
              v-else
              :key="`header${index}`"
              :class="$theme.getTextClass('primary', 'light')"
            >
              {{ $t(`menu.${item.name}`) }}
              <i
                v-if="item.name === 'guide'"
                :class="['balmui-version', $tt('subtitle2')]"
              >
                v
                <span class="version">{{ version }}</span>
              </i>
            </ui-list-group-subheader>
          </template>
        </ui-nav>
      </template>
      <!-- Content -->
      <router-view v-if="!keepAlive"></router-view>
      <keep-alive>
        <router-view v-if="keepAlive"></router-view>
      </keep-alive>
    </ui-layout-view>
  </div>
</template>

<script>
import TopAppToolbar from '@/components/top-app-toolbar';
import { VERSION, MIN_WIDTH } from '@/config';
import menu from '@/config/menu';

export default {
  components: {
    TopAppToolbar
  },
  data() {
    return {
      MIN_WIDTH,
      version: VERSION,
      menu,
      bodyEl: document.documentElement || document.body,
      showBanner: false,
      hasNewVersion: false
    };
  },
  computed: {
    noLayout() {
      const { name, meta } = this.$route;
      return name ? meta && meta.noLayout : true;
    },
    keepAlive() {
      const { name, matched } = this.$route;
      const noKeepAlive =
        matched.some((route) => route.meta?.keepAlive === false) ||
        /\.detail-view$/.test(name);
      return !noKeepAlive;
    }
  },
  mounted() {
    this.$bus.on('page-loaded', () => {
      setTimeout(() => {
        this.bodyEl.scrollTop = 0;
      }, 1);
    });

    this.$bus.on('global-message', (show) => {
      if (this.showBanner !== show) {
        this.showBanner = show;
      }
    });

    this.$bus.on('refresh', () => {
      this.hasNewVersion = true;
      this.showBanner = true;
    });
  },
  methods: {
    handleMenu(event, navigate) {
      this.$refs.layout.updateLayoutViewport();

      navigate(event);
    },
    refresh() {
      if (this.hasNewVersion) {
        this.$store.serviceWorker.postMessage({ action: 'skipWaiting' });
        this.hasNewVersion = false;
      }
    }
  }
};
</script>
