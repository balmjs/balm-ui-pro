```html
<ui-table-view></ui-table-view>
```

### Props

- Search actions

  ```js
  interface SearchActionButton {
    text: string;
    type?: 'button' | 'submit' | 'reset' | string;
    attrOrProp?: object;
  }

  const DefaultSearchActionConfig: SearchActionButton[] = [
    {
      type: 'reset',
      text: 'Reset',
      attrOrProp: {
        outlined: true
      }
    },
    {
      type: 'submit', // required for `useValidator`
      text: 'Search',
      attrOrProp: {
        raised: true
      }
    }
  ];
  ```

- Top bar actions

  ```ts
  interface TopbarActionButton {
    type: 'router-link' | string;
    icon?: string;
    text: string;
    routeName?: string;
    attrOrProp?: object;
  }

  type TopbarHandler = (
    action: TopbarActionButton,
    data: {
      defaultParams: object;
      selectedRows: string[];
      tableData: object[];
      searchFormData: object;
    },
    refresh: Function
  ) => void;
  ```

- Table cell actions

  ```ts
  interface ActionButton {
    type: 'router-link' | 'no-slot' | string;
    if?: boolean | (data: object) => boolean;
    show?: boolean | (data: object) => boolean;
    icon?: string;
    text: string;
    routeName?: string;
    routeParams?: (data: object) => {};
    href?: string;
    attrOrProp?: object;
    component?: string;
  }

  type ActionHandler = (
    action: ActionButton,
    data: {
      model: string;
      keyName: string;
      data: object;
    },
    refresh: Function
  ) => void;
  ```

| Name                   | Type     | Default                                         | Description                                                                                                       |
| ---------------------- | -------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `title`                | string   | `''`                                            | Detail view title                                                                                                 |
| `model`                | string   | `''`                                            | Model name                                                                                                        |
| `modelPath`            | string   | `''`                                            | The file path of model config                                                                                     |
| `modelOptions`         | object   | `{}`                                            | The options of model config                                                                                       |
| `keyName`              | string   | `'id'`                                          | The primary key of model data                                                                                     |
| `defaultParams`        | object   | `{}`                                            | The default params of detail view                                                                                 |
| `searchActionConfig`   | array    | `DefaultSearchActionConfig`                     | Search form button config, see BalmUI `<ui-button>` props [docs](https://v8.material.balmjs.com/#/general/button) |
| `formViewAttrOrProp`   | object   | `{ formAttrOrProp: { actionAlign: 'center' } }` | See `<ui-form-view>` props [docs](/#/components/form-view)                                                        |
| `noData`               | string   | `No Data`                                       | No data message                                                                                                   |
| `thead`                | array    | `[]`                                            | Table header renderer, see BalmUI `<ui-table>` props [docs](https://v8.material.balmjs.com/#/data-display/table)  |
| `tbody`                | array    | `[]`                                            | Table content renderer, see BalmUI `<ui-table>` props [docs](https://v8.material.balmjs.com/#/data-display/table) |
| `actionConfig`         | array    | `ActionButton[]`                                | Table cell button config, see BalmUI `<ui-button>` props [docs](https://v8.material.balmjs.com/#/general/button)  |
| `actionHandler`        | function | `() => {}`                                      | Table cell button handler                                                                                         |
| `actionRendering`      | function | `(action: object, data: object) => true`        | Table cell button rendering handler by server-side                                                                |
| `topbarConfig`         | array    | `TopbarActionButton[]`                          | Topbar button config, see BalmUI `<ui-button>` props [docs](https://v8.material.balmjs.com/#/general/button)      |
| `topbarHandler`        | function | `() => {}`                                      | Topbar button handler                                                                                             |
| `topbarRendering`      | function | `(action: object, tableData: object) => true`   | Topbar button rendering handler by server-side                                                                    |
| `tableAttrOrProp`      | object   | `{}`                                            | See BalmUI `<ui-table>` props [docs](https://v8.material.balmjs.com/#/data-display/table)                         |
| `tableDataFormat`      | object   | `{ data: 'data', total: 'total' }`              | Defines the table data format for API                                                                             |
| `pageSize`             | number   | `10`                                            | Default page size                                                                                                 |
| `paginationAttrOrProp` | object   | `{}`                                            | See BalmUI `<ui-pagination>` props [docs](https://v8.material.balmjs.com/#/navigation/pagination)                 |
| `withoutPagination`    | boolean  | `false`                                         | No pagination                                                                                                     |
| `getModelConfigFn`     | function | `(vm) => {}`                                    | Loading model config                                                                                              |
| `getModelDataFn`       | function | `(vm) => {}`                                    | Loading model data                                                                                                |
| `useValidator`         | boolean  | `false`                                         | Enables auto validator                                                                                            |
