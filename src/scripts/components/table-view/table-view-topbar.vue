<template>
  <section class="mdc-table-view__topbar">
    <template v-for="(action, index) in tableView.topbarConfig">
      <ui-button
        v-if="tableView.topbarRendering(action, tableView.tableDataSource)"
        :key="`button-${index}`"
        v-bind="
          Object.assign(
            {
              class: 'action',
              raised: true,
              icon: actionIcon(action)
            },
            action.attrOrProp || {}
          )
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
import { isFunction } from '../../utils/typeof';

export default {
  name: 'UiTableViewTopbar',
  data() {
    return {
      tableView: this.$parent
    };
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
      const { defaultParams, table, lastSearchFormData } = this.tableView;
      const data = {
        defaultParams,
        selectedRows: table.selectedRows,
        tableData: table.data,
        searchFormData: lastSearchFormData
      };

      if (action.type === TYPES.routerLink) {
        const to = getRouteLocationRaw(action, {
          model: this.tableView.model,
          data
        });
        this.$router.push(to);
      } else {
        if (isFunction(action.handler)) {
          action.handler(data, this.tableView.getModelData);
        } else {
          this.tableView.topbarHandler(
            action,
            data,
            this.tableView.getModelData
          );
        }
      }
    }
  }
};
</script>
