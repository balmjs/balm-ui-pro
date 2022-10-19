<template>
  <ui-top-app-bar
    :content-selector="`#${contentSelector}`"
    v-bind="attrOrProp"
    @nav="handleNav"
  >
    <slot name="title"></slot>

    <template v-for="(_, name) in $slots">
      <slot v-if="name !== 'default'" :slot="name" :name="name"></slot>
    </template>
    <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
      <slot v-if="name !== 'default'" :name="name" v-bind="slotData"></slot>
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
    isPermanentDrawer: {
      type: Boolean,
      default: false
    },
    attrOrProp: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handleNav() {
      !this.isPermanentDrawer && this.$emit('nav');
    }
  }
};
</script>
