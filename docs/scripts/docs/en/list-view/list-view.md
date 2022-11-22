```html
<ui-list-view></ui-list-view>
```

```ts
interface ActionData {
  model: string;
  modelOptions: object;
  keyName: string | string[];
}

interface ListViewData {
  title: string;
  model: string;
  modelAction: string;
  modelPath: string;
  modelOptions: object;
  modelValueDefaults: object;
  keyName: string;
  refreshData: Function;
  searchForm: object;
  listData: object;
  listDataSource: object;
}
```

- Search actions

  ```js
  interface SearchActionData extends ActionData {
    ...$data?: ListViewData,
    ...validationResult?: BalmUIValidationResult
  }

  interface SearchActionButton {
    text: string;
    type?: 'button' | 'submit' | 'reset' | string;
    attrOrProp?: object;
    handler?: (
      actionConfig: SearchActionButton,
      data: SearchActionData,
      refresh: Function
    ) => void;
    submit?: false; // Just for custom `submit` type
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
      type: 'submit',
      text: 'Search',
      attrOrProp: {
        raised: true
      }
    }
  ];
  ```

- Top bar actions

  ```ts
  interface TopActionData extends ActionData {
    ...$data?: ListViewData
  }

  interface TopActionButton {
    if?: boolean | (dataSource: object) => boolean;
    type: 'router-link' | string;
    icon?: string;
    text: string;
    routeName?: string | (data: object) => string;
    attrOrProp?: object;
    handler?: (
      data: TopActionData,
      refresh: Function,
      resetSelectedRows: Function
    ) => void;
  }

  type GlobalTopActionHandler = (
    actionConfig: TopActionButton,
    data: TopActionData,
    refresh: Function,
    resetSelectedRows: Function
  ) => void;
  ```

- Table row actions

  ```ts
  interface RowActionData extends ActionData {
    data: object;
  }
  ```

  ```ts
  interface RowActionButton {
    if?: boolean | (data: object) => boolean;
    show?: boolean | (data: object) => boolean;
    type: 'router-link' | 'no-slot' | string;
    component?: string;
    icon?: string;
    text: string;
    routeName?: string | (data: object) => string;
    routeParams?: (data: object) => {};
    href?: string;
    attrOrProp?: object;
    handler?: (
      data: RowActionData,
      refresh: Function
    ) => void;
  }

  type GlobalRowActionHandler = (
    actionConfig: RowActionButton,
    data: RowActionData,
    refresh: Function
  ) => void;
  ```

### Props

| Name                   | Type          | Default                            | Description                                                                                                                   |
| ---------------------- | ------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `title`                | string        | `''`                               | Detail view title                                                                                                             |
| `model`                | string        | _required_                         | Model name                                                                                                                    |
| `modelAction`          | string        | `''`                               | Api model action suffix                                                                                                       |
| `modelConfig`          | ModelConfig   | `false`                            | Form model config, see `<ui-form-view>` props [docs](/components/form-view)                                                   |
| `modelPath`            | string        | `''`                               | The file path of model config                                                                                                 |
| `modelOptions`         | object        | `{}`                               | The options of model config                                                                                                   |
| `modelValueDefaults`   | object        | `{}`                               | Sets default value of model data                                                                                              |
| `keyName`              | string, array | `'id'`                             | The primary key of model data                                                                                                 |
| `searchActionConfig`   | array         | `DefaultSearchActionConfig`        | Search form button config, see BalmUI `<ui-button>` props [docs](https://material.balmjs.com/general/button)                  |
| `formViewAttrOrProp`   | object        | `{}`                               | See `<ui-form-view>` props [docs](/components/form-view)                                                                      |
| `noData`               | string        | `No Data`                          | No data message                                                                                                               |
| `thead`                | array         | `[]`                               | Table header renderer, see BalmUI `<ui-table>` props [docs](https://material.balmjs.com/data-display/table)                   |
| `tbody`                | array         | `[]`                               | Table content renderer, see BalmUI `<ui-table>` props [docs](https://material.balmjs.com/data-display/table)                  |
| `rowActionConfig`      | array         | `RowActionButton[]`                | Table cell button config, see BalmUI `<ui-button>` props [docs](https://material.balmjs.com/general/button)                   |
| `rowActionHandler`     | function      | `GlobalRowActionHandler`           | Table cell button handler                                                                                                     |
| `rowActionRendering`   | function      | `() => true`                       | Table cell button rendering handler by server-side                                                                            |
| `topActionConfig`      | array         | `TopActionButton[]`                | Table top bar button config, see BalmUI `<ui-button>` props [docs](https://material.balmjs.com/general/button)                |
| `topActionHandler`     | function      | `GlobalTopActionHandler`           | Table top bar button handler                                                                                                  |
| `topActionRendering`   | function      | `() => true`                       | Table top bar button rendering handler by server-side                                                                         |
| `topActionIconFormat`  | object        | `{}`                               | Defines the table top bar button format for the button icons, see BalmUI icons [docs](https://v8.material.balmjs.com/#/icons) |
| `tableAttrOrProp`      | object        | `{}`                               | See BalmUI `<ui-table>` props [docs](https://material.balmjs.com/data-display/table)                                          |
| `tableDataFormat`      | object        | `{ data: 'data', total: 'total' }` | Defines the table data format for API                                                                                         |
| `pageSize`             | number        | `10`                               | Default page size                                                                                                             |
| `paginationAttrOrProp` | object        | `{}`                               | See BalmUI `<ui-pagination>` props [docs](https://material.balmjs.com/navigation/pagination)                                  |
| `withoutPagination`    | boolean       | `false`                            | No pagination                                                                                                                 |
| `getModelConfigFn`     | function      | `(vm) => {}`                       | Loading model config                                                                                                          |
| `getModelDataFn`       | function      | `(vm) => {}`                       | Loading model data                                                                                                            |
| `useValidator`         | boolean       | `false`                            | Enables auto validator (Just for `submit` type)                                                                               |
| `placeholder`          | string        | `''`                               | The placeholder before searching model data                                                                                   |
| `searchOnReset`        | boolean       | `false`                            | The page will auto search data after resetting model data                                                                     |

### Slots

| Name                                                 | Props                            | Description                                                                                  |
| ---------------------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------- |
| `list-view-title`                                    |                                  | List view title                                                                              |
| custom search form item slots (by form model config) | `config`, `data`                 | Custom search form item slots                                                                |
| `list-view-top-actions`                              | instanceData                     | Custom list top bar actions (When `topbarConfig = []`)                                       |
| `before-list-view`                                   | instanceData                     | Before list view                                                                             |
| `list-view-placeholder`                              |                                  | The placeholder before searching model data                                                  |
| `list-view-content`                                  | instanceData                     | Custom list view content                                                                     |
| custom table slots                                   | rowData                          | See BalmUI `<ui-table>` slots [docs](https://material.balmjs.com/data-display/table)         |
| `list-view-row-actions`                              | rowData                          | Custom table cell actions (When `actionConfig = []`)                                         |
| custom pagination slots                              | `currentMinRow`, `currentMaxRow` | See BalmUI `<ui-pagination>` slots [docs](https://material.balmjs.com/navigation/pagination) |
| `list-view-empty`                                    |                                  | Custom no data for list view                                                                 |
| `after-list-view`                                    | instanceData                     | After list view                                                                              |

### Events

| Name       | Type                                                                                    | Description                                  |
| ---------- | --------------------------------------------------------------------------------------- | -------------------------------------------- |
| `update:x` | `function(key: string, value: string, refresh: Function)`                               | Emits when the search form item is changed.  |
| `action`   | `function(actionConfig: SearchActionButton, data: SearchActionData, refresh: Function)` | Emits when the list view actions is clicked. |
