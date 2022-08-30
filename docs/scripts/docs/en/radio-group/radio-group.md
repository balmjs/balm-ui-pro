```html
<ui-radio-group></ui-radio-group>
```

### Props

| Name             | Type           | Default                              | Description                          |
| ---------------- | -------------- | ------------------------------------ | ------------------------------------ |
| `config`         | object         | `{}`                                 | Form item config                     |
| `formData`       | object         | `{}`                                 | Form model data                      |
| `formDataSource` | object         | `{}`                                 | Form model data source               |
| `optionFormat`   | object         | `{ label: 'label', value: 'value' }` | Defines the option data format       |
| `modelValue`     | string, number | `''`                                 | The model value of the radio group   |
| `options`        | array          | `[]`                                 | The model options of the radio group |

### Events

| Name                | Type                                | Description                                  |
| ------------------- | ----------------------------------- | -------------------------------------------- |
| `update:modelValue` | `function(value: string \| number)` | Emits when the radio group value is changed. |
