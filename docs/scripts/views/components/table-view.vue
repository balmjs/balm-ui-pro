<template>
  <div>
    <ui-table-view
      title="Table View"
      model="user"
      :thead="thead"
      :tbody="tbody"
      :action-config="actionConfig"
      :topbar-config="topbarConfig"
      :get-model-config-fn="getModelConfig"
      :get-model-data-fn="getModelData"
      :action-handler="actionHandler"
      :action-rendering="actionRendering"
      :topbar-handler="topbarHandler"
    >
      <template #before-form-view>xxx</template>
      <template #after-form-view>yyy</template>
      <!-- <template #pagination="{ currentMinRow, currentMaxRow, total }">
        {{ currentMinRow }} - {{ currentMaxRow }} / {{ total }}
      </template> -->
    </ui-table-view>
  </div>
</template>

<script>
import { loadAsset } from '@/utils';

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
    text: 'BalmJS',
    href: 'https://balm.js.org'
  },
  {
    type: 'router-link',
    text: 'RouterLink',
    routeName: 'components.form-view'
  },
  {
    text: 'Link',
    onClick: () => {
      console.log('link button');
    }
  }
];
const topbarConfig = [
  {
    type: 'router-link',
    icon: 'add',
    text: 'Create'
  },
  {
    type: 'multi-update',
    text: 'Update'
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
    async getModelConfig({ model }) {
      return await loadAsset('model-config/a.json');
    },
    async getModelData({ model }) {
      console.log('getModelData', model);
      return await this.$http.get('/mock/user/list');
    },
    actionHandler(type, data, refresh) {
      console.log('actionHandler', type, data);
    },
    topbarHandler(type, data, refresh) {
      console.log('topbarHandler', type, data);
    }
  }
};
</script>
