import { useApiModel } from 'balm-ui-pro';
import { useHttp } from '@/plugins/http';
import { API_ENDPOINT } from '@/config';

const $apiModel = useApiModel();
const http = useHttp();

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
    },
    async getModelOptions(modelList) {
      console.log('getModelOptions model list', modelList);

      return {
        test: 'hello world'
      };
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
      const { apiName, options } = config;
      const api = apiName
        ? $apiModel.getApi(model, 'read', apiName)
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
