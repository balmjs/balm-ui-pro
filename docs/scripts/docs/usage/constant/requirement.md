```ts
type ConstantLabel = string;
type ConstantKey = string;
type ConstantValue = any;

type Constant = {
  label: ConstantLabel;
  key: ConstantKey;
  value: ConstantValue;
};
type Constants = Constant[];

type ConstantConfig = { [key: string]: Constants };
```
