<template>
  <section class="mdc-table-view__top-actions">
    <template
      v-for="(action, index) in actionConfig"
      :key="`top-action-${index}`"
    >
      <ui-button
        v-if="ifAction(action)"
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
  actionIconFormat: {
    type: Object,
    default: () => ({})
  },
  refreshData: {
    type: Function,
    default: () => {}
  },
  resetSelectedRows: {
    type: Function,
    default: () => {}
  }
});

function ifAction(action) {
  const currentAction = action.if;

  const { tableDataSource } = props.data;

  return isFunction(currentAction)
    ? currentAction(tableDataSource)
    : props.actionRendering(action, tableDataSource);
}

function actionIcon({ icon, type }) {
  return icon !== false && props.actionIconFormat[type]
    ? props.actionIconFormat[type]
    : icon || '';
}

function handleClick(action) {
  const { data, model, modelOptions, keyName, refreshData, resetSelectedRows } =
    props;

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
      action.handler(tableData, refreshData, resetSelectedRows);
    } else {
      props.actionHandler()(
        Object.assign({}, action),
        tableData,
        refreshData,
        resetSelectedRows
      );
    }
  }
}
</script>
