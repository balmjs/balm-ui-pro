```ts
type ConstantLabel = string;
type ConstantKey = string;
type ConstantValue = any;

interface VueInstance {
  $constant: {
    use: (key: string) => Constants;

    useList: (key: string, format: ConstantListFormat) => ConstantList;
    useMap: (key: string, format: ConstantMapFormat) => ConstantValue;
  };
}
```

- Constant Data

  ```ts
  type Constant = {
    label: ConstantLabel;
    key: ConstantKey;
    value: ConstantValue;
  };
  type Constants = Constant[];
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
