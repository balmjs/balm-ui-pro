- `model/store.js`

  ```js
  export default {
    methods: {
      async getModelConfig(subPath, mainPath = '') {
        let config = [];

        try {
          const modelConfigFile = mainPath ? `${mainPath}/${subPath}` : subPath;
          const module = await import(`@/${modelConfigFile}`);
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

  export async function getModelDetailDataFn({ model, keyName, $route }) {
    let result = {};

    const id = $route.params[keyName];
    if (id) {
      const store = useStore();
      const params = {};

      params[keyName] = id;

      result = await store.getModelDetail(model, params);
    }

    return result;
  }

  export async function setModelDataFn({ model, keyName, formData }) {
    const store = useStore();

    const id = formData[keyName];
    const fn = id ? 'updateModel' : 'createModel';

    return await store[fn](model, formData);
  }
  ```

  ```js
  import {
    getModelConfigFn,
    getModelDetailDataFn,
    setModelDataFn
  } from '@/model';

  Vue.use(BalmUIPro, {
    UiDetailView: {
      getModelConfigFn,
      getModelDataFn: getModelDetailDataFn,
      setModelDataFn
    }
  });
  ```

```html
<ui-detail-view
  title="Detail View"
  model="user"
  model-path="model-config/demo.js"
></ui-detail-view>
```
