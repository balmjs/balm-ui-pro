<template>
  <docs-page name="layout-view" without-css>
    <ui-list non-interactive>
      <ui-item>
        <ui-item-text-content>
          <span>1.1</span>
          <router-link :to="{ name: 'demo.drawer-above-toolbar' }">
            Navigation Drawer Above Toolbar
          </router-link>
        </ui-item-text-content>
      </ui-item>
      <ui-item>
        <ui-item-text-content>
          <span>1.2</span>
          <router-link :to="{ name: 'demo.drawer-below-toolbar' }">
            Navigation Drawer Below Toolbar
          </router-link>
        </ui-item-text-content>
      </ui-item>
    </ui-list>
  </docs-page>
</template>
