```html
<ui-component-plus></ui-component-plus>
```

### Props

| Name                  | Type   | Default    | Description                           |
| --------------------- | ------ | ---------- | ------------------------------------- |
| `componentName`       | string | `required` | The name of the component used        |
| `componentModelValue` | any    | `''`       | The model value of the component used |
| `componentModelEvent` | string | `'change'` | The model event of the component used |
| `modelValue`          | array  | `[]`       | The model value of the component plus |

### Events

| Name     | Type                     | Description                                     |
| -------- | ------------------------ | ----------------------------------------------- |
| `change` | `function(value: array)` | Emits when the component plus value is changed. |
