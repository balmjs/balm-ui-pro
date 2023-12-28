```html
<ui-readonly-item></ui-readonly-item>
```

### Props

| Name                | Type              | Default | Description            |
| ------------------- | ----------------- | ------- | ---------------------- |
| `proConfig`         | object            | `{}`    | Form item config       |
| `proFormData`       | object            | `{}`    | Form model data        |
| `proFormDataSource` | object            | `{}`    | Form model data source |
| `raw`               | boolean, function | `false` | Use Raw HTML           |

```ts
type ReadonlyItemPropsData = {
  proConfig: object;
  proFormData: object;
  proFormDataSource: object;
  type: string;
  value: unknown;
  raw: boolean | (currentFormData: object) => boolean
}

interface ReadonlyItemConfig extends FormItemConfig {
  value: unknown | (currentFormData: object, propsData: ReadonlyItemPropsData) => any;
}
```
