<template>
  <div class="mdc-table-view__actions">
    <template v-for="(action, index) in actionConfig">
      <template v-if="action.component">
        <template v-if="action.type === TYPES.noSlot">
          <component
            :is="action.component"
            v-show="configAction('show', action)"
            :key="`button-without-slot-${index}`"
            v-bind="Object.assign({ class: 'action' }, action.attrOrProp || {})"
            @click.native="handleClick(action)"
          ></component>
        </template>
        <template v-else>
          <component
            :is="action.component"
            v-show="configAction('show', action)"
            :key="`button-with-slot-${index}`"
            v-bind="Object.assign({ class: 'action' }, action.attrOrProp || {})"
            @click.native="handleClick(action)"
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
          class="action"
          :to="configAction(TYPES.routerLink, action)"
          v-bind="action.routerLinkAttrOrProp || {}"
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
          class="action"
          :href="configAction('href', action)"
          :target="action.target || '_blank'"
          rel="noopener"
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
          class="action"
          href="javascript:void(0)"
          @click="handleClick(action)"
        >
          <ui-icon v-if="action.icon">
            {{ configAction('icon', action) }}
          </ui-icon>
          <span v-if="action.text">{{ configAction('text', action) }}</span>
        </a>
      </template>
    </template>
  </div>
</template>

<script>
import { TYPES, getRouteLocationRaw } from './constants';
import { isFunction } from '../../utils/typeof';

export default {
  name: 'UiTableViewActions',
  props: {
    actionConfig: {
      type: Array,
      default: () => []
    },
    model: {
      type: String,
      default: ''
    },
    keyName: {
      type: String,
      default: 'id'
    },
    data: {
      type: Object,
      default: () => ({})
    },
    actionHandler: {
      type: Function,
      default: () => {}
    },
    refreshData: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      TYPES
    };
  },
  methods: {
    configAction(type, action) {
      let result = '';

      const currentAction = action[type];
      if (isFunction(currentAction)) {
        result = currentAction(this.data);
      } else {
        result = currentAction;

        switch (type) {
          case 'show':
            result = true;
            break;
          case TYPES.routerLink:
            const params = {};
            if (this.data[this.keyName]) {
              params[this.keyName] = this.data[this.keyName];
            }
            result = getRouteLocationRaw(action, {
              model: this.model,
              data: this.data,
              params
            });
            break;
        }
      }

      return result;
    },
    handleClick(action) {
      if (isFunction(action.handler)) {
        action.handler(this.data, this.refreshData);
      } else {
        this.actionHandler(action, this.data, this.refreshData);
      }
    }
  }
};
</script>
