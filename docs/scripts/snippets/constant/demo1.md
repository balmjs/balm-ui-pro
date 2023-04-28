- `constants/index.js`

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

  export default {
    demo: DEMO_DATA
  };
  ```

```js
import constantSource from '@/constants';

app.use(BalmUIPro, {
  $constant: constantSource
});
```

---

```html
<p>constant: {{ $constant.use('demo').valueOf() }}</p>

<p>list: {{ $constant.useList('demo') }}</p>
<p>
  format list: {{ $constant.useList('demo', { label: 'key', value: 'value' }) }}
</p>

<p>map: {{ $constant.useMap('demo') }}</p>
<p>
  format map: {{ $constant.useMap('demo', { key: 'value', value: 'label' }) }}
</p>

<p>Custom constant: {{ $constant.use(customConstants).toMap() }}</p>
```

```js
export default {
  data() {
    return {
      customConstants: [
        {
          label: 'Custom 1',
          key: 'key1',
          value: 1
        },
        {
          label: 'Custom 2',
          key: 'key2',
          value: 2
        }
      ]
    };
  }
};
```
