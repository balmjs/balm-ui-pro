<template>
  <section class="mdc-list-view__top-actions">
    <slot :name="`before-${UI_LIST_VIEW_TOP_ACTIONS.namespace}`"></slot>
    <slot :name="UI_LIST_VIEW_TOP_ACTIONS.namespace" v-bind="listViewData">
      <template
        v-for="(action, actionIndex) in actionConfig"
        :key="`top-action-${actionIndex}`"
      >
        <ui-menu-anchor
          v-if="action.type === TYPES.columnSelection && ifAction(action)"
        >
          <ui-button
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
            @click="columnSelection.open = true"
          >
            {{ action.text }}
          </ui-button>
          <ui-menu v-model="columnSelection.open">
            <ui-checkbox-group
              :model-value="columnSelection.selectedValue"
              :options="columnSelectionOptions"
              all-selected
              :all-selected-label="action.allSelectedLabel"
              selected-all-value
              @update:model-value="handleColumnSelection"
            ></ui-checkbox-group>
          </ui-menu>
        </ui-menu-anchor>
        <template v-else>
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
            @click="handleAction(action)"
          >
            {{ action.text }}
          </ui-button>
        </template>
      </template>
    </slot>
    <slot :name="`after-${UI_LIST_VIEW_TOP_ACTIONS.namespace}`"></slot>
  </section>
</template>

<script>
import { cssClasses, TYPES } from './constants';

const UI_LIST_VIEW_TOP_ACTIONS = {
  namespace: 'list-view-top-actions',
  EVENTS: {
    columnSelection: 'column-selection'
  }
};

export default {
  name: 'UiListViewTopActions',
  customOptions: {}
};
</script>

<script setup>
import { reactive, toRefs, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getRouteLocationRaw } from './constants';
import UiCheckboxGroup from '../checkbox-group/checkbox-group.vue';
import { isBoolean, isString, isObject, isFunction } from '../../utils/typeof';

const router = useRouter();

const props = defineProps({
  listViewData: {
    type: Object,
    default: () => ({})
  },
  thead: {
    type: Array,
    default: () => []
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
  resetSelectedRows: {
    type: Function,
    default: () => {}
  }
});

const state = reactive({
  columnSelection: {
    open: false,
    selectedValue: [],
    fixedItemIndexes: []
  }
});
const { columnSelection } = toRefs(state);
const emit = defineEmits([UI_LIST_VIEW_TOP_ACTIONS.EVENTS.columnSelection]);

const columnSelectionOptions = computed(() => {
  return props.thead.map((item, index) => {
    const label = isString(item) ? item : item.value;
    const disabled = isObject(item) ? item.required : false;

    if (disabled) {
      state.columnSelection.fixedItemIndexes.push(index);
    }

    return {
      label,
      value: index,
      disabled
    };
  });
});

function ifAction(action) {
  const currentAction = action.if;

  return isFunction(currentAction)
    ? currentAction(props.listViewData)
    : isBoolean(currentAction)
    ? currentAction
    : props.actionRendering(Object.assign({}, action), props.listViewData);
}

function actionIcon({ icon, type }) {
  return icon !== false && props.actionIconFormat[type]
    ? props.actionIconFormat[type]
    : icon || '';
}

function handleAction(action) {
  if (action.type === TYPES.routerLink) {
    const to = getRouteLocationRaw(action, props.listViewData);
    router.push(to);
  } else {
    const listViewData = {
      ...props.listViewData,
      resetSelectedRows: props.resetSelectedRows
    };

    if (isFunction(action.handler)) {
      action.handler(listViewData);
    } else {
      props.actionHandler()(Object.assign({}, action), listViewData);
    }
  }
}

function handleColumnSelection(value) {
  let selectedColumns = value;

  state.columnSelection.fixedItemIndexes.forEach((index) => {
    if (!selectedColumns.includes(index)) {
      selectedColumns.push(index);
    }
  });

  state.columnSelection.selectedValue = selectedColumns;
  emit(UI_LIST_VIEW_TOP_ACTIONS.EVENTS.columnSelection, selectedColumns);
}
</script>
