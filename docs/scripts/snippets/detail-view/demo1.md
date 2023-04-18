- `config/model.js`

  ```js
  import { isDev } from '@/config';

  export default {
    methods: {
      async getModelConfig(modelPath) {
        let config = [];

        try {
          const module = await import(`@/views/${modelPath}`);
          config = module.default;
        } catch (err) {
          isDev && console.warn(err.toString());
        }

        return config;
      }
      // ...
    }
  };
  ```

- `components/views/detail-view.js`

  ```js
  import { useStore } from 'balm-ui';

  export async function getModelConfigFn({ modelPath }) {
    const store = useStore();

    return await store.getModelConfig(modelPath);
  }

  export async function getModelDetailDataFn({ model, keyName, $route }) {
    let result = {};

    const id = $route?.params[keyName];
    if (id) {
      const store = useStore();
      const params = {};

      params[keyName] = id;

      result = await store.getModelDetail(model, params);
    }

    return result;
  }

  export async function setModelDataFn({
    model,
    keyName,
    formData,
    formDataSource
  }) {
    const store = useStore();

    const id = formDataSource[keyName] || formData[keyName];
    const fn = id ? 'updateModel' : 'createModel';

    return await store[fn](model, formData);
  }
  ```

```js
import {
  getModelConfigFn,
  getModelDetailDataFn,
  setModelDataFn
} from '@/components/views/detail-view';

Vue.use(BalmUIPro, {
  UiDetailView: {
    getModelConfigFn,
    getModelDataFn: getModelDetailDataFn,
    setModelDataFn
  }
});
```

---

```html
<ui-detail-view
  title="Detail View"
  model="user"
  model-path="model-config/demo.js"
></ui-detail-view>
```
