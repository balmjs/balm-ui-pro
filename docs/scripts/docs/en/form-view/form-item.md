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
    <template #default="{ formConfig }">
      <ui-form-item
        v-for="(config, index) in formConfig"
        :key="index"
        :config="config"
        :model-value="modelValue"
      ></ui-form-item>
    </template>
  </ui-form-view>
  ```
