- `model/store.js`

  ```js
  export default {
    methods: {
      async getModelConfig(modelPath) {
        let config = [];

        try {
          const module = await import(`@/views/${modelPath}`);
          config = module.default;
        } catch (err) {
          console.warn(err.toString());
        }

        return config;
      }
      // ...
    }
  };
  ```

- `model/index.js`

  ```js
  import { useStore } from 'balm-ui';

  export async function getModelConfigFn({ modelPath }) {
    const store = useStore();

    return await store.getModelConfig(modelPath);
  }

  export async function getModelListDataFn({ model, searchForm, table }) {
    const store = useStore();

    const { data } = searchForm;
    const { page } = table;
    const params = Object.assign({}, data, {
      page
    });

    return await store.getModelList(model, params);
  }

  export async function listActionHandler(action, data, refresh) {
    console.log('listActionHandler', action);
  }

  export async function listTopbarHandler(action, data, refresh) {
    console.log('listTopbarHandler', action);
  }
  ```

  ```js
  import {
    getModelConfigFn,
    getModelListDataFn,
    listActionHandler,
    listTopbarHandler
  } from '@/model';

  Vue.use(BalmUIPro, {
    UiTableView: {
      getModelConfigFn,
      getModelDataFn: getModelListDataFn,
      tableDataFormat: {
        data: 'data',
        total: 'total'
        // page: 'page'
      },
      actionHandler: listActionHandler,
      topbarHandler: listTopbarHandler
    }
  });
  ```

```html
<ui-table-view
  title="Table View"
  model="user"
  model-path="model-config/demo.json"
  :thead="thead"
  :tbody="tbody"
  :action-config="actionConfig"
  :topbar-config="topbarConfig"
></ui-table-view>
```

```js
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
    text: 'BalmUI',
    href: 'https://v8.material.balmjs.com/'
  },
  {
    type: 'router-link',
    text: 'RouterLink'
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
  }
};
```
