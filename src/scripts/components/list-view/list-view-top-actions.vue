<template>
  <section v-if="hasTopActions" class="mdc-list-view__top-actions">
    <slot :name="`before-${namespace}`"></slot>
    <slot :name="namespace" v-bind="listViewData">
      <template v-for="(action, index) in actionConfig">
        <ui-menu-anchor
          v-if="action.type === TYPES.columnSelection && ifAction(action)"
          :key="`column-selection-${index}`"
        >
          <ui-button
            :key="`button-${index}`"
            :class="actionClass(action)"
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
            :key="`button-${index}`"
            :class="actionClass(action)"
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
  },
  data() {
    return {
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
    hasTopActions() {
      const hasCustomSlot =
        this.$slots[`before-${namespace}`] ||
        this.$slots[namespace] ||
        this.$slots[`after-${namespace}`];

      return !!(this.actionConfig.length || hasCustomSlot);
    },
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

      return isFunction(currentAction)
        ? currentAction(this.listViewData)
        : isBoolean(currentAction)
        ? currentAction
        : this.actionRendering(Object.assign({}, action), this.listViewData);
    },
    actionClass({ type, attrOrProp }) {
      return [
        cssClasses.topAction,
        type || '',
        attrOrProp ? attrOrProp.class : ''
      ];
    },
    actionIcon({ icon, type }) {
      return icon !== false && this.actionIconFormat[type]
        ? this.actionIconFormat[type]
        : icon || '';
    },
    handleAction(action) {
      if (action.type === TYPES.routerLink) {
        const to = getRouteLocationRaw(action, this.listViewData);
        this.$router.push(to);
      } else {
        const listViewData = {
          ...this.listViewData,
          resetSelectedRows: this.resetSelectedRows
        };

        if (isFunction(action.handler)) {
          action.handler(listViewData);
        } else {
          this.actionHandler(Object.assign({}, action), listViewData);
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
