import { useApiModel } from 'balm-ui-pro';
import { useHttp } from '@/plugins/http';
import { isDev, API_ENDPOINT } from '@/config';
import demoOptions from '@/views/components/options';

const $apiModel = useApiModel();
const http = useHttp();

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
    async setModelOptions(modelList) {
      const modelOptions = {};

      for (const model of modelList) {
        const modelType = model.split(':');
        const [modelName, apiAction] = modelType;

        switch (modelName) {
          case 'demo':
            if (apiAction === 'multiSelect') {
              modelOptions[`${apiAction}Options1`] = await this.$store.getModel(
                modelName,
                {},
                { apiAction: `${apiAction}Options1` }
              );
            } else {
              modelOptions[`${apiAction}Options`] = demoOptions[apiAction];
            }
            break;
        }
      }

      return modelOptions;
    },
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
