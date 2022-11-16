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
export default {
  name: 'MdcTopAppBar',
  props: {
    contentSelector: {
      type: String,
      required: true
    },
    attrOrProp: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handleNav() {
      this.$emit('nav');
    }
  }
};
</script>
