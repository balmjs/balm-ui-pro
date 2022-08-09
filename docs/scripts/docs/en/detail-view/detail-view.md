```html
<ui-detail-view></ui-detail-view>
```

### Props

```js
interface ActionButton {
  text: string;
  type?: 'button' | 'submit' | 'reset' | string;
  attrOrProp?: object;
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
    type: 'submit', // required for `useValidator`
    text: 'Save',
    attrOrProp: {
      raised: true
    }
  }
];
```

| Name                 | Type                    | Default                                         | Description                                                                                                |
| -------------------- | ----------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `title`              | string                  | `''`                                            | Detail view title                                                                                          |
| `model`              | string                  | _required_                                      | Model name                                                                                                 |
| `modelPath`          | string                  | `''`                                            | The file path of model config                                                                              |
| `modelOptions`       | object                  | `{}`                                            | The options of model config                                                                                |
| `keyName`            | string, array           | `'id'`                                          | The primary key of model data                                                                              |
| `actionConfig`       | array                   | `DefaultActionConfig`                           | Form button config, see BalmUI `<ui-button>` props [docs](https://v8.material.balmjs.com/#/general/button) |
| `formViewAttrOrProp` | object                  | `{ formAttrOrProp: { actionAlign: 'center' } }` | See `<ui-form-view>` props [docs](/#/components/form-view)                                                 |
| `to`                 | boolean, object, string | `false`                                         | Custom router link                                                                                         |
| `replace`            | boolean                 | `false`                                         | The navigation will not leave a history record                                                             |
| `getModelConfigFn`   | function                | `(vm) => {}`                                    | Loading model config                                                                                       |
| `getModelDataFn`     | function                | `(vm) => {}`                                    | Loading model data                                                                                         |
| `setModelDataFn`     | function                | `(vm) => {}`                                    | Saving model data                                                                                          |
| `useValidator`       | boolean                 | `true`                                          | Enables auto validator                                                                                     |
| `redirectOnSave`     | boolean                 | `true`                                          | The page will auto redirect after saving model data                                                        |

### Slots

| Name                                          | Props            | Description            |
| --------------------------------------------- | ---------------- | ---------------------- |
| `title`                                       |                  | Detail view title      |
| `before-detail-view`                          |                  | Before detail view     |
| custom form item slots (by form model config) | `config`, `data` | Custom form item slots |
| `after-detail-view`                           |                  | After detail view      |

### Events

| Name     | Type                                               | Description                                                            |
| -------- | -------------------------------------------------- | ---------------------------------------------------------------------- |
| `cancel` | `void`                                             | (The prop `to` is `'custom'`) Emits when the cancel button is clicked. |
| `submit` | `function(actionResult: ActionResult, vm: object)` | Emits when the submit button is clicked.                               |

```ts
interface ActionResult {
  type: string; // ActionButton.type,
  ...validationResult?: BalmUIValidationResult
}
```
