<template>
  <ui-layout-view drawer-below-top-app-bar>
    <template #top-app-bar-title>Title</template>
    <template #top-app-bar-toolbar>Toolbar</template>

    <template #drawer-title>
      <ui-drawer-title>Title</ui-drawer-title>
      <ui-drawer-subtitle>Subtitle</ui-drawer-subtitle>
    </template>
    <template #drawer-content>
      <ui-nav>
        <ui-nav-item href="javascript:void(0)" active>Item {{ 0 }}</ui-nav-item>
        <ui-nav-item v-for="i in 12" :key="i" href="javascript:void(0)">
          Item {{ i }}
        </ui-nav-item>
      </ui-nav>
    </template>

    <p>Content</p>
  </ui-layout-view>
</template>
