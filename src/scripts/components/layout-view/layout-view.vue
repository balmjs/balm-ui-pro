<template>
  <div :class="className">
    <template v-if="drawerAboveTopAppBar">
      <!-- Drawer -->
      <mdc-navigation-drawer
        v-if="useDrawer"
        v-model="drawerOpen"
        :type="drawerType"
        :attr-or-prop="drawerAttrOrProp"
      >
        <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
          <slot :name="slotName" v-bind="slotData"></slot>
        </template>
      </mdc-navigation-drawer>
      <!-- Content -->
      <div class="mdc-layout-view__content">
        <!-- Top App Bar -->
        <mdc-top-app-bar
          v-if="useTopAppBar"
          :key="
            isModalDrawer
              ? 'top-app-bar-with-modal-drawer'
              : 'top-app-bar-with-permanent-drawer'
          "
          :content-selector="contentSelector"
          :attr-or-prop="currentTopAppBarAttrOrProp"
          @nav="handleDrawer"
        >
          <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
            <slot :name="slotName" v-bind="slotData"></slot>
          </template>
        </mdc-top-app-bar>
        <!-- Before Slot -->
        <slot name="before-layout-view"></slot>
        <!-- App Content -->
        <div :id="contentSelector" class="mdc-layout-view__app-content">
          <div class="mdc-layout-view__main-content">
            <slot></slot>
          </div>
        </div>
        <!-- After Slot -->
        <slot name="after-layout-view"></slot>
      </div>
    </template>
    <template v-else>
      <!-- Top App Bar -->
      <mdc-top-app-bar
        v-if="useTopAppBar"
        :key="
          isModalDrawer
            ? 'top-app-bar-with-modal-drawer'
            : 'top-app-bar-with-permanent-drawer'
        "
        :content-selector="contentSelector"
        :attr-or-prop="currentTopAppBarAttrOrProp"
        @nav="handleDrawer"
      >
        <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
          <slot :name="slotName" v-bind="slotData"></slot>
        </template>
      </mdc-top-app-bar>
      <!-- Before Slot -->
      <slot name="before-layout-view"></slot>
      <!-- Content -->
      <div class="mdc-layout-view__content">
        <!-- Drawer -->
        <mdc-navigation-drawer
          v-if="useDrawer"
          v-model="drawerOpen"
          :type="drawerType"
          :attr-or-prop="drawerAttrOrProp"
        >
          <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
            <slot :name="slotName" v-bind="slotData"></slot>
          </template>
        </mdc-navigation-drawer>
        <!-- App Content -->
        <div :id="contentSelector" class="mdc-layout-view__app-content">
          <div class="mdc-layout-view__main-content">
            <slot></slot>
          </div>
        </div>
      </div>
      <!-- After Slot -->
      <slot name="after-layout-view"></slot>
    </template>
  </div>
</template>

<script>
export default {
  name: 'UiLayoutView',
  customOptions: {}
};
</script>

<script setup>
import {
  reactive,
  toRefs,
  computed,
  onMounted,
  onBeforeUnmount,
  nextTick
} from 'vue';
import MdcTopAppBar from './top-app-bar.vue';
import MdcNavigationDrawer from './navigation-drawer.vue';
import { generateRandomString } from '../../utils/helpers';

const props = defineProps({
  useTopAppBar: {
    type: Boolean,
    default: true
  },
  topAppBarAttrOrProp: {
    type: Object,
    default: () => ({})
  },
  useDrawer: {
    type: Boolean,
    default: true
  },
  drawerAttrOrProp: {
    type: Object,
    default: () => ({})
  },
  drawerBelowTopAppBar: {
    type: Boolean,
    default: false
  },
  breakpoint: {
    type: Number,
    default: 960
  }
});

const state = reactive({
  contentSelector: generateRandomString('mdc-layout-view'),
  drawerOpen: false,
  isLargeScreen: true
});
const { contentSelector, drawerOpen } = toRefs(state);

const drawerType = computed(() =>
  state.isLargeScreen ? 'permanent' : 'modal'
);
const isModalDrawer = computed(() => drawerType.value === 'modal');
const isPermanentDrawer = computed(() => drawerType.value === 'permanent');
const drawerAboveTopAppBar = computed(() => !props.drawerBelowTopAppBar);
const className = computed(() => ({
  'mdc-layout-view': true,
  'mdc-layout-view--with-modal-drawer': props.useDrawer && isModalDrawer.value,
  'mdc-layout-view--with-permanent-drawer':
    props.useDrawer && isPermanentDrawer.value,
  'mdc-layout-view--with-drawer-above-top-app-bar':
    props.useDrawer && isPermanentDrawer.value && drawerAboveTopAppBar.value,
  'mdc-layout-view--with-drawer-below-top-app-bar':
    props.useDrawer && isPermanentDrawer.value && props.drawerBelowTopAppBar,
  'mdc-layout-view--without-drawer': !props.useDrawer,
  'mdc-layout-view--mobile': !state.isLargeScreen,
  'mdc-layout-view--desktop': state.isLargeScreen
}));
const currentTopAppBarAttrOrProp = computed(() =>
  Object.assign(
    {
      navIcon: isPermanentDrawer.value ? false : 'menu'
    },
    props.topAppBarAttrOrProp
  )
);

onMounted(() => {
  init();
  window.addEventListener('balmResize', init);
});

onBeforeUnmount(() => {
  window.removeEventListener('balmResize', init);
});

function handleDrawer() {
  if (!isPermanentDrawer.value) {
    state.drawerOpen = !state.drawerOpen;
  }
}

function init() {
  updateLayoutViewport();
}

function updateLayoutViewport() {
  nextTick(() => {
    state.isLargeScreen = window.innerWidth > props.breakpoint;
    if (state.drawerOpen) {
      state.drawerOpen = false;
    }
  });
}

defineExpose({
  updateLayoutViewport
});
</script>
