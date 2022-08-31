<template>
  <div class="mdc-table-view__row-actions">
    <template
      v-for="(action, index) in actionConfig"
      :key="`row-action-${index}`"
    >
      <template v-if="configAction('if', action)">
        <template v-if="action.component">
          <template v-if="action.type === TYPES.noSlot">
            <component
              :is="action.component"
              v-show="configAction('show', action)"
              :class="[cssClasses.rowAction, 'button-without-slot']"
              v-bind="action.attrOrProp || {}"
              @click="handleClick(action)"
            ></component>
          </template>
          <template v-else>
            <component
              :is="action.component"
              v-show="configAction('show', action)"
              :class="[cssClasses.rowAction, 'button-with-slot']"
              v-bind="action.attrOrProp || {}"
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
            :class="[cssClasses.rowAction, 'link']"
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
    </template>
  </div>
</template>

<script>
import { cssClasses, TYPES } from './constants';

export default {
  name: 'UiTableViewActions',
  customOptions: {}
};
</script>

<script setup>
import { getRouteLocationRaw } from './constants';
import { isFunction } from '../../utils/typeof';

const props = defineProps({
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
});

function configAction(type, action) {
  let result = '';

  const currentAction = action[type];
  if (isFunction(currentAction)) {
    result = currentAction(props.data);
  } else {
    result = currentAction;

    switch (type) {
      case 'if':
        result = props.actionRendering(action, props.data);
        break;
      case 'show':
        result = true;
        break;
      case TYPES.routerLink:
        const keyName = action.keyName || props.keyName;
        const paramsKeys = Array.isArray(keyName) ? keyName : [keyName];

        const params = {};
        paramsKeys.forEach((key) => {
          if (props.data[key]) {
            params[key] = props.data[key];
          }
        });

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
  const { model, modelOptions, keyName, refreshData } = props;
  const data = {
    model,
    modelOptions,
    keyName,
    data: Object.assign({}, props.data)
  };

  if (isFunction(action.handler)) {
    action.handler(data, refreshData);
  } else {
    props.actionHandler()(action, data, refreshData);
  }
}
</script>
