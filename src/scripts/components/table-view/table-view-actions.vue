<template>
  <div class="mdc-table-view__actions">
    <template v-for="(action, index) in actionConfig">
      <ui-icon
        v-if="action.type === TYPES.icon"
        v-show="configAction('show', action)"
        :key="`icon-${index}`"
        class="action"
        v-bind="action.iconAttrOrProp || {}"
        @click="handleClick(action)"
      >
        {{ configAction('icon', action) }}
      </ui-icon>

      <ui-button
        v-else-if="action.type === TYPES.button"
        v-show="configAction('show', action)"
        :key="`button-${index}`"
        class="action"
        v-bind="action.buttonAttrOrProp || {}"
        @click="handleClick(action)"
      >
        {{ configAction('text', action) }}
      </ui-button>

      <template v-else-if="action.type === TYPES.link">
        <a
          v-if="action.href"
          v-show="configAction('show', action)"
          :key="`external-link-${index}`"
          class="action"
          :href="configAction('href', action)"
          :target="action.target || '_blank'"
          rel="noopener"
        >
          {{ configAction('text', action) }}
        </a>
        <router-link
          v-else
          v-show="configAction('show', action)"
          :key="`internal-link-${index}`"
          class="action"
          :to="configAction('link', action)"
          v-bind="action.routerLinkAttrOrProp || {}"
        >
          <ui-icon v-if="action.icon">
            {{ configAction('icon', action) }}
          </ui-icon>
          <span v-if="action.text">{{ configAction('text', action) }}</span>
        </router-link>
      </template>
    </template>
  </div>
</template>

<script>
import { isFunction } from '../../utils/typeof';

const UiTableViewActions = {
  TYPES: {
    icon: 'icon',
    button: 'button',
    link: 'link'
  }
};

export default {
  name: 'UiTableViewActions',
  props: {
    actionConfig: {
      type: Array,
      default: () => []
    },
    requestConfig: {
      type: Object,
      default: () => ({})
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
    refreshData: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      TYPES: UiTableViewActions.TYPES
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
          case 'link':
            if (!action.href) {
              const params = {};
              if (this.data[this.keyName]) {
                params[this.keyName] = this.data[this.keyName];
              }
              const { routeName, routeParams } = action;
              result = {
                name: routeName || `${this.model}.detail`,
                params: isFunction(routeParams)
                  ? routeParams(this.data)
                  : params
              };
            }
            break;
        }
      }

      return result;
    },
    handleClick(action) {
      action.onClick(this.data, this.refreshData);
    }
  }
};
</script>
