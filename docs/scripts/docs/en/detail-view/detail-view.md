```html
<ui-detail-view></ui-detail-view>
```

### Props

```ts
interface DetailViewData {
  title: string;
  model: string;
  modelAction: string;
  modelPath: string;
  modelOptions: object;
  modelValueDefaults: object;
  keyName: string;
  refreshData: Function;
  detailData: object;
  detailDataSource: object;
}

interface ActionData extends DetailViewData {
  ...BalmUIValidationResult
}

interface ActionButton {
  text: string;
  type?: 'button' | 'submit' | 'reset' | string;
  attrOrProp?: object;
  handler?: (actionConfig: ActionButton, data: ActionData) => void;
  submit?: false // Just for custom `submit` type
}

const DefaultActionConfig: ActionButton[] = [
  {
    type: 'cancel',
    text: 'Cancel',
    attrOrProp: {
      outlined: true
    }
  },
  {
    type: 'submit',
    text: 'Save',
    attrOrProp: {
      raised: true
    }
  }
];
```

| Name                 | Type                             | Default               | Description                                                                                                |
| -------------------- | -------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------- |
| `title`              | string                           | `''`                  | Detail view title                                                                                          |
| `model`              | string                           | _required_            | Model name                                                                                                 |
| `modelAction`        | string                           | `''`                  | Api model action suffix                                                                                    |
| `modelConfig`        | ModelConfig                      | `false`               | Form model config, see `<ui-form-view>` props [docs](/#/components/form-view)                              |
| `modelPath`          | string                           | `''`                  | The file path of model config                                                                              |
| `modelOptions`       | object                           | `{}`                  | The options of model config                                                                                |
| `modelValueDefaults` | object                           | `{}`                  | Sets default value of model data                                                                           |
| `keyName`            | string, array                    | `'id'`                | The primary key of model data                                                                              |
| `actionConfig`       | array                            | `DefaultActionConfig` | Form button config, see BalmUI `<ui-button>` props [docs](https://v8.material.balmjs.com/#/general/button) |
| `formViewAttrOrProp` | object                           | `{}`                  | See `<ui-form-view>` props [docs](/#/components/form-view)                                                 |
| `to`                 | object, string, 'back', 'custom' | `''`                  | The custom router link after saving model data                                                             |
| `replace`            | boolean                          | `false`               | The navigation will not leave a history record                                                             |
| `getModelConfigFn`   | function                         | `(vm) => {}`          | Loading model config                                                                                       |
| `getModelDataFn`     | function                         | `(vm) => {}`          | Loading model data                                                                                         |
| `setModelDataFn`     | function                         | `(vm) => {}`          | Saving model data                                                                                          |
| `useValidator`       | boolean                          | `true`                | Enables auto validator (Just for `submit` type)                                                            |
| `redirectOnSave`     | boolean                          | `true`                | The page will auto redirect after saving model data                                                        |

### Slots

| Name                                          | Props                                       | Description            |
| --------------------------------------------- | ------------------------------------------- | ---------------------- |
| `detail-view-title`                           |                                             | Detail view title      |
| `before-detail-view`                          | DetailViewData                              | Before detail view     |
| custom form item slots (by form model config) | `config`, `data`, `originalData`, `refresh` | Custom form item slots |
| `after-detail-view`                           | DetailViewData                              | After detail view      |

### Events

| Name       | Type                                                         | Description                                    |
| ---------- | ------------------------------------------------------------ | ---------------------------------------------- |
| `change:x` | `function(key: string, value: string, data: DetailViewData)` | Emits when the detail form item is changed.    |
| `action`   | `function(actionConfig: ActionButton, data: ActionData)`     | Emits when the detail view actions is clicked. |
