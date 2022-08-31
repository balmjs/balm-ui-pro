<template>
  <div class="balmui-container">
    <!-- App bar -->
    <ui-top-app-bar
      class="balmui-head"
      content-selector=".balmui-content"
      nav-id="balmui-menu"
      fixed
      @nav="$balmUI.onChange('openDrawer', !openDrawer)"
    >
      <router-link
        to="/"
        :class="['catalog-title', $theme.getThemeClass('on-primary')]"
      >
        BalmUI Pro
      </router-link>
      <template #toolbar="{ toolbarItemClass }">
        <top-app-toolbar :item-class="toolbarItemClass"></top-app-toolbar>
      </template>
    </ui-top-app-bar>
    <!-- Global Message -->
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
        <ui-button outlined @click="$balmUI.onHide('showBanner', refresh)">{{
          hasNewVersion ? 'Refresh' : 'GOT IT'
        }}</ui-button>
      </template>
    </ui-banner>
    <!-- Content -->
    <div class="balmui-body">
      <!-- Drawer -->
      <div
        :class="[
          'balmui-drawer-container',
          { 'balmui-drawer--mobile': !isWideScreen }
        ]"
      >
        <ui-drawer v-model="openDrawer" :type="drawerType" class="balmui-menu">
          <ui-drawer-header>
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
          </ui-drawer-header>
          <ui-drawer-content>
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
                    v-if="isWideScreen && item.name === 'guide'"
                    :class="['balmui-version', $tt('subtitle2')]"
                  >
                    v
                    <span class="version">{{ version }}</span>
                  </i>
                </ui-list-group-subheader>
              </template>
            </ui-nav>
          </ui-drawer-content>
        </ui-drawer>
      </div>
      <!-- App content -->
      <div
        :class="[
          'balmui-content',
          $theme.getThemeClass('background'),
          $theme.getTextClass('primary', 'light')
        ]"
      >
        <router-view v-if="!keepAlive"></router-view>
        <keep-alive>
          <router-view v-if="keepAlive"></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import TopAppToolbar from '@/components/top-app-toolbar';
import { VERSION, $MIN_WIDTH } from '@/config';
import menu from '@/config/menu';

export default {
  components: {
    TopAppToolbar
  },
  data() {
    return {
      version: VERSION,
      menu,
      bodyEl: document.documentElement || document.body,
      isWideScreen: true,
      drawerType: 'permanent',
      openDrawer: false,
      showBanner: false,
      hasNewVersion: false
    };
  },
  computed: {
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

    this.$bus.on('refresh', () => {
      this.hasNewVersion = true;
      this.showBanner = true;
    });

    this.init();
    window.addEventListener('balmResize', this.init);
  },
  beforeDestroy() {
    window.removeEventListener('balmResize', this.init);
  },
  methods: {
    getDrawerType() {
      this.isWideScreen = window.innerWidth >= $MIN_WIDTH;
      return this.isWideScreen ? 'permanent' : 'modal';
    },
    init() {
      this.drawerType = this.getDrawerType();
    },
    handleMenu(event, navigate) {
      this.openDrawer = false;
      if (window.innerWidth < $MIN_WIDTH) {
        this.isWideScreen = false;
      }

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
