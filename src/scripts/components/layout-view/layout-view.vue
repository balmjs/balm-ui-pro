<template>
  <div :class="className">
    <template v-if="!isModalDrawer && drawerBelowTopAppBar">
      <!-- Permanent Drawer Below Top App Bar -->
      <mdc-top-app-bar
        v-if="useTopAppBar"
        :content-selector="contentSelector"
        :is-permanent-drawer="isPermanentDrawer"
        :attr-or-prop="topAppBarAttrOrProp"
        @nav="handleDrawer"
      >
        <slot v-for="(_, name) in $slots" :slot="name" :name="name"></slot>
        <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
          <slot :name="name" v-bind="slotData"></slot>
        </template>
      </mdc-top-app-bar>
      <!-- Main Content -->
      <template v-if="isDismissibleDrawer">
        <!-- Drawer -->
        <mdc-drawer
          v-if="useDrawer"
          v-model="drawerOpen"
          :type="drawerType"
          :attr-or-prop="drawerAttrOrProp"
        >
          <slot v-for="(_, name) in $slots" :slot="name" :name="name"></slot>
          <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
            <slot :name="name" v-bind="slotData"></slot>
          </template>
        </mdc-drawer>
        <!-- App Content -->
        <ui-drawer-app-content
          :id="contentSelector"
          class="mdc-layout-view__app-content"
        >
          <slot></slot>
        </ui-drawer-app-content>
      </template>
      <div v-else :id="contentSelector" class="mdc-layout-view__content">
        <!-- Drawer -->
        <mdc-drawer
          v-if="useDrawer"
          v-model="drawerOpen"
          :type="drawerType"
          :attr-or-prop="drawerAttrOrProp"
        >
          <slot v-for="(_, name) in $slots" :slot="name" :name="name"></slot>
          <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
            <slot :name="name" v-bind="slotData"></slot>
          </template>
        </mdc-drawer>
        <!-- App Content -->
        <div class="mdc-layout-view__app-content">
          <slot></slot>
        </div>
      </div>
    </template>
    <template v-else>
      <!-- Permanent Drawer Above Top App Bar -->
      <mdc-drawer
        v-if="useDrawer"
        v-model="drawerOpen"
        :type="drawerType"
        :attr-or-prop="drawerAttrOrProp"
      >
        <slot v-for="(_, name) in $slots" :slot="name" :name="name"></slot>
        <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
          <slot :name="name" v-bind="slotData"></slot>
        </template>
      </mdc-drawer>
      <!-- Main Content -->
      <ui-drawer-app-content
        v-if="isDismissibleDrawer"
        class="mdc-layout-view__content"
      >
        <!-- Top App Bar -->
        <mdc-top-app-bar
          v-if="useTopAppBar"
          :content-selector="contentSelector"
          :is-permanent-drawer="isPermanentDrawer"
          :attr-or-prop="topAppBarAttrOrProp"
          @nav="handleDrawer"
        >
          <slot v-for="(_, name) in $slots" :slot="name" :name="name"></slot>
          <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
            <slot :name="name" v-bind="slotData"></slot>
          </template>
        </mdc-top-app-bar>
        <!-- App Content -->
        <div :id="contentSelector" class="mdc-layout-view__app-content">
          <slot></slot>
        </div>
      </ui-drawer-app-content>
      <div v-else class="mdc-layout-view__content">
        <!-- Top App Bar -->
        <mdc-top-app-bar
          v-if="useTopAppBar"
          :content-selector="contentSelector"
          :is-permanent-drawer="isPermanentDrawer"
          :attr-or-prop="topAppBarAttrOrProp"
          @nav="handleDrawer"
        >
          <slot v-for="(_, name) in $slots" :slot="name" :name="name"></slot>
          <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
            <slot :name="name" v-bind="slotData"></slot>
          </template>
        </mdc-top-app-bar>
        <!-- App Content -->
        <div :id="contentSelector" class="mdc-layout-view__app-content">
          <slot></slot>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import MdcTopAppBar from './top-app-bar.vue';
import MdcDrawer from './drawer.vue';
import { generateRandomString } from '../../utils/helpers';

export default {
  name: 'UiLayoutView',
  components: {
    MdcTopAppBar,
    MdcDrawer
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
    drawerType: {
      type: String,
      default: 'permanent'
    },
    drawerBelowTopAppBar: {
      type: Boolean,
      default: false
    },
    drawerAttrOrProp: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      contentSelector: generateRandomString('mdc-layout-view'),
      drawerOpen: false
    };
  },
  computed: {
    isPermanentDrawer() {
      return this.drawerType === 'permanent';
    },
    isDismissibleDrawer() {
      return this.drawerType === 'dismissible';
    },
    isModalDrawer() {
      return this.drawerType === 'modal';
    },
    className() {
      return {
        'mdc-layout-view': true,
        'mdc-layout-view--with-permanent-drawer': this.isPermanentDrawer,
        'mdc-layout-view--with-dismissible-drawer': this.isDismissibleDrawer,
        'mdc-layout-view--with-drawer-above-top-app-bar':
          !this.isModalDrawer && !this.drawerBelowTopAppBar,
        'mdc-layout-view--with-drawer-below-top-app-bar':
          !this.isModalDrawer && this.drawerBelowTopAppBar,
        'mdc-layout-view--with-modal-drawer': this.isModalDrawer
      };
    }
  },
  methods: {
    handleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    }
  }
};
</script>
