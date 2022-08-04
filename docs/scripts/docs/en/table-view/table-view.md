```html
<ui-table-view></ui-table-view>
```

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
  type TopbarData = {
    defaultParams: object;
    selectedRows: string[];
    tableData: object[];
    searchFormData: object;
  };
  type RefreshFn = function;
  ```

  ```ts
  interface TopbarActionButton {
    type: 'router-link' | string;
    icon?: string;
    text: string;
    routeName?: string;
    attrOrProp?: object;
    handler?: (data: TopbarData, refresh: RefreshFn) => void;
  }

  type GlobalTopbarHandler = (
    action: TopbarActionButton,
    data: TopbarData,
    refresh: RefreshFn
  ) => void;
  ```

- Table cell actions

  ```ts
  type CellData = {
    model: string;
    keyName: string;
    data: object;
  };
  type RefreshFn = function;
  ```

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
    component?: string;,
    handler?: (
      data: CellData,
      refresh: RefreshFn
    ) => void;
  }

  type GlobalActionHandler = (
    action: ActionButton,
    data: CellData,
    refresh: RefreshFn
  ) => void;
  ```

### Props

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
| `actionHandler`        | function | `GlobalActionHandler`                           | Table cell button handler                                                                                         |
| `actionRendering`      | function | `() => true`                                    | Table cell button rendering handler by server-side                                                                |
| `topbarConfig`         | array    | `TopbarActionButton[]`                          | Topbar button config, see BalmUI `<ui-button>` props [docs](https://v8.material.balmjs.com/#/general/button)      |
| `topbarHandler`        | function | `GlobalTopbarHandler`                           | Topbar button handler                                                                                             |
| `topbarRendering`      | function | `() => true`                                    | Topbar button rendering handler by server-side                                                                    |
| `tableAttrOrProp`      | object   | `{}`                                            | See BalmUI `<ui-table>` props [docs](https://v8.material.balmjs.com/#/data-display/table)                         |
| `tableDataFormat`      | object   | `{ data: 'data', total: 'total' }`              | Defines the table data format for API                                                                             |
| `pageSize`             | number   | `10`                                            | Default page size                                                                                                 |
| `paginationAttrOrProp` | object   | `{}`                                            | See BalmUI `<ui-pagination>` props [docs](https://v8.material.balmjs.com/#/navigation/pagination)                 |
| `withoutPagination`    | boolean  | `false`                                         | No pagination                                                                                                     |
| `getModelConfigFn`     | function | `(vm) => {}`                                    | Loading model config                                                                                              |
| `getModelDataFn`       | function | `(vm) => {}`                                    | Loading model data                                                                                                |
| `useValidator`         | boolean  | `false`                                         | Enables auto validator                                                                                            |

### Slots

| Name                                                 | Props                            | Description                                                                                       |
| ---------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------- |
| `title`                                              |                                  | Table view title                                                                                  |
| custom search form item slots (by form model config) | `config`, `data`                 | Custom search form item slots                                                                     |
| `topbar`                                             |                                  | Custom table topbar (When `topbarConfig = []`)                                                    |
| `before-table-view`                                  |                                  | Before table view                                                                                 |
| custom table slots                                   |                                  | See BalmUI `<ui-table>` slots [docs](https://v8.material.balmjs.com/#/data-display/table)         |
| `actions`                                            |                                  | Custom table cell actions (When `actionConfig = []`)                                              |
| custom pagination slots                              | `currentMinRow`, `currentMaxRow` | See BalmUI `<ui-pagination>` slots [docs](https://v8.material.balmjs.com/#/navigation/pagination) |
| `empty`                                              |                                  | Custom table no data                                                                              |
| `after-table-view`                                   |                                  | After table view                                                                                  |

### Events

| Name     | Type                                               | Description                              |
| -------- | -------------------------------------------------- | ---------------------------------------- |
| `reset`  | `function(vm: object)`                             | Emits when the reset button is clicked.  |
| `submit` | `function(actionResult: ActionResult, vm: object)` | Emits when the submit button is clicked. |

```ts
interface ActionResult {
  type: string; // ActionButton.type,
  ...validationResult?: BalmUIValidationResult
}
```
