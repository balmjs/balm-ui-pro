```html
<ui-form-view></ui-form-view>
```

### Props

| Name                 | Type                     | Default    | Description                                                                                                |
| -------------------- | ------------------------ | ---------- | ---------------------------------------------------------------------------------------------------------- |
| `modelValue`         | object                   | `{}`       | Form model data                                                                                            |
| `useSource`          | boolean                  | `false`    | Binding data source                                                                                        |
| `modelConfig`        | array, function, boolean | `required` | Form model config                                                                                          |
| `modelOptions`       | object                   | `{}`       | The extra options of the form model config                                                                 |
| `useGrid`            | boolean                  | `false`    | Enables layout grid for form items                                                                         |
| `formAttrOrProp`     | object                   | `{}`       | See BalmUI `<ui-form>` props [docs](https://v8.material.balmjs.com/#/layout/form)                          |
| `formItemAttrOrProp` | object                   | `{}`       | Form items' common attrs (e.g. `class`)                                                                    |
| `gridAttrOrProp`     | object                   | `{}`       | See BalmUI `<ui-grid>` props [docs](https://v8.material.balmjs.com/#/layout/grid)                          |
| `gridCellAttrOrProp` | object                   | `{}`       | See BalmUI `<ui-grid-cell>` props [docs](https://v8.material.balmjs.com/#/layout/grid)                     |
| `actionConfig`       | array                    | `[]`       | Form button config, see BalmUI `<ui-button>` props [docs](https://v8.material.balmjs.com/#/general/button) |
| `setModelOptionsFn`  | function, boolean        | `false`    | Form model options handler by the `model` list of form model config                                        |

- `modelConfig: FormItemConfig[] | (formData: object) => FormItemConfig[] | false`

  ```ts
  interface FormItemConfig {
    // Show all custom slots names and component event in console
    debug?: boolean;
    // Conditional Rendering
    if?: boolean;
    show?: boolean | (formData) => boolean;
    // Form label
    label?: string | (formData) => string;
    // Form data config
    key?: string;
    value?: string;
    // Form component config
    component?: string;
    components?: FormItemComponentConfig[];
    attrOrProp?: object;
    event?: string; // Defaults: 'change'
    model?: string; // For the options of the source data
    // Custom slot
    slot?: string;
    // BalmUI validator
    validator?: string;
    ...BalmUIValidationRule
  }

  interface FormItemComponentConfig {
    key?: string;
    value?: string;
    attrOrProp?: object;
    ...customAttrOrProp
  }
  ```

  > NOTE: see BalmUI [$validator docs](https://v8.material.balmjs.com/#/data-input/validator) for BalmUIValidationRule details

- `actionConfig: ActionButton[]`

  ```ts
  interface ActionButton {
    text: string;
    type?: 'button' | 'submit' | 'reset' | string;
    attrOrProp?: object;
  }
  ```

### Slots

| Name                                          | Props                               | Description                                                    |
| --------------------------------------------- | ----------------------------------- | -------------------------------------------------------------- |
| `before-form-view`                            | `itemClass`, `subitemClass`, `data` | Before form items                                              |
| custom form item slots (by form model config) | `config`, `data`                    | Custom form item slots (See all slots names by `config.debug`) |
| `after-form-view`                             | `itemClass`, `subitemClass`, `data` | After form items                                               |
| `form-view-actions`                           | `className`, `config`, `data`       | Custom form buttons                                            |

### Events

| Name       | Type                                   | Description |
| ---------- | -------------------------------------- | ----------- |
| `change`   | `function(modelValue: object)`         |             |
| `change:x` | `function(key: string, value: string)` |             |
| `action`   | `function(actionResult: ActionResult)` |             |

```ts
interface ActionResult {
  type: string; // ActionButton.type,
  ...validationResult?: BalmUIValidationResult
}
```

> NOTE: see BalmUI [$validator docs](https://v8.material.balmjs.com/#/data-input/validator) for BalmUIValidationResult details
