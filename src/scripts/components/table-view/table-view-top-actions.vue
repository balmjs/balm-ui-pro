<template>
  <section class="mdc-table-view__top-actions">
    <template v-for="(action, index) in actionConfig">
      <ui-button
        v-if="ifAction(action)"
        :key="`button-${index}`"
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
  </section>
</template>

<script>
import { cssClasses, TYPES, getRouteLocationRaw } from './constants';
import { isFunction } from '../../utils/typeof';

export default {
  name: 'UiTableViewTopActions',
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
    },
    resetSelectedRows: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      cssClasses
    };
  },
  methods: {
    ifAction(action) {
      const currentAction = action.if;

      const { tableDataSource } = this.data;

      return isFunction(currentAction)
        ? currentAction(tableDataSource)
        : this.actionRendering(action, tableDataSource);
    },
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
    handleAction(action) {
      const {
        data,
        model,
        modelOptions,
        keyName,
        refreshData,
        resetSelectedRows
      } = this.$props;

      const tableData = {
        model,
        modelOptions,
        keyName,
        ...data
      };

      if (action.type === TYPES.routerLink) {
        const to = getRouteLocationRaw(action, tableData);
        this.$router.push(to);
      } else {
        if (isFunction(action.handler)) {
          action.handler(tableData, refreshData, resetSelectedRows);
        } else {
          this.actionHandler(
            Object.assign({}, action),
            tableData,
            refreshData,
            resetSelectedRows
          );
        }
      }
    }
  }
};
</script>
