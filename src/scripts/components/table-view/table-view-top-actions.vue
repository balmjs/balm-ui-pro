<template>
  <section class="mdc-table-view__top-actions">
    <template
      v-for="(action, index) in actionConfig"
      :key="`top-action-${index}`"
    >
      <ui-button
        v-if="actionRendering(action, data.tableDataSource)"
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
  name: 'UiTableViewTopActions',
  customOptions: {}
};
</script>

<script setup>
import { useRouter } from 'vue-router';
import { getRouteLocationRaw } from './constants';
import { isFunction } from '../../utils/typeof';

const router = useRouter();

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  model: {
    type: String,
    default: ''
  },
  modelOptions: {
    type: Object,
    default: () => ({})
  },
  keyName: {
    type: [String, Array],
    default: 'id'
  },
  actionConfig: {
    type: Array,
    default: () => []
  },
  actionHandler: {
    type: Function,
    default: () => {}
  },
  actionRendering: {
    type: Function,
    default: () => true
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
  const { data, model, modelOptions, keyName, refreshData } = props;

  const tableData = {
    model,
    modelOptions,
    keyName,
    ...data
  };

  if (action.type === TYPES.routerLink) {
    const to = getRouteLocationRaw(action, tableData);
    router.push(to);
  } else {
    if (isFunction(action.handler)) {
      action.handler(tableData, refreshData);
    } else {
      props.actionHandler()(action, tableData, refreshData);
    }
  }
}
</script>
