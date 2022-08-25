```html
<ui-multi-select></ui-multi-select>
```

### Props

| Name             | Type   | Default                              | Description                                                                                                    |
| ---------------- | ------ | ------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `config`         | object | `{}`                                 | Form item config                                                                                               |
| `formData`       | object | `{}`                                 | Form model data                                                                                                |
| `formDataSource` | object | `{}`                                 | Form model data source                                                                                         |
| `optionFormat`   | object | `{ label: 'label', value: 'value' }` | Defines the option data format                                                                                 |
| `modelValue`     | object | `{}`                                 | The model value of the multi select                                                                            |
| `components`     | array  | `FormItemConfig[]`                   | The select model config of the multi select, see `<ui-form-view>` model config [docs](/#/components/form-view) |

### Events

| Name     | Type                      | Description                                   |
| -------- | ------------------------- | --------------------------------------------- |
| `change` | `function(value: object)` | Emits when the multi select value is changed. |
