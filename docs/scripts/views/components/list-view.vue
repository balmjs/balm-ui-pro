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
      @update:x="onChange"
      @action="onAction"
    >
      <!-- <template #before-form-view>xxx</template>
      <template #after-form-view>yyy</template> -->
      <!-- <template #pagination="{ currentMinRow, currentMaxRow, total }">
        {{ currentMinRow }} - {{ currentMaxRow }} / {{ total }}
      </template> -->
    </ui-list-view>
    <ui-snippet :code="$store.demos[1]"></ui-snippet>
  </docs-page>
</template>


<script setup>
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
    href: 'https://material.balmjs.com/'
  },
  {
    type: 'router-link',
    text: 'RouterLink',
    routeName: 'components.detail-view'
  },
  {
    // if: false,
    text: 'Link',
    handler: (data, listViewData) => {
      console.log('link button', data, listViewData);
    }
  }
];

const topActionConfig = [
  {
    // if: true,
    type: 'column-selection',
    icon: 'view_column',
    text: 'Column',
    allSelectedLabel: 'All'
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
    handler: (listViewData) => {
      console.log('update', listViewData);
    }
  },
  {
    // if: false,
    type: 'multi-delete',
    text: 'Delete'
  }
];

function rowActionRendering(action, data, listViewData) {
  // console.log(action, data, listViewData);
  return true;
}

function topActionRendering(action, listViewData) {
  // console.log(action.type, listViewData);
  return true;
}

function onChange(key, value, { refreshData }) {
  console.log('onChange', key, value);
  // refreshData();
}

function onAction(action, listViewData) {
  console.log('onAction', action, listViewData);
}
</script>
