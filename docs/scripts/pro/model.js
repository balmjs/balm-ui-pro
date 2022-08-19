import { useApiModel, useRouterModel, useConstantList } from 'balm-ui-pro';
import { useHttp } from '@/plugins/http';
import { isDev, API_ENDPOINT } from '@/config';
import indexView from '@/views/layouts/blank';
import demoOptions from '@/views/components/options';

const http = useHttp();
const $apiModel = useApiModel();
const $routerModel = useRouterModel();

function getApiUrl(model, operation, apiAction) {
  return apiAction
    ? $apiModel.getApi(model, operation, apiAction)
    : $apiModel.getApi(model, operation);
}

export default {
  methods: {
    async getModelConfig(modelPath) {
      let config = [];

      try {
        const module = await import(`@/views/${modelPath}`);
        config = module.default;
      } catch (e) {
        isDev && console.warn(e.toString());
      }

      return config;
    },
    requestConfig(config = {}) {
      const { mock, ...options } = config;
      return mock || this.$mock
        ? Object.assign({ baseURL: `/mock${API_ENDPOINT}` }, options)
        : options;
    },
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
          case 'demo':
            result =
              modelName === 'multiSelect'
                ? await this.getModel(
                    modelType,
                    {},
                    {
                      apiAction: `${modelName}Options1`
                    }
                  )
                : demoOptions[modelName];
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

export { $routerModel, indexView };
