<template>
  <div class="mdc-list-view__row-actions">
    <template v-for="(action, index) in actionConfig">
      <template v-if="configAction('if', action)">
        <template v-if="action.component">
          <template v-if="action.type === TYPES.noSlot">
            <component
              :is="action.component"
              v-show="configAction('show', action)"
              :key="`button-without-slot-${index}`"
              :class="actionClass('button-without-slot', action)"
              v-bind="action.attrOrProp || {}"
              @click.native="handleAction(action)"
            ></component>
          </template>
          <template v-else>
            <component
              :is="action.component"
              v-show="configAction('show', action)"
              :key="`button-with-slot-${index}`"
              :class="actionClass('button-with-slot', action)"
              v-bind="action.attrOrProp || {}"
              @click.native="handleAction(action)"
            >
              {{ configAction('text', action) }}
            </component>
          </template>
        </template>
        <template v-else>
          <router-link
            v-if="action.type === TYPES.routerLink"
            v-show="configAction('show', action)"
            :key="`internal-link-${index}`"
            :class="actionClass('internal-link', action)"
            :to="configAction(TYPES.routerLink, action)"
            v-bind="action.attrOrProp || {}"
          >
            <ui-icon v-if="action.icon">
              {{ configAction('icon', action) }}
            </ui-icon>
            <span v-if="action.text">{{ configAction('text', action) }}</span>
          </router-link>
          <a
            v-else-if="action.href"
            v-show="configAction('show', action)"
            :key="`external-link-${index}`"
            :class="actionClass('external-link', action)"
            :href="configAction('href', action)"
            v-bind="
              Object.assign(
                {
                  target: '_blank',
                  rel: 'noopener'
                },
                action.attrOrProp || {}
              )
            "
          >
            <ui-icon v-if="action.icon">
              {{ configAction('icon', action) }}
            </ui-icon>
            <span v-if="action.text">{{ configAction('text', action) }}</span>
          </a>
          <a
            v-else
            v-show="configAction('show', action)"
            :key="`link-${index}`"
            :class="actionClass('link', action)"
            href="javascript:void(0)"
            @click="handleAction(action)"
          >
            <ui-icon v-if="action.icon">
              {{ configAction('icon', action) }}
            </ui-icon>
            <span v-if="action.text">{{ configAction('text', action) }}</span>
          </a>
        </template>
      </template>
    </template>
  </div>
</template>

<script>
import { cssClasses, TYPES, getRouteLocationRaw } from './constants';
import { isBoolean, isFunction } from '../../utils/typeof';

export default {
  name: 'UiListViewRowActions',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    listViewData: {
      type: Object,
      default: () => ({})
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
    }
  },
  data() {
    return {
      TYPES
    };
  },
  methods: {
    actionClass(currentClassName, { type, attrOrProp }) {
      return [
        cssClasses.rowAction,
        currentClassName,
        type || '',
        attrOrProp ? attrOrProp.class : ''
      ];
    },
    configAction(type, action) {
      let result = '';
      const currentAction = action[type];
      const rowData = Object.assign({}, this.data);

      if (isFunction(currentAction)) {
        result = currentAction(rowData, this.listViewData);
      } else {
        result = currentAction;

        switch (type) {
          case 'if':
            result = isBoolean(currentAction)
              ? currentAction
              : this.actionRendering(
                  Object.assign({}, action),
                  rowData,
                  this.listViewData
                );
            break;
          case 'show':
            result = isBoolean(currentAction) ? currentAction : true;
            break;
          case TYPES.routerLink:
            const keyName = action.keyName || this.listViewData.keyName;
            const paramsKeys = Array.isArray(keyName) ? keyName : [keyName];

            const params = {};
            paramsKeys.forEach((key) => {
              if (rowData[key]) {
                params[key] = rowData[key];
              }
            });

            result = getRouteLocationRaw(
              action,
              Object.assign({}, this.listViewData, {
                params
              }),
              rowData
            );
            break;
        }
      }

      return result;
    },
    handleAction(action) {
      const rowData = Object.assign({}, this.data);
      if (isFunction(action.handler)) {
        action.handler(rowData, this.listViewData);
      } else {
        this.actionHandler(
          Object.assign({}, action),
          rowData,
          this.listViewData
        );
      }
    }
  }
};
</script>
