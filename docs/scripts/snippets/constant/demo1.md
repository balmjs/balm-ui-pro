```js
const DEMO_DATA = [
  {
    label: 'Label A',
    key: 'a',
    value: 1
  },
  {
    label: 'Label B',
    key: 'b',
    value: 2
  }
];

const ConstantConfig = {
  demo: DEMO_DATA
};

Vue.use(BalmUIPro, {
  $constant: ConstantConfig
});
```

```html
<template>
  <p>constant: {{ $constant.use('demo') }}</p>
  <hr />
  <p>list: {{ $constant.useList('demo') }}</p>
  <br />
  <p>
    format list: {{ $constant.useList('demo', { label: 'key', value: 'value' })
    }}
  </p>
  <hr />
  map: {{ $constant.useMap('demo') }}
  <br />
  <p>
    format map: {{ $constant.useMap('demo', { key: 'value', value: 'label' }) }}
  </p>
</template>
```
