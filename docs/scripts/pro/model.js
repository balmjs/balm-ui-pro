import { useApiModel, useRouterModel, useConstantList } from 'balm-ui-pro';
import { useHttp } from '@/plugins/http';
import { isDev, API_ENDPOINT } from '@/config';
import indexView from '@/views/layouts/blank';
import demoOptions from '@/views/components/options';

const http = useHttp();
const $apiModel = useApiModel();
const $routerModel = useRouterModel();

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

function getApiUrl(model, operation, apiAction) {
  return apiAction
    ? $apiModel.getApi(model, operation, apiAction)
    : $apiModel.getApi(model, operation);
}

function requestConfig(config = {}) {
  const { mock, ...options } = config;
  return mock || this.$mock
    ? Object.assign({ baseURL: `/mock${API_ENDPOINT}` }, options)
    : options;
}

function createModel(model, data = {}, config = {}) {
  const { apiAction, ...options } = config;
  const apiUrl = getApiUrl(model, 'create', apiAction);
  return http.post(apiUrl, data, requestConfig(options));
}

function deleteModel(model, data = {}, config = {}) {
  const { apiAction, ...options } = config;
  const apiUrl = getApiUrl(model, 'delete', apiAction);
  return http.post(apiUrl, data, requestConfig(options));
}

function updateModel(model, data = {}, config = {}) {
  const { apiAction, ...options } = config;
  const apiUrl = getApiUrl(model, 'update', apiAction);
  return http.post(apiUrl, data, requestConfig(options));
}

function getModel(model, params = {}, config = {}) {
  const { apiAction, ...options } = config;
  const apiUrl = getApiUrl(model, 'read', apiAction);
  return http.get(apiUrl, {
    params,
    ...requestConfig(options)
  });
}

function getModelList(model, params = {}, config = {}) {
  const apiUrl = getApiUrl(model, 'read', 'list');
  return http.get(apiUrl, {
    params,
    ...requestConfig(config)
  });
}

function getModelDetail(model, params = {}, config = {}) {
  const apiUrl = getApiUrl(model, 'read', 'detail');
  return http.get(apiUrl, {
    params,
    ...requestConfig(config)
  });
}

async function getModelOptions(model, params = {}, config = {}) {
  let result = [];

  const models = model.split(':');
  const [modelType, modelName] = models;
  if (modelName) {
    switch (modelType) {
      case 'list':
        result = await getModelList(modelName, params, config);
        break;
      case 'local':
        result = useConstantList(modelName);
        break;
      case 'demo':
        result =
          modelName === 'multiSelect'
            ? await getModel(
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
    result = await getModel(
      model,
      params,
      Object.assign({}, config, {
        apiAction: 'options'
      })
    );
  }

  return result;
}

const useModelStore = () => ({
  getModelConfig,
  createModel,
  deleteModel,
  updateModel,
  getModel,
  getModelList,
  getModelDetail,
  getModelOptions
});

export default useModelStore;
export { $routerModel, indexView };
