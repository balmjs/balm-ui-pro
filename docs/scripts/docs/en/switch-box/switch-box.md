```html
<ui-switch-box></ui-switch-box>
```

### Props

| Name               | Type                    | Default                              | Description                                                                                                                      |
| ------------------ | ----------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `config`           | object                  | `{}`                                 | Form item config                                                                                                                 |
| `formData`         | object                  | `{}`                                 | Form model data                                                                                                                  |
| `formDataSource`   | object                  | `{}`                                 | Form model data source                                                                                                           |
| `optionFormat`     | object                  | `{ label: 'label', value: 'value' }` | Defines the option data format                                                                                                   |
| `modelValue`       | boolean, string, number | `false`                              | The model value of the switch box                                                                                                |
| `options`          | array                   | `[]`                                 | The model options of the switch box                                                                                              |
| `switchAttrOrProp` | object                  | `{}`                                 | The attrs or props of the switch component, see BalmUI `<ui-switch>` props [docs](https://material.balmjs.com/data-input/switch) |

### Events

| Name                | Type                                           | Description                                 |
| ------------------- | ---------------------------------------------- | ------------------------------------------- |
| `update:modelValue` | `function(value: boolean \| string \| number)` | Emits when the switch box value is changed. |
