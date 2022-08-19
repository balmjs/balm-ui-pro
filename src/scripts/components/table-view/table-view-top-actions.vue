<template>
  <section class="mdc-table-view__top-actions">
    <template
      v-for="(action, index) in tableView.topActionConfig"
      :key="`top-action-${index}`"
    >
      <ui-button
        v-if="tableView.topActionRendering(action, tableView.tableDataSource)"
        :class="[cssClasses.topAction, action.type || '']"
        v-bind="
          Object.assign(
            {
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
import { cssClasses, TYPES } from './constants';

export default {
  name: 'UiTableViewTopbar',
  customOptions: {}
};
</script>

<script setup>
import { toRefs, getCurrentInstance } from 'vue';
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
  const { model, modelOptions, keyName, state, getModelData } = tableView;

  const data = {
    model,
    modelOptions,
    keyName,
    ...toRefs(state)
  };
  const refreshData = getModelData;

  if (action.type === TYPES.routerLink) {
    const to = getRouteLocationRaw(action, data);
    router.push(to);
  } else {
    if (isFunction(action.handler)) {
      action.handler(data, refreshData);
    } else {
      tableView.topActionHandler(action, data, refreshData);
    }
  }
}
</script>
