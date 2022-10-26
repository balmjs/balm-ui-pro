<template>
  <ui-top-app-bar
    :content-selector="`#${contentSelector}`"
    v-bind="attrOrProp"
    @nav="handleNav"
  >
    <template #nav-icon="navIconData">
      <slot name="nav-icon" v-bind="navIconData"></slot>
    </template>

    <slot name="title"></slot>

    <template #toolbar="toolbarData">
      <slot name="toolbar" v-bind="toolbarData"></slot>
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
