<template>
  <div class="balmui-container">
    <!-- header -->
    <ui-top-app-bar
      class="balmui-head"
      content-selector=".balmui-body"
      nav-id="balmui-menu"
    >
      <router-link
        to="/"
        :class="['catalog-title', $theme.getThemeClass('on-primary')]"
      >
        BalmUI Pro
      </router-link>
      <template #toolbar="{ itemClass }">
        <a :class="itemClass" href="https://github.com/balmjs/balm-ui-pro">
          <svg-github></svg-github>
        </a>
      </template>
    </ui-top-app-bar>
    <!-- content -->
    <main class="balmui-body">
      <ui-drawer
        v-model="open"
        type="dismissible"
        class="balmui-menu"
        nav-id="balmui-menu"
      >
        <ui-drawer-content>
          <ui-nav class="catalog-list">
            <h3 :class="$theme.getTextClass('primary', 'light')">Guide</h3>
            <router-link
              v-slot="{ navigate, href, isActive }"
              custom
              :to="{ name: 'home' }"
            >
              <ui-nav-item
                :href="href"
                :active="isActive"
                @click="navigate($event)"
              >
                Introduction
              </ui-nav-item>
            </router-link>
            <h3 :class="$theme.getTextClass('primary', 'light')">Components</h3>
            <template v-for="(item, index) in menu">
              <router-link
                v-slot="{ navigate, href, isActive }"
                :key="`item${index}`"
                custom
                :to="{ name: item.name }"
              >
                <ui-nav-item
                  :href="href"
                  :active="isActive"
                  @click="navigate($event)"
                >
                  {{ item.path }}
                </ui-nav-item>
              </router-link>
            </template>
          </ui-nav>
        </ui-drawer-content>
      </ui-drawer>

      <ui-drawer-app-content :class="[$tt('body1'), 'balmui-content']">
        <router-view></router-view>
      </ui-drawer-app-content>
    </main>
  </div>
</template>

<script>
import SvgGithub from '@/components/github';
import componentsMenu from '@/routes/components';
import pluginsMenu from '@/routes/plugins';

export default {
  components: {
    SvgGithub
  },
  data() {
    return {
      menu: [].concat(componentsMenu, pluginsMenu),
      open: false
    };
  },
  mounted() {
    this.open = window.innerWidth >= 1024;
    window.addEventListener('balmResize', () => {
      this.open = window.innerWidth >= 1024;
    });
  }
};
</script>
