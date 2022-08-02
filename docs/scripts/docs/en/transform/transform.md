```ts
type FormData = { [key: string]: unknown };

interface Transform {
  in: (data: FormData) => Transform;
  format: (
    keys: string | string[],
    formatFn: (data: FormData) => FormData
  ) => Transform;
  out: () => FormData;
}

interface VueInstance {
  $transform: Transform;
}
```

### Use `$transform` without `.vue` component

```js
import { useTransform } from 'balm-ui-pro';
// OR
// import { useTransform } from 'balm-ui-pro/plugins/transform';
```
