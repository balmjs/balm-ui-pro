<template>
  <ui-top-app-bar
    :content-selector="`#${contentSelector}`"
    v-bind="attrOrProp"
    @nav="handleNav"
  >
    <template #nav-icon="navIconData">
      <slot name="top-app-bar-nav-icon" v-bind="navIconData"></slot>
    </template>

    <slot name="top-app-bar-title"></slot>

    <template #toolbar="toolbarData">
      <slot name="top-app-bar-toolbar" v-bind="toolbarData"></slot>
    </template>
  </ui-top-app-bar>
</template>

<script>
const UI_TOP_APP_BAR_EVENTS = {
  nav: 'nav'
};

export default {
  name: 'MdcTopAppBar',
  customOptions: {}
};
</script>

<script setup>
const props = defineProps({
  contentSelector: {
    type: String,
    required: true
  },
  attrOrProp: {
    type: Object,
    default: () => ({})
  }
});
const emit = defineEmits([UI_TOP_APP_BAR_EVENTS.nav]);

function handleNav() {
  emit(UI_TOP_APP_BAR_EVENTS.nav);
}
</script>
