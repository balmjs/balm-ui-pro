<template>
  <div class="mdc-table-view__actions">
    <template
      v-for="(action, index) in actionConfig"
      :key="`table-action-${index}`"
    >
      <template v-if="action.component">
        <template v-if="action.type === TYPES.noSlot">
          <component
            :is="action.component"
            v-show="configAction('show', action)"
            v-bind="Object.assign({ class: 'action' }, action.attrOrProp || {})"
            @click="handleClick(action)"
          ></component>
        </template>
        <template v-else>
          <component
            :is="action.component"
            v-show="configAction('show', action)"
            v-bind="Object.assign({ class: 'action' }, action.attrOrProp || {})"
            @click="handleClick(action)"
          >
            {{ configAction('text', action) }}
          </component>
        </template>
      </template>
      <template v-else>
        <router-link
          v-if="action.type === TYPES.routerLink"
          v-show="configAction('show', action)"
          class="action"
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
import { TYPES } from './constants';

export default {
  name: 'UiTableViewActions',
  customOptions: {}
};
</script>

<script setup>
import { getRouteLocationRaw } from './constants';
import { isFunction } from '../../utils/typeof';

const props = defineProps({
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
});

function configAction(type, action) {
  let result = '';

  const currentAction = action[type];
  if (isFunction(currentAction)) {
    result = currentAction(props.data);
  } else {
    result = currentAction;

    switch (type) {
      case 'show':
        result = true;
        break;
      case TYPES.routerLink:
        const params = {};
        if (props.data[props.keyName]) {
          params[props.keyName] = props.data[props.keyName];
        }
        result = getRouteLocationRaw(action, {
          model: props.model,
          data: props.data,
          params
        });
        break;
    }
  }

  return result;
}

function handleClick(action) {
  if (isFunction(action.handler)) {
    action.handler(props.data, props.refreshData);
  } else {
    const data = {
      model: props.model,
      keyName: props.keyName,
      data: props.data
    };
    props.actionHandler(action, data, props.refreshData);
  }
}
</script>
