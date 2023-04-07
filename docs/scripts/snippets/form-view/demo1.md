- `pro/model.js`

  ```js
  export default {
    methods: {
      // `this.$store.getModel` see BalmUI Pro `model` plugin for details
      async setModelOptions(modelList) {
        const modelOptions = {};

        for (const model of modelList) {
          const modelType = model.split(':');
          const [modelName, apiAction] = modelType;

          switch (modelName) {
            case 'demo':
              modelOptions[`${apiAction}Options`] = await this.$store.getModel(
                modelName,
                {},
                { apiAction: `${apiAction}Options` }
              );
              break;
          }
        }

        return modelOptions;
      }
      // ...
    }
  };
  ```

- `pro/views/form-view.js`

  ```js
  import { useStore } from 'balm-ui';

  export async function setModelOptionsFn(modelList) {
    const store = useStore();

    return await store.setModelOptions(modelList);
  }
  ```

```js
import { setModelOptionsFn } from '@/pro/views/form-view';

Vue.use(BalmUIPro, {
  UiFormView: {
    setModelOptionsFn
  }
});
```

---

- `model-config/demo.js`

  ```js
  import { useStore } from 'balm-ui';

  const store = useStore();

  export default (
    data,
    {
      selectOptions,
      checkboxOptions,
      radioOptions,
      chipsOptions,
      switchOptions,
      multiSelectOptions
    }
  ) => {
    const { id } = data;

    return [
      {
        if: !!id,
        label: 'ID',
        component: 'ui-textfield',
        key: 'id',
        value: id,
        attrOrProp: {
          attrs: {
            readonly: true
          }
        }
      },
      {
        label: 'Textfield',
        component: 'ui-textfield',
        key: 'a',
        value: ''
      },
      {
        label: 'Autocomplete',
        component: 'ui-autocomplete',
        key: 'b',
        value: ''
      },
      {
        label: 'Editor',
        component: 'ui-editor',
        key: 'c',
        value: ''
      },
      {
        label: 'Select',
        component: 'ui-select',
        key: 'd',
        value: '',
        model: 'demo:select',
        attrOrProp: {
          defaultLabel: 'default',
          options: selectOptions
        }
      },
      {
        show: ({ d }) => d === 2,
        label: 'Checkbox',
        component: 'ui-checkbox-group',
        key: 'e',
        value: data.e || [],
        model: 'demo:checkbox',
        attrOrProp: {
          options: checkboxOptions
        }
      },
      {
        label: 'Radio',
        component: 'ui-radio-group',
        key: 'f',
        value: '',
        model: 'demo:radio',
        attrOrProp: {
          options: radioOptions
        }
      },
      {
        label: 'Chips',
        component: 'ui-chips',
        key: 'g',
        value: [8],
        model: 'demo:chips',
        attrOrProp: {
          type: 'filter',
          options: chipsOptions
        }
      },
      {
        label: 'Datepicker',
        component: 'ui-datepicker',
        key: 'h',
        value: ''
      },
      {
        label: 'Rangepicker',
        component: 'ui-rangepicker',
        key: 'i',
        value: []
      },
      {
        label: 'Switch',
        component: 'ui-switch-box',
        key: 'j',
        value: 'off',
        model: 'demo:switch',
        attrOrProp: {
          options: switchOptions,
          switchAttrOrProp: {
            trueValue: 'on',
            falseValue: 'off'
          }
        }
      },
      {
        label: 'Slider',
        component: 'ui-slider',
        key: 'k',
        value: 0
      },
      {
        label: 'Multi-select',
        component: 'ui-multi-select',
        model: 'demo:multiSelect',
        components: [
          {
            key: 'l',
            value: '',
            options: multiSelectOptions,
            attrOrProp: {
              defaultLabel: 'Select1'
            }
          },
          {
            key: 'm',
            value: '',
            options: ({ l }) =>
              store.getModel(
                'demo',
                { id: l },
                { apiAction: 'multiSelectOptions2' }
              ),
            attrOrProp: {
              defaultLabel: 'Select2'
            }
          },
          {
            key: 'n',
            value: '',
            options: async ({ m }) =>
              await store.getModel(
                'demo',
                { id: m },
                { apiAction: 'multiSelectOptions3' }
              ),
            attrOrProp: {
              defaultLabel: 'Select3'
            }
          }
        ],
        validator: 'multiSelectRequired',
        multiSelectRequired: {
          validate(_, { l, m, n }) {
            return l || m || n;
          },
          message: '%s is required'
        }
      },
      {
        // debug: true,
        label: 'Component slot',
        component: 'ui-textfield',
        key: 'o',
        value: ''
      },
      {
        // debug: true,
        label: 'Custom component',
        component: 'x-form-item', // NOTE: need to register first
        key: 'p',
        value: '',
        modelEvent: 'input'
      },
      {
        label: 'Custom slot',
        slot: 'custom-slot'
      }
    ];
  };
  ```

```html
<ui-form-view
  v-model="formData"
  :model-config="modelConfig"
  :action-config="actionConfig"
  @action="onAction"
>
  <template #form-item__ui-textfield--l>
    <input v-model="formData.l" />
  </template>
  <template #custom-slot>gg</template>

  <template #after-form-view>
    <ui-alert v-if="message" state="warning">{{ message }}</ui-alert>
  </template>
</ui-form-view>
```

```js
import modelConfig from '@/model-config/demo';

const actionConfig = [
  {
    type: 'reset',
    text: 'Reset',
    attrOrProp: {
      outlined: true
    }
  },
  {
    type: 'submit',
    text: 'Submit',
    attrOrProp: {
      raised: true
    }
  }
];

export default {
  data() {
    return {
      formData: {},
      modelConfig,
      actionConfig,
      message: ''
    };
  },
  computed: {
    id() {
      return this.$route.params.id || 0;
    }
  },
  async mounted() {
    if (this.id) {
      this.formData = await this.$store.getModelDetail('user', {
        id: this.id
      });
    }
  },
  methods: {
    onAction(action, result) {
      console.log('onAction', action, result);

      if (action.type === 'submit') {
        const { valid, message } = result;

        this.message = message;

        if (valid) {
          console.log('gg');
        }
      } else {
        this.message = '';
      }
    }
  }
};
```
