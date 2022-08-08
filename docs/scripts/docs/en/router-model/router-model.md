```ts
interface VueInstance {
  $routerModel: RouterModel;
}
```

```ts
type VueRoute = object;
type VueRouteOptions = object;

interface RouteOptions {
  namespace?: string;
  options?: VueRouteOptions;
}

interface RoutesComponents {
  indexView: object;
  listView?: object;
  detailView?: object | object[];
}

interface RoutesOptions {
  namespace?: string;
  indexPath?: string;
  indexRedirect?: string;
  indexOptions?: VueRouteOptions;
  listPath?: string;
  listOptions?: VueRouteOptions;
  detailPath?: string;
  detailOptions?: VueRouteOptions;
}

interface RouterModel {
  routes: VueRoute[];

  createRoute: (
    path: string,
    name: string,
    component: object,
    options?: routeOptions
  ) => VueRoute;
  createRoutes: (
    name: ModelName,
    components: RoutesComponents,
    options?: RoutesOptions
  ) => VueRoute[];

  debug: (name?: ModelName, namespace?: boolean) => VueRoute | VueRoute[];
}
```

### Use `$routerModel` without `.vue` component

```js
import { useRouterModel } from 'balm-ui-pro';
// OR
// import {  useRouterModel } from 'balm-ui-pro/plugins/router-model';
```
