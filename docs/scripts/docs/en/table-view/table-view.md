```html
<ui-table-view></ui-table-view>
```

```ts
interface ActionData {
  model: string;
  modelOptions: object;
  keyName: string | string[];
}
```

- Search actions

  ```js
  interface SearchActionData extends ActionData {
    ...$data?: TableViewData,
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
    ...$data?: TableViewData
  }

  interface TopActionButton {
    type: 'router-link' | string;
    icon?: string;
    text: string;
    routeName?: string;
    attrOrProp?: object;
    handler?: (
      data: TopActionData,
      refresh: Function
    ) => void;
  }

  type GlobalTopActionHandler = (
    actionConfig: TopActionButton,
    data: TopActionData,
    refresh: Function
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
    routeName?: string;
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

| Name                   | Type          | Default                            | Description                                                                                                    |
| ---------------------- | ------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `title`                | string        | `''`                               | Detail view title                                                                                              |
| `model`                | string        | _required_                         | Model name                                                                                                     |
| `modelAction`          | string        | `''`                               | Api model action suffix                                                                                        |
| `modelConfig`          | ModelConfig   | `false`                            | Form model config, see `<ui-form-view>` props [docs](/components/form-view)                                    |
| `modelPath`            | string        | `''`                               | The file path of model config                                                                                  |
| `modelOptions`         | object        | `{}`                               | The options of model config                                                                                    |
| `modelValueDefaults`   | object        | `{}`                               | Sets default value of model data                                                                               |
| `keyName`              | string, array | `'id'`                             | The primary key of model data                                                                                  |
| `searchActionConfig`   | array         | `DefaultSearchActionConfig`        | Search form button config, see BalmUI `<ui-button>` props [docs](https://material.balmjs.com/general/button)   |
| `formViewAttrOrProp`   | object        | `{}`                               | See `<ui-form-view>` props [docs](/components/form-view)                                                       |
| `noData`               | string        | `No Data`                          | No data message                                                                                                |
| `thead`                | array         | `[]`                               | Table header renderer, see BalmUI `<ui-table>` props [docs](https://material.balmjs.com/data-display/table)    |
| `tbody`                | array         | `[]`                               | Table content renderer, see BalmUI `<ui-table>` props [docs](https://material.balmjs.com/data-display/table)   |
| `rowActionConfig`      | array         | `RowActionButton[]`                | Table cell button config, see BalmUI `<ui-button>` props [docs](https://material.balmjs.com/general/button)    |
| `rowActionHandler`     | function      | `GlobalRowActionHandler`           | Table cell button handler                                                                                      |
| `rowActionRendering`   | function      | `() => true`                       | Table cell button rendering handler by server-side                                                             |
| `topActionConfig`      | array         | `TopActionButton[]`                | Table top bar button config, see BalmUI `<ui-button>` props [docs](https://material.balmjs.com/general/button) |
| `topActionHandler`     | function      | `GlobalTopActionHandler`           | Table top bar button handler                                                                                   |
| `topActionRendering`   | function      | `() => true`                       | Table top bar button rendering handler by server-side                                                          |
| `tableAttrOrProp`      | object        | `{}`                               | See BalmUI `<ui-table>` props [docs](https://material.balmjs.com/data-display/table)                           |
| `tableDataFormat`      | object        | `{ data: 'data', total: 'total' }` | Defines the table data format for API                                                                          |
| `pageSize`             | number        | `10`                               | Default page size                                                                                              |
| `paginationAttrOrProp` | object        | `{}`                               | See BalmUI `<ui-pagination>` props [docs](https://material.balmjs.com/navigation/pagination)                   |
| `withoutPagination`    | boolean       | `false`                            | No pagination                                                                                                  |
| `getModelConfigFn`     | function      | `(vm) => {}`                       | Loading model config                                                                                           |
| `getModelDataFn`       | function      | `(vm) => {}`                       | Loading model data                                                                                             |
| `useValidator`         | boolean       | `false`                            | Enables auto validator (Just for `submit` type)                                                                |
| `searchOnReset`        | boolean       | `false`                            | The page will auto search data after resetting model data                                                      |

### Slots

| Name                                                 | Props                            | Description                                                                                  |
| ---------------------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------- |
| `title`                                              |                                  | Table view title                                                                             |
| custom search form item slots (by form model config) | `config`, `data`                 | Custom search form item slots                                                                |
| `topbar`                                             |                                  | Custom table topbar (When `topbarConfig = []`)                                               |
| `before-table-view`                                  |                                  | Before table view                                                                            |
| custom table slots                                   |                                  | See BalmUI `<ui-table>` slots [docs](https://material.balmjs.com/data-display/table)         |
| `actions`                                            |                                  | Custom table cell actions (When `actionConfig = []`)                                         |
| custom pagination slots                              | `currentMinRow`, `currentMaxRow` | See BalmUI `<ui-pagination>` slots [docs](https://material.balmjs.com/navigation/pagination) |
| `empty`                                              |                                  | Custom table no data                                                                         |
| `after-table-view`                                   |                                  | After table view                                                                             |

### Events

| Name       | Type                                                                                    | Description                                   |
| ---------- | --------------------------------------------------------------------------------------- | --------------------------------------------- |
| `update:x` | `function(key: string, value: string, refresh: Function)`                               | Emits when the search form item is changed.   |
| `action`   | `function(actionConfig: SearchActionButton, data: SearchActionData, refresh: Function)` | Emits when the table view actions is clicked. |
