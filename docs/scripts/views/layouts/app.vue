<template>
  <div ref="root" :class="noLayout ? null : 'balmui-container'">
    <router-view v-if="noLayout"></router-view>
    <ui-layout-view
      v-else
      ref="layout"
      :drawer-below-top-app-bar="true"
      :top-app-bar-attr-or-prop="{
        class: 'balmui-head',
        fixed: true
      }"
      :breakpoint="MIN_WIDTH"
    >
      <!-- Top App Bar -->
      <template #top-app-bar-title>
        <router-link
          to="/"
          :class="['catalog-title', $theme.getThemeClass('on-primary')]"
        >
          BalmUI Pro
        </router-link>
      </template>
      <template #top-app-bar-toolbar="{ toolbarItemClass }">
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
          <template #actions>
            <ui-button outlined @click="hideBanner">{{
              hasNewVersion ? 'Refresh' : 'Good Job'
            }}</ui-button>
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
            <span class="version">{{ VERSION }}</span>
          </i>
        </ui-drawer-subtitle>
      </template>
      <template #drawer-content>
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
                @click.stop="handleMenu($event, navigate)"
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
                v-if="item.name === 'guide'"
                :class="['balmui-version', $tt('subtitle2')]"
              >
                v
                <span class="version">{{ VERSION }}</span>
              </i>
            </ui-list-group-subheader>
          </template>
        </ui-nav>
      </template>
      <!-- Content -->
      <router-view v-if="!keepAlive" :class="pageClassName"></router-view>
      <router-view v-if="keepAlive" v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :class="pageClassName" />
        </keep-alive>
      </router-view>
    </ui-layout-view>
  </div>
</template>

<script>
import { VERSION, MIN_WIDTH } from '@/config';
import menu from '@/config/menu';
</script>

<script setup>
import { ref, reactive, toRefs, computed, onMounted, nextTick } from 'vue';
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
  showBanner: false,
  hasNewVersion: false
});
const { showBanner, hasNewVersion } = toRefs(state);

const noLayout = computed(() => {
  const { name, meta } = route;
  return name ? meta && meta.noLayout : true;
});
const keepAlive = computed(() => {
  const { name, matched } = route;
  const noKeepAlive =
    matched.some((route) => route.meta?.keepAlive === false) ||
    /\.detail-view$/.test(name);
  return !noKeepAlive;
});

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
});

const layout = ref(null);

function handleMenu(event, navigate) {
  layout.value.updateLayoutViewport();
  navigate(event);
}
</script>
