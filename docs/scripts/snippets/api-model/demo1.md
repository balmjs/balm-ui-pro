- `apis/index.js`

  ```js
  const apis = [
    [
      'demo',
      '/demo',
      ['read'],
      {
        crud: {
          read: {
            selectOptions: 'select/options',
            checkboxOptions: 'checkbox/options',
            radioOptions: 'radio/options',
            chipsOptions: 'chips/options',
            multiSelectOptions1: 'multi-select/options1',
            multiSelectOptions2: 'multi-select/options2',
            multiSelectOptions3: 'multi-select/options3'
          }
        }
      }
    ],
    ['user', '/user', ['create', 'read', 'update', 'delete']],
    [
      'post',
      '/post',
      ['read'],
      {
        crud: {
          read: {
            '': 'get',
            index: 'index'
          }
        }
      }
    ]
  ];

  export default {
    crud: {
      create: 'add',
      // read: 'get',
      read: {
        list: 'list',
        detail: 'info'
      },
      update: 'edit',
      delete: 'delete'
    },
    // formatApiAction: (modelName, actionName) => `${modelName}-${actionName}`,
    // urlToCamelCase: true,
    apis
  };
  ```

```js
import apiModelConfig from '@/apis';

Vue.use(BalmUIPro, {
  $model: apiModelConfig
});
```

---

- `config/model.js`

  ```js
  import { useApiModel, useConstantList } from 'balm-ui-pro';
  import { useHttp } from '@/plugins/http';
  import { API_ENDPOINT } from '@/config';

  const http = useHttp();
  const $apiModel = useApiModel();

  function getApiUrl(model, operation, apiAction) {
    return apiAction
      ? $apiModel.getApi(model, operation, apiAction)
      : $apiModel.getApi(model, operation);
  }

  export default {
    methods: {
      requestConfig(config = {}) {
        const { mock, ...options } = config;
        return mock || this.$mock
          ? Object.assign({ baseURL: `/mock${API_ENDPOINT}` }, options)
          : options;
      },
      // Basic
      createModel(model, data = {}, config = {}) {
        const { apiAction, ...options } = config;
        const apiUrl = getApiUrl(model, 'create', apiAction);
        return http.post(apiUrl, data, this.requestConfig(options));
      },
      deleteModel(model, data = {}, config = {}) {
        const { apiAction, ...options } = config;
        const apiUrl = getApiUrl(model, 'delete', apiAction);
        return http.post(apiUrl, data, this.requestConfig(options));
      },
      updateModel(model, data = {}, config = {}) {
        const { apiAction, ...options } = config;
        const apiUrl = getApiUrl(model, 'update', apiAction);
        return http.post(apiUrl, data, this.requestConfig(options));
      },
      getModel(model, params = {}, config = {}) {
        const { apiAction, ...options } = config;
        const apiUrl = getApiUrl(model, 'read', apiAction);
        return http.get(apiUrl, {
          params,
          ...this.requestConfig(options)
        });
      },
      // Extended
      getModelList(model, params = {}, config = {}) {
        const apiUrl = getApiUrl(model, 'read', 'list');
        return http.get(apiUrl, {
          params,
          ...this.requestConfig(config)
        });
      },
      getModelDetail(model, params = {}, config = {}) {
        const apiUrl = getApiUrl(model, 'read', 'detail');
        return http.get(apiUrl, {
          params,
          ...this.requestConfig(config)
        });
      },
      async getModelOptions(model, params = {}, config = {}) {
        let result = [];

        const models = model.split(':');
        const [modelType, modelName] = models;
        if (modelName) {
          switch (modelType) {
            case 'list':
              result = await this.getModelList(modelName, params, config);
              break;
            case 'local':
              result = useConstantList(modelName);
              break;
          }
        } else {
          result = await this.getModel(
            model,
            params,
            Object.assign({}, config, {
              apiAction: 'options'
            })
          );
        }

        return result;
      }
    }
  };
  ```
