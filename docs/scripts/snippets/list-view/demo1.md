- `config/model.js`

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

- `components/views/list-view.js`

  ```js
  import { useStore } from 'balm-ui';

  export async function getModelConfigFn({ modelPath }) {
    const store = useStore();

    return await store.getModelConfig(modelPath);
  }

  export async function getModelListDataFn({ model, searchForm, listData }) {
    const store = useStore();

    const { data } = searchForm;
    const { page } = listData;
    const params = Object.assign({}, data, {
      page
    });

    return await store.getModelList(model, params);
  }

  export async function handleRowAction(action, data, refresh) {
    console.log('handleRowAction', action, data);
  }

  export async function handleTopAction(action, data, refresh) {
    console.log('handleTopAction', action, data);
  }
  ```

```js
import {
  getModelConfigFn,
  getModelListDataFn,
  handleRowAction,
  handleTopAction
} from '@/components/views/list-view';

Vue.use(BalmUIPro, {
  UiListView: {
    getModelConfigFn,
    getModelDataFn: getModelListDataFn,
    tableDataFormat: {
      list: 'data',
      total: 'total'
      // page: 'page'
    },
    rowActionHandler: handleRowAction,
    topActionHandler: handleTopAction
  }
});
```

---

```html
<ui-list-view
  title="List View"
  model="user"
  model-path="model-config/demo.json"
  :thead="thead"
  :tbody="tbody"
  :row-action-config="rowActionConfig"
  :top-action-config="topActionConfig"
></ui-list-view>
```

```js
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
  'id',
  'dessert',
  'calories',
  'fat',
  {
    slot: 'actions'
  }
];

const rowActionConfig = [
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

const topActionConfig = [
  {
    type: 'column-selection',
    icon: 'view_column',
    text: 'Column',
    allSelectedLabel: 'All'
  },
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
      rowActionConfig,
      topActionConfig
    };
  }
};
```
