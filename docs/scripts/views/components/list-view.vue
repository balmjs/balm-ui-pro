<template>
  <docs-page name="list-view" without-css demo-count="1">
    <ui-list-view
      title="List View"
      model="user"
      model-path="model-config/a.json"
      :thead="thead"
      :tbody="tbody"
      :row-action-config="rowActionConfig"
      :top-action-config="topActionConfig"
      :row-action-rendering="rowActionRendering"
      :top-action-rendering="topActionRendering"
      @change:x="onChange"
      @action="onAction"
    >
      <!-- <template #before-form-view>xxx</template>
      <template #after-form-view>yyy</template> -->
      <!-- <template #list-view-pagination="{ currentMinRow, currentMaxRow, total }">
        {{ currentMinRow }} - {{ currentMaxRow }} / {{ total }}
      </template> -->
    </ui-list-view>
    <ui-snippet :code="$store.demos[1]"></ui-snippet>
  </docs-page>
</template>

<script>
const thead = [
  {
    value: 'ID',
    required: true
  },
  'Dessert',
  'Calories',
  'Fat',
  'Actions'
];
const tbody = [
  {
    field: 'id'
  },
  'dessert',
  'calories',
  'fat',
  {
    slot: 'actions'
  }
];
const rowActionConfig = [
  {
    // if: true,
    component: 'ui-icon',
    text: 'add'
  },
  {
    type: 'no-slot',
    component: 'ui-icon-button',
    attrOrProp: {
      icon: 'favorite'
    }
  },
  {
    component: 'ui-button',
    text: 'Add',
    attrOrProp: {
      icon: 'add'
    }
  },
  {
    text: 'BalmUI',
    href: 'https://v8.material.balmjs.com/'
  },
  {
    type: 'router-link',
    text: 'RouterLink',
    routeName: 'components.detail-view'
  },
  {
    // if: false,
    text: 'Link',
    handler: (data, refresh) => {
      console.log('link button', data);
    }
  }
];
const topActionConfig = [
  {
    // if: true,
    type: 'column-selection',
    icon: 'view_column',
    text: 'Column',
    allSelectedLabel: '全部'
  },
  {
    type: 'router-link',
    icon: 'add',
    text: 'Create',
    routeName: 'components.detail-view'
  },
  {
    type: 'multi-update',
    text: 'Update',
    handler: (data, refresh) => {
      console.log('update', data);
    }
  },
  {
    // if: false,
    type: 'multi-delete',
    text: 'Delete'
  }
];

function rowActionRendering(action, data) {
  // console.log(action, data);
  return true;
}

function topActionRendering(action, data) {
  // console.log(action.type, data);
  return true;
}

export default {
  data() {
    return {
      thead,
      tbody,
      rowActionConfig,
      topActionConfig,
      rowActionRendering,
      topActionRendering
    };
  },
  methods: {
    onChange(key, value, refresh) {
      console.log('onChange', key, value);
      // refresh();
    },
    onAction(action, data) {
      console.log('onAction', action, data);
    }
  }
};
</script>
