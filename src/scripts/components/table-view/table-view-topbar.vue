<template>
  <section class="mdc-table-view__topbar">
    <template
      v-for="(action, index) in tableView.topbarConfig"
      :key="`topbar-action-${index}`"
    >
      <ui-button
        v-if="tableView.topbarRendering(action, tableView.tableDataSource)"
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
import { TYPES } from './constants';

export default {
  name: 'UiTableViewTopbar',
  customOptions: {}
};
</script>

<script setup>
import { getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { getRouteLocationRaw } from './constants';

const router = useRouter();
const instance = getCurrentInstance();
const tableView = instance.parent;

function actionIcon({ icon, type }) {
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
}

function handleClick(action) {
  const { defaultParams, table, lastSearchFormData } = tableView;

  const data = {
    defaultParams,
    selectedRows: table.selectedRows,
    tableData: table.data,
    searchFormData: lastSearchFormData
  };
  if (action.type === TYPES.routerLink) {
    const to = getRouteLocationRaw(action, {
      model: tableView.model,
      data
    });
    router.push(to);
  } else {
    if (isFunction(action.handler)) {
      action.handler(data, tableView.getModelData);
    } else {
      tableView.topbarHandler(action, data, tableView.refreshData);
    }
  }
}
</script>
