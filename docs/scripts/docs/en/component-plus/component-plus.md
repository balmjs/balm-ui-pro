```html
<ui-component-plus></ui-component-plus>
```

### Props

| Name                  | Type    | Default    | Description                                              |
| --------------------- | ------- | ---------- | -------------------------------------------------------- |
| `modelValue`          | array   | `[]`       | The model value of the component plus                    |
| `componentName`       | string  | `required` | The name of the component used                           |
| `componentModelValue` | any     | `''`       | The model value of the component used                    |
| `componentModelEvent` | string  | `'change'` | The model event of the component used                    |
| `componentAttrOrProp` | object  | `{}`       | The props of the component used                          |
| `fullwidth`           | boolean | `false`    | Styles the component plus as a full width component item |

### Events

| Name     | Type                     | Description                                     |
| -------- | ------------------------ | ----------------------------------------------- |
| `change` | `function(value: array)` | Emits when the component plus value is changed. |
