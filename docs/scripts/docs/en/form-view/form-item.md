---

```html
<ui-form-item></ui-form-item>
```

### Props

| Name         | Type           | Default | Description      |
| ------------ | -------------- | ------- | ---------------- |
| `config`     | FormItemConfig | `{}`    | Form item config |
| `modelValue` | object         | `{}`    | Form model data  |

- For example

  ```html
  <ui-form-view v-model="modelValue" :model-config="modelConfig">
    <template #default="{ formConfig, data }">
      <ui-form-item
        v-for="(config, index) in formConfig"
        :key="index"
        :config="config"
        :model-value="data"
      ></ui-form-item>
    </template>
  </ui-form-view>
  ```
