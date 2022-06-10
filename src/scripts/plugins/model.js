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
let globalApis = {};

function createCustomApis(
  operation,
  { frontEndApiName, backEndApi },
  apiConfig = {}
) {
  const apis = {};

  for (const [key, value] of Object.entries(apiConfig)) {
    const name = toCamelCase(`${operation}-${frontEndApiName}-${key}`);
    const url = value ? `${backEndApi}/${value}` : backEndApi;
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
        const defaultUrl = `${backEndApi}/${CRUD[operation]}`;
        defaultApi = { [defaultName]: defaultUrl };
      }

      const apiConfig = config[operation] || {};
      const customApis = createCustomApis(
        operation,
        {
          frontEndApiName,
          backEndApi
        },
        apiConfig
      );

      globalApis = Object.assign(globalApis, defaultApi, customApis);
    });

    return globalApis;
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
    const { indexPath, listPath, detailPath, listOptions, detailOptions } =
      options;
    return {
      path: indexPath || name,
      name: `${name}.index`,
      component: indexView,
      redirect: { name: `${name}.list` },
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

function install(app, options = {}) {
  const { crud } = options;

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

  app.config.globalProperties.$apiModel = apiModel;
  app.config.globalProperties.$routerModel = routerModel;
  app.provide('apiModel', apiModel);
  app.provide('routerModel', routerModel);
}

const $model = {
  install
};

const useApiModel = () => apiModel;
const useRouterModel = () => routerModel;

export default $model;
export { install, useApiModel, useRouterModel };
