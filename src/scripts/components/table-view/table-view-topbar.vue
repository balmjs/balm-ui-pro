<template>
  <section class="mdc-table-view__topbar">
    <template
      v-for="(action, index) in topbarConfig"
      :key="`topbar-action-${index}`"
    >
      <ui-button
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
import { TYPES } from './constants';

export default {
  name: 'UiTableViewTopbar',
  customOptions: {}
};
</script>

<script setup>
import { useRouter } from 'vue-router';
import { getRouteLocationRaw } from './constants';

const router = useRouter();

const props = defineProps({
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
});

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
  const data = {
    defaultParams: props.defaultParams,
    selectedRows: props.selectedRows,
    tableData: props.tableData,
    searchFormData: props.searchFormData
  };
  if (action.type === TYPES.routerLink) {
    const to = getRouteLocationRaw(action, {
      model: props.model,
      data
    });
    router.push(to);
  } else {
    props.topbarHandler(action, data, props.refreshData);
  }
}
</script>
