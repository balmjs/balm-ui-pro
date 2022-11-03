<template>
  <div class="mdc-layout-view__drawer">
    <ui-drawer v-model="open" :type="type" v-bind="attrOrProp" @nav="handleNav">
      <ui-drawer-header v-if="hasDrawerHeader">
        <slot name="drawer-title"></slot>
      </ui-drawer-header>
      <ui-drawer-content>
        <slot name="drawer-content"></slot>
      </ui-drawer-content>
    </ui-drawer>
  </div>
</template>

<script>
export default {
  name: 'MdcNavigationDrawer',
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    attrOrProp: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      open: this.modelValue
    };
  },
  computed: {
    hasDrawerHeader() {
      return !!this.$slots['drawer-title'];
    }
  },
  watch: {
    modelValue(val) {
      this.open = val;
    }
  },
  methods: {
    handleNav(open) {
      this.$emit('change', open);
    }
  }
};
</script>
