```html
<ui-checkbox-group></ui-checkbox-group>
```

### Props

| Name             | Type   | Default                              | Description                             |
| ---------------- | ------ | ------------------------------------ | --------------------------------------- |
| `config`         | object | `{}`                                 | Form item config                        |
| `formData`       | object | `{}`                                 | Form model data                         |
| `formDataSource` | object | `{}`                                 | Form model data source                  |
| `optionFormat`   | object | `{ label: 'label', value: 'value' }` | Defines the option data format          |
| `modelValue`     | array  | `[]`                                 | The model value of the checkbox group   |
| `options`        | array  | `[]`                                 | The model options of the checkbox group |

### Events

| Name     | Type                     | Description                                     |
| -------- | ------------------------ | ----------------------------------------------- |
| `change` | `function(value: array)` | Emits when the checkbox group value is changed. |
