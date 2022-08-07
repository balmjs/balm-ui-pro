import { useApiModel } from 'balm-ui-pro';
import { useHttp } from '@/plugins/http';
import { isDev, API_ENDPOINT } from '@/config';
import demoOptions from '@/views/components/options';

const $apiModel = useApiModel();
const http = useHttp();

async function getModelConfig(modelPath) {
  let config = [];

  try {
    const module = await import(`@/views/${modelPath}`);
    config = module.default;
  } catch (err) {
    isDev && console.warn(err.toString());
  }

  return config;
}

async function setModelOptions(modelList) {
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
}

function requestConfig(config = {}) {
  const { mock, ...options } = config;
  return mock || this.$mock
    ? Object.assign({ baseURL: `/mock${API_ENDPOINT}` }, options)
    : options;
}

function createModel(model, data = {}, config = {}) {
  return http.post(
    $apiModel.getApi(model, 'create'),
    data,
    this.requestConfig(config)
  );
}

function deleteModel(model, data = {}, config = {}) {
  return http.post(
    $apiModel.getApi(model, 'delete'),
    data,
    this.requestConfig(config)
  );
}

function updateModel(model, data = {}, config = {}) {
  return http.post(
    $apiModel.getApi(model, 'update'),
    data,
    this.requestConfig(config)
  );
}

function getModel(model, params = {}, config = {}) {
  const { apiAction, options } = config;
  const api = apiAction
    ? $apiModel.getApi(model, 'read', apiAction)
    : $apiModel.getApi(model, 'read');

  return http.get(api, {
    params,
    ...this.requestConfig(options)
  });
}

function getModelList(model, params = {}, config = {}) {
  return http.get($apiModel.getApi(model, 'read', 'list'), {
    params,
    ...this.requestConfig(config)
  });
}

function getModelDetail(model, params = {}, config = {}) {
  return http.get($apiModel.getApi(model, 'read', 'detail'), {
    params,
    ...this.requestConfig(config)
  });
}

const useModelStore = () => ({
  getModelConfig,
  setModelOptions,
  requestConfig,
  createModel,
  deleteModel,
  updateModel,
  getModel,
  getModelList,
  getModelDetail
});

export default useModelStore;
