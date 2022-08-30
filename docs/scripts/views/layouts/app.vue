<template>
  <div ref="root" class="balmui-container">
    <!-- App bar -->
    <ui-top-app-bar
      class="balmui-head"
      content-selector=".balmui-content"
      nav-id="balmui-menu"
      fixed
      @nav="drawerOpen = !drawerOpen"
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
      <template #actions>
        <ui-button outlined @click="hideBanner">{{
          hasNewVersion ? 'Refresh' : 'Good Job'
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
        <ui-drawer v-model="drawerOpen" :type="drawerType" class="balmui-menu">
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
                <span class="version">{{ VERSION }}</span>
              </i>
            </ui-drawer-subtitle>
          </ui-drawer-header>
          <ui-drawer-content>
            <ui-nav class="catalog-list">
              <template v-for="(item, index) in menu" :key="`item${index}`">
                <router-link
                  v-if="item.url || item.isSubmenu"
                  v-slot="{ navigate, href, isActive }"
                  custom
                  :to="{ name: item.url }"
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
                      {{ t(`menu.${item.name}`) }}
                    </span>
                  </ui-nav-item>
                </router-link>
                <ui-list-divider v-else-if="item === '-'"></ui-list-divider>
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
                  :class="$theme.getTextClass('primary', 'light')"
                >
                  {{ t(`menu.${item.name}`) }}
                  <i
                    v-if="isWideScreen && item.name === 'guide'"
                    :class="['balmui-version', $tt('subtitle2')]"
                  >
                    v
                    <span class="version">{{ VERSION }}</span>
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
        <router-view v-if="!keepAlive" :class="pageClassName"></router-view>
        <router-view v-if="keepAlive" v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" :class="pageClassName" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { VERSION, $MIN_WIDTH } from '@/config';
import menu from '@/config/menu';
</script>

<script setup>
import {
  ref,
  reactive,
  toRefs,
  computed,
  onMounted,
  onBeforeUnmount,
  nextTick
} from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useBus } from 'balm-ui';
import TopAppToolbar from '@/components/top-app-toolbar';
import { getPageClassName } from '@/utils';

const root = ref(null);
const route = useRoute();
const bus = useBus();
const { t, locale } = useI18n();

const bodyEl = document.documentElement || document.body;
const state = reactive({
  drawerType: 'permanent',
  drawerOpen: false,
  isWideScreen: true,
  showBanner: false,
  hasNewVersion: false
});
const { drawerType, drawerOpen, isWideScreen, showBanner, hasNewVersion } =
  toRefs(state);

const keepAlive = computed(() => {
  const { name, matched } = route;
  const noKeepAlive =
    matched.some((route) => route.meta?.keepAlive === false) ||
    /\.detail-view$/.test(name);
  return !noKeepAlive;
});

function init() {
  state.isWideScreen = window.innerWidth >= $MIN_WIDTH;

  state.drawerType = state.isWideScreen ? 'permanent' : 'modal';
}

const pageClassName = computed(() => getPageClassName('page', route.name));

function hideBanner() {
  state.showBanner = false;

  // Refresh
  if (state.hasNewVersion) {
    store.serviceWorker.postMessage({ action: 'skipWaiting' });
    state.hasNewVersion = false;
  }
}

onMounted(() => {
  nextTick(() => root.value.parentNode.removeAttribute('class'));

  bus.on('page-loaded', () => {
    setTimeout(() => {
      bodyEl.scrollTop = 0;
    }, 1);
  });

  bus.on('refresh', () => {
    state.hasNewVersion = true;
    state.showBanner = true;
  });

  init();
  window.addEventListener('balmResize', init);
});

onBeforeUnmount(() => {
  bus.off();

  window.removeEventListener('balmResize', init);
});

function handleMenu(event, navigate) {
  state.drawerOpen = false;
  if (window.innerWidth < $MIN_WIDTH) {
    state.isWideScreen = false;
  }

  navigate(event);
}
</script>
