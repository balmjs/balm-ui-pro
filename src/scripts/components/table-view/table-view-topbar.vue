<template>
  <section class="mdc-table-view__topbar">
    <template v-for="(action, index) in topbarConfig">
      <ui-button
        :key="`button-${index}`"
        v-bind="
          action.attrOrProp || {
            class: 'action',
            raised: true,
            icon: actionIcon(action)
          }
        "
        @click="handleClick(action)"
      >
        {{ action.text }}
      </ui-button>
    </template>
  </section>
</template>

<script>
import { TYPES, getRouteLocationRaw } from './constants';

export default {
  name: 'UiTableViewTopbar',
  props: {
    topbarConfig: {
      type: Array,
      default: () => []
    },
    model: {
      type: String,
      default: ''
    },
    topbarHandler: {
      type: Function,
      default: () => {}
    },
    defaultParams: {
      type: Object,
      default: () => ({})
    },
    selectedRows: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    searchFormData: {
      type: Object,
      default: () => ({})
    },
    refreshData: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    actionIcon({ icon, type }) {
      let result = icon || '';

      if (!icon) {
        switch (type) {
          case 'import':
            result = 'upload';
            break;
          case 'export':
            result = 'download';
            break;
          default:
            if (/(add|create)$/.test(type)) {
              result = 'add';
            } else if (/(update|modify)$/.test(type)) {
              result = 'update';
            } else if (/(del|delete)$/.test(type)) {
              result = 'delete';
            }
        }
      }

      return result;
    },
    handleClick(action) {
      const data = {
        defaultParams: this.defaultParams,
        selectedRows: this.selectedRows,
        tableData: this.tableData,
        searchFormData: this.searchFormData
      };
      if (action.type === TYPES.routerLink) {
        const to = getRouteLocationRaw(action, {
          model: this.model,
          data
        });
        this.$router.push(to);
      } else {
        this.topbarHandler(action, data, this.refreshData);
      }
    }
  }
};
</script>
