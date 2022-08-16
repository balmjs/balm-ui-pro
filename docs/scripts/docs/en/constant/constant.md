```ts
interface VueInstance {
  $constant: {
    use: (key: string) => ConstantInstance;
    valueOf: () => Constants;

    toList: (format: ConstantListFormat) => ConstantList;
    useList: (key: string, format: ConstantListFormat) => ConstantList;

    toMap: (format: ConstantMapFormat) => ConstantValue;
    useMap: (key: string, format: ConstantMapFormat) => ConstantValue;
  };
}
```

- Constant List

  ```ts
  type ConstantListFormat = {
    label: 'label' | string;
    value: 'value' | string;
  };

  type ConstantItem = {
    label: ConstantLabel;
    value: ConstantValue;
  };
  type ConstantList = ConstantItem[];
  ```

- Constant Map

  ```ts
  type ConstantMapFormat = {
    key: 'key' | string;
    value: 'value' | string;
  };

  type ConstantMap = { [key: ConstantKey]: ConstantValue };
  ```

### Use `$constant` without `.vue` component

```js
import { useConstant, useConstantList, useConstantMap } from 'balm-ui-pro';
// OR
// import { useConstant, useConstantList, useConstantMap } from 'balm-ui-pro/plugins/constant';

const $constant = useConstant();
```

#### For default constants

- `useConstantList` = `$constant.useList`
- `useConstantMap` = `$constant.useMap`

#### For custom constants

- `$constant.use(Constants).toList`
- `$constant.use(Constants).toMap`
