<template>
  <div :class="className">
    <template v-if="isPermanentDrawer && drawerAboveTopAppBar">
      <!-- Drawer -->
      <mdc-navigation-drawer
        v-if="useDrawer"
        v-model="drawerOpen"
        :type="drawerType"
        :attr-or-prop="drawerAttrOrProp"
      >
        <slot v-for="(_, name) in $slots" :slot="name" :name="name"></slot>
        <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
          <slot :name="name" v-bind="slotData"></slot>
        </template>
      </mdc-navigation-drawer>
      <!-- Main Content -->
      <div key="permanent-drawer-content" class="mdc-layout-view__content">
        <!-- Top App Bar -->
        <mdc-top-app-bar
          v-if="useTopAppBar"
          key="top-app-bar-with-permanent-drawer"
          :content-selector="contentSelector"
          :attr-or-prop="currentTopAppBarAttrOrProp"
        >
          <slot v-for="(_, name) in $slots" :slot="name" :name="name"></slot>
          <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
            <slot :name="name" v-bind="slotData"></slot>
          </template>
        </mdc-top-app-bar>
        <!-- Before Slot -->
        <slot name="before-layout-view"></slot>
        <!-- App Content -->
        <div :id="contentSelector" class="mdc-layout-view__app-content">
          <slot></slot>
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
        <slot v-for="(_, name) in $slots" :slot="name" :name="name"></slot>
        <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
          <slot :name="name" v-bind="slotData"></slot>
        </template>
      </mdc-top-app-bar>
      <!-- Before Slot -->
      <slot name="before-layout-view"></slot>
      <!-- Drawer -->
      <template v-if="isModalDrawer">
        <div class="mdc-layout-view__drawer">
          <mdc-navigation-drawer
            v-if="useDrawer"
            v-model="drawerOpen"
            :type="drawerType"
            :attr-or-prop="drawerAttrOrProp"
          >
            <slot v-for="(_, name) in $slots" :slot="name" :name="name"></slot>
            <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
              <slot :name="name" v-bind="slotData"></slot>
            </template>
          </mdc-navigation-drawer>
        </div>
        <!-- Main Content -->
        <div key="modal-drawer-content" class="mdc-layout-view__content">
          <!-- App Content -->
          <div :id="contentSelector" class="mdc-layout-view__app-content">
            <slot></slot>
          </div>
        </div>
      </template>
      <template v-else>
        <!-- Main Content -->
        <div
          :id="contentSelector"
          key="permanent-drawer-content"
          class="mdc-layout-view__content"
        >
          <!-- Drawer -->
          <mdc-navigation-drawer
            v-if="useDrawer"
            v-model="drawerOpen"
            :type="drawerType"
            :attr-or-prop="drawerAttrOrProp"
          >
            <slot v-for="(_, name) in $slots" :slot="name" :name="name"></slot>
            <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
              <slot :name="name" v-bind="slotData"></slot>
            </template>
          </mdc-navigation-drawer>
          <!-- App Content -->
          <div class="mdc-layout-view__app-content">
            <slot></slot>
          </div>
        </div>
      </template>
      <!-- After Slot -->
      <slot name="after-layout-view"></slot>
    </template>
  </div>
</template>

<script>
import MdcTopAppBar from './top-app-bar.vue';
import MdcNavigationDrawer from './navigation-drawer.vue';
import { generateRandomString } from '../../utils/helpers';

export default {
  name: 'UiLayoutView',
  components: {
    MdcTopAppBar,
    MdcNavigationDrawer
  },
  props: {
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
  },
  data() {
    return {
      contentSelector: generateRandomString('mdc-layout-view'),
      drawerOpen: false,
      isLargeScreen: true
    };
  },
  computed: {
    drawerType() {
      return this.isLargeScreen ? 'permanent' : 'modal';
    },
    isModalDrawer() {
      return this.drawerType === 'modal';
    },
    isPermanentDrawer() {
      return this.drawerType === 'permanent';
    },
    drawerAboveTopAppBar() {
      return !this.drawerBelowTopAppBar;
    },
    className() {
      return {
        'mdc-layout-view': true,
        'mdc-layout-view--with-modal-drawer': this.isModalDrawer,
        'mdc-layout-view--with-permanent-drawer': this.isPermanentDrawer,
        'mdc-layout-view--with-drawer-above-top-app-bar':
          this.isPermanentDrawer && this.drawerAboveTopAppBar,
        'mdc-layout-view--with-drawer-below-top-app-bar':
          this.isPermanentDrawer && this.drawerBelowTopAppBar,
        'mdc-layout-view--mobile': !this.isLargeScreen,
        'mdc-layout-view--desktop': this.isLargeScreen
      };
    },
    currentTopAppBarAttrOrProp() {
      return Object.assign(
        {
          navIcon: this.isPermanentDrawer ? false : 'menu'
        },
        this.topAppBarAttrOrProp
      );
    }
  },
  mounted() {
    this.init();
    window.addEventListener('balmResize', this.init);
  },
  beforeDestroy() {
    window.removeEventListener('balmResize', this.init);
  },
  methods: {
    handleDrawer() {
      if (!this.isPermanentDrawer) {
        this.drawerOpen = !this.drawerOpen;
      }
    },
    init() {
      this.updateLayoutViewport();
    },
    updateLayoutViewport() {
      this.isLargeScreen = window.innerWidth > this.breakpoint;
      if (this.isLargeScreen && this.drawerOpen) {
        this.drawerOpen = false;
      }
    }
  }
};
</script>
