# Form Items

## BalmUI form item components:

- `<ui-textfield>`
- `<ui-autocomplete>`
- `<ui-editor>`
- `<ui-select>`
- `<ui-checkbox>`
- `<ui-radio>`
- `<ui-chips>`
- `<ui-datepicker>`
- `<ui-rangepicker>`
- `<ui-switch>`
- `<ui-slider>`

## BalmUI Pro form item components:

- `<ui-readonly-item>`
- `<ui-checkbox-group>`
- `<ui-radio-group>`
- `<ui-switch-box>`
- `<ui-multi-select>`

## Custom form item components:

### Common Props

| Name             | Type   | Default | Description            |
| ---------------- | ------ | ------- | ---------------------- |
| `formData`       | object | `{}`    | Form model data        |
| `formDataSource` | object | `{}`    | Form model data source |

### Required Events

| Name     | Type                       | Description                                       |
| -------- | -------------------------- | ------------------------------------------------- |
| `change` | `function(value: unknown)` | Emits when the custom component value is changed. |
