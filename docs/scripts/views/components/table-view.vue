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
    >
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

export default {
  data() {
    return {
      thead,
      tbody,
      actionConfig,
      topbarConfig
    };
  },
  methods: {
    async getModelConfig({ model }) {
      return await loadAsset('model-config/a.json');
    },
    async getModelData({ model }) {
      console.log('getModelData', model);
      return await this.$http.get('/mock/user/list');
    }
  }
};
</script>
