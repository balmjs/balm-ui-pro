const NAME = '$routerModel';

function getRouteName(name, namespace) {
  return namespace ? `${namespace}.${name}` : name;
}

function saveRoutesByNamespace(map, namespace, route) {
  const namespaceRoutes = map.has(namespace) ? map.get(namespace) : [];
  namespaceRoutes.push(route);
  map.set(namespace, namespaceRoutes);
}

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

    const parent = {
      path: indexPath || name,
      name: getRouteName(`${name}.index`, namespace),
      component: indexView,
      redirect: indexRedirect || {
        name: getRouteName(`${name}.list`, namespace)
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
    if (namespace) {
      this.namespaceMap.has(name) &&
        console.info(
          `[${NAME}]: Namespace Routes`,
          this.namespaceMap.get(name)
        );
    } else {
      console.info(
        `[${NAME}]: Model Routes`,
        name === true ? this.routes : this.map.get(name)
      );
    }
  }
}

const routerModel = new RouterModel();

function install(Vue, options = {}) {
  Vue.prototype.$routerModel = routerModel;
}

const $routerModel = {
  install
};

const useRouterModel = () => routerModel;

export default $routerModel;
export { useRouterModel };
