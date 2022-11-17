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
              :class="[cssClasses.rowAction, 'button-without-slot']"
              v-bind="action.attrOrProp || {}"
              @click.native="handleAction(action)"
            ></component>
          </template>
          <template v-else>
            <component
              :is="action.component"
              v-show="configAction('show', action)"
              :key="`button-with-slot-${index}`"
              :class="[cssClasses.rowAction, 'button-with-slot']"
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
            :class="[cssClasses.rowAction, 'internal-link']"
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
            :class="[cssClasses.rowAction, 'external-link']"
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
            :class="[cssClasses.rowAction, 'link']"
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
import { isFunction } from '../../utils/typeof';

export default {
  name: 'UiListViewRowActions',
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
    }
  },
  data() {
    return {
      cssClasses,
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
          case 'if':
            result = this.actionRendering(action, this.data);
            break;
          case 'show':
            result = true;
            break;
          case TYPES.routerLink:
            const keyName = action.keyName || this.keyName;
            const paramsKeys = Array.isArray(keyName) ? keyName : [keyName];

            const params = {};
            paramsKeys.forEach((key) => {
              if (this.data[key]) {
                params[key] = this.data[key];
              }
            });

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
    handleAction(action) {
      const { model, modelOptions, keyName, refreshData } = this;
      const data = {
        model,
        modelOptions,
        keyName,
        data: Object.assign({}, this.data)
      };

      if (isFunction(action.handler)) {
        action.handler(data, refreshData);
      } else {
        this.actionHandler(Object.assign({}, action), data, refreshData);
      }
    }
  }
};
</script>
