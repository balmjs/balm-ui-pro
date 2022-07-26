import getType from '../utils/typeof';
import { toCamelCase } from '../utils/helpers';

const REST_API = {
  responseStatus: {
    OK: 200,
    Created: 201,
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    Conflict: 409,
    InternalServerError: 500,
    ServiceUnavailable: 503
  },
  operations: ['create', 'read', 'update', 'delete']
};
let CRUD = REST_API.operations.reduce(
  (acc, value) => ({ ...acc, [value]: value }),
  {}
);
let globalApiConfig = {
  formatApiAction: (frontEndApiName, operationName) => operationName
};
let globalApis = {};

function createCustomApis(operation, { frontEndApiName, backEndApi }, config) {
  const apis = {};
  const apiConfig = config[operation] || {};
  const formatApiAction =
    apiConfig.formatApiAction || globalApiConfig.formatApiAction;

  for (const [key, value] of Object.entries(apiConfig)) {
    const name = toCamelCase(`${operation}-${frontEndApiName}-${key}`);

    const url = value
      ? `${backEndApi}/${toCamelCase(formatApiAction(frontEndApiName, value))}`
      : backEndApi;
    apis[name] = /^\/.*/.test(value) ? value : url;
  }

  return apis;
}

class ApiModel {
  get responseStatus() {
    return REST_API.responseStatus;
  }

  get apis() {
    return globalApis;
  }

  createApis(frontEndApiName, backEndApi, config = {}) {
    config = Object.assign({}, globalApiConfig, config);
    const formatApiAction =
      config.formatApiAction || globalApiConfig.formatApiAction;

    REST_API.operations.forEach((operation) => {
      let defaultApi = {};
      const { excludeDefaults } = config;
      if (
        !(
          excludeDefaults &&
          Array.isArray(excludeDefaults) &&
          excludeDefaults.includes(operation)
        )
      ) {
        const defaultName = toCamelCase(`${operation}-${frontEndApiName}`);
        const defaultUrl = `${backEndApi}/${toCamelCase(
          formatApiAction(frontEndApiName, CRUD[operation])
        )}`;
        defaultApi = { [defaultName]: defaultUrl };
      }

      const customApis = createCustomApis(
        operation,
        {
          frontEndApiName,
          backEndApi
        },
        config
      );

      globalApis = Object.assign(globalApis, defaultApi, customApis);
    });

    return globalApis;
  }

  getApi(frontEndApiName, operation, suffix = '') {
    let name;

    if (REST_API.operations.includes(operation)) {
      const defaultName = `${operation}-${frontEndApiName}`;
      const apiName = suffix ? `${defaultName}-${suffix}` : defaultName;
      name = toCamelCase(apiName);
    } else {
      throw new Error(
        `[$apiModel]: '${operation}' is an invalid CRUD (${REST_API.operations}) operation`
      );
    }

    if (getType(globalApis[name]) === 'undefined') {
      throw new Error(`[$apiModel]: '${name}' is an invalid API name`);
    }

    return globalApis[name];
  }
}

class RouterModel {
  createRoute(path, name, component, options = {}) {
    return {
      path,
      name,
      component,
      ...options
    };
  }

  createViewRoutes(name, components = {}, options = {}) {
    const { indexView, listView, detailView } = components;
    const {
      indexPath,
      indexRedirect,
      listPath,
      detailPath,
      listOptions,
      detailOptions
    } = options;
    return {
      path: indexPath || name,
      name: `${name}.index`,
      component: indexView,
      redirect: indexRedirect || { name: `${name}.list` },
      children: [
        ...(listView
          ? [
              this.createRoute(
                listPath || 'list',
                `${name}.list`,
                listView,
                listOptions || {}
              )
            ]
          : []),
        ...(Array.isArray(detailView)
          ? detailView
          : detailView
          ? [
              this.createRoute(
                detailPath || ':id?',
                `${name}.detail`,
                detailView,
                detailOptions || {}
              )
            ]
          : [])
      ]
    };
  }
}

const apiModel = new ApiModel();
const routerModel = new RouterModel();

function install(Vue, options = {}) {
  const { crud, apis, ...apiConfig } = options;

  if (getType(crud) === 'object') {
    if (
      Object.keys(crud).every((operation) =>
        REST_API.operations.includes(operation)
      )
    ) {
      CRUD = Object.assign({}, CRUD, crud);
    } else {
      throw new Error(`[$apiModel]: Invalid CRUD operations`);
    }
  }

  if (getType(apiConfig) === 'object') {
    globalApiConfig = Object.assign({}, globalApiConfig, apiConfig);
  }

  if (Array.isArray(apis)) {
    apis.forEach((api) => {
      apiModel.createApis(...api);
    });
  }

  Vue.prototype.$apiModel = apiModel;
  Vue.prototype.$routerModel = routerModel;
}

const $model = {
  install
};

const useApiModel = () => apiModel;
const useRouterModel = () => routerModel;

export default $model;
export { useApiModel, useRouterModel };
