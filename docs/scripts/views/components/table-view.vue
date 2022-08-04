<template>
  <docs-page name="table-view" without-css demo-count="1">
    <ui-table-view
      title="Table View"
      model="user"
      model-path="model-config/a.json"
      :thead="thead"
      :tbody="tbody"
      :action-config="actionConfig"
      :topbar-config="topbarConfig"
      :action-rendering="actionRendering"
      @reset="onReset"
      @submit="onSubmit"
    >
      <!-- <template #before-form-view>xxx</template>
      <template #after-form-view>yyy</template> -->
      <!-- <template #pagination="{ currentMinRow, currentMaxRow, total }">
        {{ currentMinRow }} - {{ currentMaxRow }} / {{ total }}
      </template> -->
    </ui-table-view>
    <ui-snippet :code="$store.demos[1]"></ui-snippet>
  </docs-page>
</template>

<script>
const thead = ['ID', 'Dessert', 'Calories', 'Fat', 'Actions'];
const tbody = [
  'id',
  'dessert',
  'calories',
  'fat',
  {
    slot: 'actions'
  }
];
const actionConfig = [
  {
    if: (data) => true,
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
    text: 'Link',
    handler: (data, refresh) => {
      console.log('link button', data);
    }
  }
];
const topbarConfig = [
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
    type: 'multi-delete',
    text: 'Delete'
  }
];

function actionRendering(action, data) {
  // console.log(action, data);
  return true;
}

export default {
  data() {
    return {
      thead,
      tbody,
      actionConfig,
      topbarConfig,
      actionRendering
    };
  },
  methods: {
    onReset(vm) {
      console.log('reset', vm);
    },
    onSubmit(result, vm) {
      console.log('submit', result, vm);
    }
  }
};
</script>
