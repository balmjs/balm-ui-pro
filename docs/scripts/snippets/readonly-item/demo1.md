- model config

  ```js
  export default (data) => [
    {
      label: 'Label A',
      component: 'ui-readonly-item',
      key: 'a',
      value: data.a
    },
    {
      label: 'Label B',
      component: 'ui-readonly-item',
      key: 'b',
      value: ({ b }) => b + '!'
    }
  ];
  ```

- page

  ```html
  <ui-form-view v-model="formData" :model-config="modelConfig"></ui-form-view>
  ```

  ```js
  import modelConfig from '@/model-config/demo';

  export default {
    data() {
      return {
        modelConfig,
        formData: {
          a: 'hello',
          b: 'world'
        }
      };
    }
  };
  ```
