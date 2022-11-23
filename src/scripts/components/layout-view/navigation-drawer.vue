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
const UI_DRAWER_EVENTS = {
  change: 'update:modelValue'
};

export default {
  name: 'MdcNavigationDrawer',
  customOptions: {}
};
</script>

<script setup>
import { reactive, toRefs, computed, watch, useSlots } from 'vue';

const props = defineProps({
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
});
const emit = defineEmits([UI_DRAWER_EVENTS.change]);
const slots = useSlots();

const state = reactive({
  open: props.modelValue
});
const { open } = toRefs(state);

const hasDrawerHeader = computed(() => !!slots['drawer-title']);

watch(
  () => props.modelValue,
  (val) => {
    state.open = val;
  }
);

function handleNav(open) {
  emit(UI_DRAWER_EVENTS.change, open);
}
</script>
