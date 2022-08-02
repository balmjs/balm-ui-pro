```ts
type ApiModelName = string;
type ApiEndpoint = string;
type Operation = 'create' | 'read' | 'update' | 'delete';
type ApiUrlSuffix = string;

interface CrudConfig {
  create?: string | { [key: string]: ApiUrlSuffix };
  read?: string | { [key: string]: ApiUrlSuffix };
  update?: string | { [key: string]: ApiUrlSuffix };
  delete?: string | { [key: string]: ApiUrlSuffix };
}

interface ApiConfig {
  crud?: CrudConfig;
  formatApiAction?: (frontEndApiName: ApiModelName, operationName: string) => string;
  urlToCamelCase?: boolean;
}

interface CustomApiConfig extends ApiConfig {
  ...CrudConfig
}
```

```ts
type ApiModelDefinition = [ApiModelName, ApiEndpoint, Operation[], CustomApiConfig];

interface GlobalApiConfig extends ApiConfig {
  apis: ApiModelDefinition[];,
  debug?: boolean | ApiModelName;
}
```
