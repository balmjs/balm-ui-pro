import getType from '../utils/typeof';
import { toCamelCase } from '../utils/helpers';

const API_NAME = '$apiModel';
const ROUTER_NAME = '$routerModel';

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
const CRUD = REST_API.operations.reduce(
  (acc, value) => ({ ...acc, [value]: value }),
  {}
);

let globalApiConfig = {
  crud: {},
  formatApiAction: (frontEndApiName, operationName) => operationName,
  urlToCamelCase: false
};

function getCRUD(crud, defaultCRUD = {}) {
  let result = {};

  if (getType(crud) === 'object') {
    if (
      Object.keys(crud).every((operation) =>
        REST_API.operations.includes(operation)
      )
    ) {
      result = Object.assign({}, crud);
    } else {
      throw new Error(`[${API_NAME}]: 'crud' config is invalid`);
    }
  }

  return Object.keys(result).length ? result : defaultCRUD;
}

function createCustomApis(operation, { frontEndApiName, backEndApi }, config) {
  const apis = {};
  const apiConfig = config[operation] || {};
  const formatApiAction =
    config.formatApiAction || globalApiConfig.formatApiAction;
  const urlToCamelCase =
    config.urlToCamelCase || globalApiConfig.urlToCamelCase;

  for (const [key, value] of Object.entries(apiConfig)) {
    const name = toCamelCase(`${operation}-${frontEndApiName}-${key}`);

    const actionApi = urlToCamelCase
      ? toCamelCase(formatApiAction(frontEndApiName, value) + '')
      : formatApiAction(frontEndApiName, value);
    const url = value ? `${backEndApi}/${actionApi}` : backEndApi;
    apis[name] = /^\/.*/.test(value) ? value : url;
  }

  return apis;
}

function getOperationDefinition(operationDefinition, defaults, extras) {
  let result = operationDefinition;

  if (extras) {
    result =
      getType(operationDefinition) === 'object'
        ? Object.assign({}, operationDefinition, extras)
        : Object.assign({}, defaults, extras);
  }

  return result;
}

let globalApis = {};
class ApiModel {
  constructor() {
    this.map = new Map();
  }

  get responseStatus() {
    return REST_API.responseStatus;
  }

  get apis() {
    return globalApis;
  }

  createApis(frontEndApiName, backEndApi, operations = [], config = {}) {
    const { crud, ...apiConfig } = config;
    const currentCRUD = getCRUD(crud || {}, globalApiConfig.crud);
    const currentConfig = Object.assign({}, globalApiConfig, apiConfig);
    let apis = {};

    if (Array.isArray(operations)) {
      if (!operations.length) {
        console.warn(
          `[${API_NAME}]: ${frontEndApiName} model has no 'operations'`
        );
      }

      const includeOperations = operations.filter((operation) =>
        REST_API.operations.includes(operation)
      );

      for (const [key, value] of Object.entries(currentCRUD)) {
        const operation = key;
        const operationDefinition = getOperationDefinition(
          value,
          { [operation]: value },
          config[operation]
        );

        if (includeOperations.includes(operation)) {
          if (getType(operationDefinition) === 'string') {
            const operationName = operationDefinition;
            const formatApiAction =
              currentConfig.formatApiAction || globalApiConfig.formatApiAction;
            const urlToCamelCase =
              currentConfig.urlToCamelCase || globalApiConfig.urlToCamelCase;

            const defaultName = toCamelCase(`${operation}-${frontEndApiName}`);
            const actionApi = urlToCamelCase
              ? toCamelCase(
                  formatApiAction(frontEndApiName, operationName) + ''
                )
              : formatApiAction(frontEndApiName, operationName);
            const defaultUrl = `${backEndApi}/${actionApi}`;
            const defaultApi = { [defaultName]: defaultUrl };

            apis = Object.assign(apis, defaultApi);
          } else if (getType(operationDefinition) === 'object') {
            const customApis = createCustomApis(
              operation,
              {
                frontEndApiName,
                backEndApi
              },
              Object.assign({}, currentConfig, {
                [operation]: operationDefinition
              })
            );

            apis = Object.assign(apis, customApis);
          } else {
            console.warn(
              `[${API_NAME}]: ${operation} operation definition must be a string or object`
            );
          }
        }
      }
    } else {
      throw new Error(
        `[${API_NAME}]: 'operations' config must be an array (${REST_API.operations})`
      );
    }

    this.map.has(frontEndApiName)
      ? console.warn(
          `[${API_NAME}]: Conflicting api definition - ${frontEndApiName}`
        )
      : this.map.set(frontEndApiName, apis);

    globalApis = Object.assign(globalApis, apis);

    return apis;
  }

  getApi(frontEndApiName, operation, actionSuffix = '') {
    let name;

    if (REST_API.operations.includes(operation)) {
      const defaultName = `${operation}-${frontEndApiName}`;
      const apiName = actionSuffix
        ? `${defaultName}-${actionSuffix}`
        : defaultName;
      name = toCamelCase(apiName);
    } else {
      throw new Error(
        `[${API_NAME}]: '${operation}' is an invalid CRUD (${REST_API.operations}) operation`
      );
    }

    if (getType(globalApis[name]) === 'undefined') {
      throw new Error(
        `[${API_NAME}]: '${name}' (modelName: '${frontEndApiName}', operation: '${operation}', actionSuffix: '${actionSuffix}') is an invalid API name`
      );
    }

    return globalApis[name];
  }
}

function getRouteName(name, namespace) {
  return namespace ? `${namespace}.${name}` : name;
}

let globalRoutes = [];

class RouterModel {
  constructor() {
    this.map = new Map();
  }

  get routes() {
    return globalRoutes;
  }

  createRoute(path, name, component, options = {}) {
    const { namespace, ...routeOptions } = options;

    const route = {
      path,
      name: getRouteName(name, namespace),
      component,
      ...routeOptions
    };

    this.map.has(name)
      ? console.warn(`[${ROUTER_NAME}]: Conflicting route definition - ${name}`)
      : this.map.set(name, route);

    globalRoutes.push(route);

    return route;
  }

  createRoutes(name, components = {}, options = {}) {
    const { indexView, listView, detailView } = components;
    const {
      namespace,
      indexPath,
      indexRedirect,
      indexOptions,
      listPath,
      listOptions,
      detailPath,
      detailOptions
    } = options;

    const children = [
      ...(listView
        ? [
            this.createRoute(
              listPath || 'list',
              getRouteName(`${name}.list`, namespace),
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
              getRouteName(`${name}.detail`, namespace),
              detailView,
              detailOptions || {}
            )
          ]
        : [])
    ];

    const routes = indexView
      ? {
          path: indexPath || name,
          name: getRouteName(`${name}.index`, namespace),
          component: indexView,
          redirect: indexRedirect || {
            name: getRouteName(`${name}.list`, namespace)
          },
          children,
          ...(indexOptions || {})
        }
      : children;

    this.map.has(name)
      ? console.warn(`[${ROUTER_NAME}]: Conflicting route definition - ${name}`)
      : this.map.set(name, routes);

    globalRoutes.push(routes);

    return routes;
  }
}

const apiModel = new ApiModel();
const routerModel = new RouterModel();

function install(Vue, options = {}) {
  const { debug, crud, apis, ...apiConfig } = options;

  globalApiConfig.crud = Object.assign({}, CRUD, getCRUD(crud));

  if (getType(apiConfig) === 'object') {
    globalApiConfig = Object.assign({}, globalApiConfig, apiConfig);
  }

  if (Array.isArray(apis)) {
    apis.forEach((api) => {
      apiModel.createApis(...api);
    });

    if (debug) {
      console.info(
        `[${API_NAME}]: Model APIs`,
        apiModel.map.has(debug) ? apiModel.map.get(debug) : apiModel.apis
      );

      console.info(
        `[${ROUTER_NAME}]: Model Routes`,
        routerModel.map.has(debug)
          ? routerModel.map.get(debug)
          : routerModel.routes
      );
    }
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
