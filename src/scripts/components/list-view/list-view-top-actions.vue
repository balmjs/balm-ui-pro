<template>
  <section class="mdc-list-view__top-actions">
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
  name: 'UiListViewTopActions',
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

  const { listDataSource } = props.data;

  return isFunction(currentAction)
    ? currentAction(listDataSource)
    : props.actionRendering(action, listDataSource);
}

function actionIcon({ icon, type }) {
  return icon !== false && props.actionIconFormat[type]
    ? props.actionIconFormat[type]
    : icon || '';
}

function handleClick(action) {
  const { data, model, modelOptions, keyName, refreshData, resetSelectedRows } =
    props;

  const listViewData = {
    model,
    modelOptions,
    keyName,
    ...data
  };

  if (action.type === TYPES.routerLink) {
    const to = getRouteLocationRaw(action, listViewData);
    router.push(to);
  } else {
    if (isFunction(action.handler)) {
      action.handler(listViewData, refreshData, resetSelectedRows);
    } else {
      props.actionHandler()(
        Object.assign({}, action),
        listViewData,
        refreshData,
        resetSelectedRows
      );
    }
  }
}
</script>
