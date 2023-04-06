<template>
  <section class="mdc-list-view__top-actions">
    <slot :name="`before-${namespace}`"></slot>
    <slot :name="namespace" v-bind="data">
      <template v-for="(action, actionIndex) in actionConfig">
        <ui-menu-anchor
          v-if="action.type === TYPES.columnSelection && ifAction(action)"
          :key="`column-selection-${actionIndex}`"
        >
          <ui-button
            :key="`button-${actionIndex}`"
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
              @change="handleColumnSelection"
            ></ui-checkbox-group>
          </ui-menu>
        </ui-menu-anchor>
        <template v-else>
          <ui-button
            v-if="ifAction(action)"
            :key="`button-${actionIndex}`"
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
    <slot :name="`after-${namespace}`"></slot>
  </section>
</template>

<script>
import UiCheckboxGroup from '../checkbox-group/checkbox-group.vue';
import { cssClasses, TYPES, getRouteLocationRaw } from './constants';
import { isBoolean, isString, isObject, isFunction } from '../../utils/typeof';

const namespace = 'list-view-top-actions';

export default {
  name: 'UiListViewTopActions',
  components: {
    UiCheckboxGroup
  },
  props: {
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
    refreshData: {
      type: Function,
      default: () => {}
    },
    resetSelectedRows: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      cssClasses,
      TYPES,
      namespace,
      columnSelection: {
        open: false,
        selectedValue: [],
        fixedItemIndexes: []
      }
    };
  },
  computed: {
    columnSelectionOptions() {
      return this.thead.map((item, index) => {
        const label = isString(item) ? item : item.value;
        const disabled = isObject(item) ? item.required : false;

        if (disabled) {
          this.columnSelection.fixedItemIndexes.push(index);
        }

        return {
          label,
          value: index,
          disabled
        };
      });
    }
  },
  methods: {
    ifAction(action) {
      const currentAction = action.if;
      const { listDataSource } = this.data;
      const currentListData = Object.assign({}, listDataSource);

      return isFunction(currentAction)
        ? currentAction(currentListData)
        : isBoolean(currentAction)
        ? currentAction
        : this.actionRendering(action, currentListData);
    },
    actionIcon({ icon, type }) {
      return icon !== false && this.actionIconFormat[type]
        ? this.actionIconFormat[type]
        : icon || '';
    },
    handleAction(action) {
      const {
        data,
        model,
        modelOptions,
        keyName,
        refreshData,
        resetSelectedRows
      } = this.$props;

      const listViewData = {
        model,
        modelOptions,
        keyName,
        ...data
      };

      if (action.type === TYPES.routerLink) {
        const to = getRouteLocationRaw(action, listViewData);
        this.$router.push(to);
      } else {
        if (isFunction(action.handler)) {
          action.handler(listViewData, refreshData, resetSelectedRows);
        } else {
          this.actionHandler(
            Object.assign({}, action),
            listViewData,
            refreshData,
            resetSelectedRows
          );
        }
      }
    },
    handleColumnSelection(value) {
      let selectedColumns = value;

      this.columnSelection.fixedItemIndexes.forEach((index) => {
        if (!selectedColumns.includes(index)) {
          selectedColumns.push(index);
        }
      });

      this.$set(this.columnSelection, 'selectedValue', selectedColumns);
      this.$emit('column-selection', selectedColumns);
    }
  }
};
</script>
