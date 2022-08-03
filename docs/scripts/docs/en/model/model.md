```ts
interface VueInstance {
  $apiModel: ApiModel;
  $routerModel: RouterModel;
}
```

- `$apiModel`

  ```ts
  type ApiUrl = string;

  interface ApiModel {
    responseStatus: { [httpCodeName: string]: number };
    apis: { [apiName: string]: ApiUrl };

    createApis: (
      frontEndApiName: ModelName,
      backEndApi: ApiEndpoint,
      operations: Operation[],
      config?: CustomApiConfig
    ) => { [apiName: string]: ApiUrl };
    getApi: (
      frontEndApiName: ModelName,
      operation: Operation,
      actionSuffix?: string
    ) => ApiUrl;
  }
  ```

- `$routerModel`

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
  }
  ```

### Use `$apiModel` or `$routerModel` without `.vue` component

```js
import { useApiModel, useRouterModel } from 'balm-ui-pro';
// OR
// import { useApiModel, useRouterModel } from 'balm-ui-pro/plugins/model';
```
