```ts
type Operation = 'create' | 'read' | 'update' | 'delete';

interface CrudConfig {
  create?: string | { [key: string]: string };
  read?: string | { [key: string]: string };
  update?: string | { [key: string]: string };
  delete?: string | { [key: string]: string };
}

interface ApiConfig {
  crud: CrudConfig;
  formatApiAction: (frontEndApiName: string, operationName: string) => string;
}

interface GlobalApiConfig extends ApiConfig {
  urlToCamelCase?: boolean;
}

interface CustomApiConfig extends ApiConfig {
  ...CrudConfig
}

interface ApiModel {
  responseStatus: { [httpCodeName: string]: number };
  apis: { [apiName: string]: string };
  createApis: (
    frontEndApiName: string,
    backEndApi: string,
    operations: Operation[],
    config?: CustomApiConfig
  ) => { [apiName: string]: string };
  getApi: (
    frontEndApiName: string,
    operation: Operation,
    suffix?: string
  ) => string;
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
    name: string,
    components: RoutesComponents,
    options?: RoutesOptions
  ) => VueRoute[];
}
```

```ts
interface VueInstance {
  $apiModel: ApiModel;
  $routerModel: RouterModel;
}
```
