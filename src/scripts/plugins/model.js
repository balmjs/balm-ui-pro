import getType from '../utils/typeof';
import { toCamelCase } from '../utils/helpers';

const CRUD = {
  list: 'list',
  detail: 'detail',
  create: 'create',
  update: 'update',
  delete: 'delete'
};
const CRUD_KEYS = Object.keys(CRUD);

class ApiModel {
  createApis(frontEndApiName, backEndApi, apis = {}, config = {}) {
    let crudConfig = CRUD;
    if (getType(config.crud) === 'object') {
      if (Object.keys(config.crud).every((key) => CRUD_KEYS.includes(key))) {
        crudConfig = Object.assign({}, CRUD, config.crud);
      } else {
        console.error('Invalid CRUD config', config.crud);
      }
    }

    const crudEntries = [];
    for (const [key, value] of Object.entries(crudConfig)) {
      if (
        Array.isArray(config.exclude) &&
        config.exclude.length &&
        config.exclude.includes(key)
      ) {
        continue;
      }

      if (key === CRUD.list || key === CRUD.detail) {
        crudEntries.push([
          toCamelCase(`get-${frontEndApiName}-${key}`),
          `${backEndApi}/${value}`
        ]);
      } else {
        // create, update, delete
        crudEntries.push([
          toCamelCase(`${key}-${frontEndApiName}`),
          `${backEndApi}/${value}`
        ]);
      }
    }
    const entries = new Map(crudEntries);
    const crudApis = Object.fromEntries(entries);

    let extraApis = {};
    if (Object.keys(apis).length) {
      for (const [key, value] of Object.entries(apis)) {
        extraApis[key] = `${backEndApi}/${value}`;
      }
    }

    return Object.assign({}, crudApis, extraApis);
  }

  getApiName(model, type) {
    return [CRUD.create, CRUD.update, CRUD.delete].includes(type)
      ? toCamelCase(`${type}-${model}`)
      : toCamelCase(`get-${model}-${type}`);
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

  createViewRoutes(name, { BlankView, ListView, DetailView }, options = {}) {
    const { listPath, detailPath, listOptions } = options;
    return {
      path: name,
      name: `${name}.index`,
      component: BlankView,
      redirect: { name: `${name}.${CRUD.list}` },
      children: [
        ...(ListView
          ? [
              this.createRoute(
                listPath || CRUD.list,
                `${name}.${CRUD.list}`,
                ListView,
                listOptions
              )
            ]
          : []),
        ...(Array.isArray(DetailView)
          ? DetailView
          : DetailView
          ? [
              this.createRoute(
                detailPath || ':id?',
                `${name}.${CRUD.detail}`,
                DetailView
              )
            ]
          : [])
      ]
    };
  }
}

const apiModel = new ApiModel();
const routerModel = new RouterModel();

function install(Vue) {
  Vue.prototype.$apiModel = apiModel;
  Vue.prototype.$routerModel = routerModel;
}

const $model = {
  install
};

const useModel = (name) =>
  ['api', 'router'].includes(name)
    ? [`${name}Model`]
    : console.error('[$model]: Invalid model name');

export default $model;
export { install, useModel };
