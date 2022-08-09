- `config/apis.js`

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
  import apiModelConfig from '@/config/apis';

  Vue.use(BalmUIPro, {
    $model: apiModelConfig
  });
  ```

- `store/model.js`

  ```js
  import { useApiModel } from 'balm-ui-pro';
  import { useHttp } from '@/plugins/http';
  import { API_ENDPOINT } from '@/config';

  const $apiModel = useApiModel();
  const http = useHttp();

  export default {
    methods: {
      requestConfig(config = {}) {
        const { mock, ...options } = config;
        return mock || this.$mock
          ? Object.assign({ baseURL: `/mock${API_ENDPOINT}` }, options)
          : options;
      },
      createModel(model, data = {}, config = {}) {
        return http.post(
          $apiModel.getApi(model, 'create'),
          data,
          this.requestConfig(config)
        );
      },
      deleteModel(model, data = {}, config = {}) {
        return http.post(
          $apiModel.getApi(model, 'delete'),
          data,
          this.requestConfig(config)
        );
      },
      updateModel(model, data = {}, config = {}) {
        return http.post(
          $apiModel.getApi(model, 'update'),
          data,
          this.requestConfig(config)
        );
      },
      getModel(model, params = {}, config = {}) {
        const { apiAction, options } = config;
        const api = apiAction
          ? $apiModel.getApi(model, 'read', apiAction)
          : $apiModel.getApi(model, 'read');

        return http.get(api, {
          params,
          ...this.requestConfig(options)
        });
      },
      getModelList(model, params = {}, config = {}) {
        return http.get($apiModel.getApi(model, 'read', 'list'), {
          params,
          ...this.requestConfig(config)
        });
      },
      getModelDetail(model, params = {}, config = {}) {
        return http.get($apiModel.getApi(model, 'read', 'detail'), {
          params,
          ...this.requestConfig(config)
        });
      }
    }
  };
  ```