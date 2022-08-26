```ts
type VueRoute = object;
type VueRouteOptions = object;

interface RouteOptions {
  namespace?: string;
  options?: VueRouteOptions;
}

interface RoutesOptions {
  // defaults
  namespace?: string;
  indexLeadingSlash?: boolean;
  indexPath?: string;
  indexView: object;
  indexRedirect?: string;
  indexOptions?: VueRouteOptions;
  // list component
  listPath?: string;
  listView?: object;
  listOptions?: VueRouteOptions;
  // detail component
  detailPath?: string;
  detailView?: object | object[];
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
  createRoutes: (name: ModelName, options: RoutesOptions) => VueRoute[];

  debug: (name?: ModelName, namespace?: boolean) => VueRoute | VueRoute[];
}

interface VueInstance {
  $routerModel: RouterModel;
}
```

### Use `$routerModel` without `.vue` component

```js
import { useRouterModel } from 'balm-ui-pro';
// OR
// import {  useRouterModel } from 'balm-ui-pro/plugins/router-model';
```
