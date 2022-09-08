```html
<ui-checkbox-group></ui-checkbox-group>
```

### Props

| Name               | Type    | Default                              | Description                             |
| ------------------ | ------- | ------------------------------------ | --------------------------------------- |
| `config`           | object  | `{}`                                 | Form item config                        |
| `formData`         | object  | `{}`                                 | Form model data                         |
| `formDataSource`   | object  | `{}`                                 | Form model data source                  |
| `optionFormat`     | object  | `{ label: 'label', value: 'value' }` | Defines the option data format          |
| `modelValue`       | array   | `[]`                                 | The model value of the checkbox group   |
| `options`          | array   | `[]`                                 | The model options of the checkbox group |
| `allSelected`      | boolean | `false`                              | Displays one checkbox for all selected  |
| `allSelectedLabel` | string  | `'All'`                              | The label of the all selected checkbox  |
| `selectedAllValue` | boolean | `false`                              | All checked for default value           |

### Events

| Name                | Type                     | Description                                     |
| ------------------- | ------------------------ | ----------------------------------------------- |
| `update:modelValue` | `function(value: array)` | Emits when the checkbox group value is changed. |
