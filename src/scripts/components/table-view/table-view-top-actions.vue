<template>
  <section class="mdc-table-view__top-actions">
    <template v-for="(action, index) in tableView.topActionConfig">
      <ui-button
        v-if="tableView.topActionRendering(action, tableView.tableDataSource)"
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
  data() {
    return {
      cssClasses,
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
    handleAction(action) {
      const { model, modelOptions, keyName, $data, getModelData } =
        this.tableView;
      const data = {
        model,
        modelOptions,
        keyName,
        ...$data
      };
      const refreshData = getModelData;

      if (action.type === TYPES.routerLink) {
        const to = getRouteLocationRaw(action, data);
        this.$router.push(to);
      } else {
        if (isFunction(action.handler)) {
          action.handler(data, refreshData);
        } else {
          this.tableView.topActionHandler(action, data, refreshData);
        }
      }
    }
  }
};
</script>
