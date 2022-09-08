import getType from '../utils/typeof';

const NAME = '$routerModel';

function getRouteName(name, prefix = '', suffix = '') {
  const prefixName = prefix ? `${prefix}.` : '';
  const suffixName = suffix ? `.${suffix}` : '';
  return `${prefixName}${name}${suffixName}`;
}

function saveRoutesByNamespace(map, namespace, route) {
  const namespaceRoutes = map.has(namespace) ? map.get(namespace) : [];
  namespaceRoutes.push(route);
  map.set(namespace, namespaceRoutes);
}

function parseRoute(data, route, parent = false) {
  const { path, name, redirect, children, meta } = route;

  const currentRoute = data.find((item) => item.path === path);

  if (currentRoute) {
    currentRoute['parent name or children count'] = Array.isArray(children)
      ? children.length
      : parent;
    currentRoute.meta = meta ? JSON.stringify(meta) : false;
  } else {
    data.push({
      path,
      name,
      redirect: getType(redirect) === 'object' ? redirect.name : redirect,
      'parent name or children count': Array.isArray(children)
        ? children.length
        : parent,
      meta: meta ? JSON.stringify(meta) : false
    });
  }

  if (Array.isArray(children)) {
    children.forEach((subRoute) => parseRoute(data, subRoute, name));
  }
}

let globalRouterConfig = {};
let globalRoutes = [];

class RouterModel {
  constructor() {
    this.map = new Map();
    this.namespaceMap = new Map();
  }

  get routes() {
    return globalRoutes;
  }

  createRoute(path, name, component, options = {}) {
    const { namespace, ...routeOptions } = options;

    const routeName = getRouteName(name, namespace);
    const route = {
      path,
      name: routeName,
      component,
      ...routeOptions
    };

    this.map.has(routeName)
      ? console.warn(`[${NAME}]: Conflicting route definition - ${routeName}`)
      : this.map.set(routeName, route);

    saveRoutesByNamespace(this.namespaceMap, namespace, route);

    globalRoutes.push(route);

    return route;
  }

  createRoutes(name, options = {}) {
    const {
      namespace,
      // defaults
      indexLeadingSlash,
      indexPath,
      indexView,
      indexRedirect,
      indexOptions,
      // list component
      listPath,
      listView,
      listOptions,
      // detail component
      detailPath,
      detailView,
      detailOptions
    } = options;

    const children = [
      ...(listView
        ? [
            this.createRoute(
              listPath || 'list',
              getRouteName(name, namespace, 'list'),
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
              getRouteName(name, namespace, 'detail'),
              detailView,
              detailOptions || {}
            )
          ]
        : [])
    ];

    const parent = {
      path: indexPath || (indexLeadingSlash ? `/${name}` : name),
      name: getRouteName(name, namespace, 'index'),
      component: indexView,
      redirect: indexRedirect || {
        name: getRouteName(name, namespace, 'list')
      },
      children,
      ...(indexOptions || {})
    };

    const routes = indexView ? parent : children;

    this.map.has(name)
      ? console.warn(`[${NAME}]: Conflicting route definition - ${name}`)
      : this.map.set(name, routes);

    saveRoutesByNamespace(this.namespaceMap, namespace, parent);

    globalRoutes.push(routes);

    return routes;
  }

  debug(name = true, namespace = false) {
    let data = [];
    let routes = [];

    if (namespace) {
      if (this.namespaceMap.has(name)) {
        routes = this.namespaceMap.get(name);
        console.info(`[${NAME}]: Namespace Routes`);
      }
    } else {
      routes = name === true ? this.routes : this.map.get(name);
      console.info(`[${NAME}]: Model Routes`);
    }

    if (routes) {
      if (!Array.isArray(routes)) {
        routes = [routes];
      }

      if (routes.length) {
        routes.forEach((route) => {
          parseRoute(data, route);
        });
        console.table(data);
      }
    }
  }
}

const routerModel = new RouterModel();

function install(app, options = {}) {
  const { debug, namespace } = options;

  debug && routerModel.debug(debug, namespace || false);

  app.config.globalProperties.$routerModel = routerModel;
  app.provide('routerModel', routerModel);
}

const $routerModel = {
  install
};

const useRouterModel = () => routerModel;

export default $routerModel;
export { install, useRouterModel };
