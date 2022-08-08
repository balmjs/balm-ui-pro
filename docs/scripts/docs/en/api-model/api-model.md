```ts
interface VueInstance {
  $apiModel: ApiModel;
}
```

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

  debug: (name?: ModelName) => { [apiName: string]: ApiUrl };
}
```

### Use `$apiModel` without `.vue` component

```js
import { useApiModel } from 'balm-ui-pro';
// OR
// import { useApiModel } from 'balm-ui-pro/plugins/api-model';
```
