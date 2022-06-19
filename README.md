# BalmUI pro

> Coming up...

> [`balm-ui-pro@legacy`](https://github.com/balmjs/balm-ui-pro/tree/legacy) supports for Vue 2

- Preview components
  - `<ui-form-view>`
  - `<ui-readonly-item>`
  - `<ui-checkbox-group>`
  - `<ui-radio-group>`
  - `<ui-switch-box>`
  - `<ui-multi-select>`

## Quick Start

### Installing

```sh
yarn add balm-ui balm-ui-pro
# OR
npm install --save balm-ui balm-ui-pro
```

### Usage

```scss
@use 'balm-ui/dist/balm-ui';
@use 'balm-ui-pro/dist/balm-ui-pro';
```

```js
import { createApp } from 'vue';
import App from '@/views/layouts/app';
import BalmUI from 'balm-ui';
import BalmUIPro from 'balm-ui-pro';

const app = createApp(App);

app.use(BalmUI);
app.use(BalmUIPro);

app.mount('#app');
```

## Documentation

```html
<ui-form-view></ui-form-view>
```

### Props

| Name                 | Type                     | Default    | Description                                                                                           |
| -------------------- | ------------------------ | ---------- | ----------------------------------------------------------------------------------------------------- |
| `modelValue`         | object                   | `{}`       | Form model data                                                                                       |
| `modelConfig`        | array, function, boolean | `required` | Form model config                                                                                     |
| `modelOptions`       | object                   | `{}`       | The extra options of the form model config                                                            |
| `useGrid`            | boolean                  | `false`    |                                                                                                       |
| `formAttrOrProp`     | object                   | `{}`       | See BalmUI `<ui-form>` props [docs](https://material.balmjs.com/layout/form)                          |
| `formItemAttrOrProp` | object                   | `{}`       |                                                                                                       |
| `gridAttrOrProp`     | object                   | `{}`       | See BalmUI `<ui-grid>` props [docs](https://material.balmjs.com/layout/grid)                          |
| `gridCellAttrOrProp` | object                   | `{}`       | See BalmUI `<ui-grid-cell>` props [docs](https://material.balmjs.com/layout/grid)                     |
| `actionConfig`       | array                    | `[]`       | Form button config, see BalmUI `<ui-button>` props [docs](https://material.balmjs.com/general/button) |

- `modelConfig: FormConfigItem[] | (formData: object) => FormConfigItem[] | false`

  ```ts
  interface FormItemConfig {
    // Show all custom slots names and component event in console
    debug?: boolean;
    // Conditional Rendering
    if?: boolean;
    show?: (formData) => boolean;
    // Form label
    label?: (formData) => string;
    // Form data config
    key?: string;
    value?: string;
    // Form component config
    component?: string;
    components?: FormItemComponentsConfig[];
    attrOrProp?: object;
    event?: string; // Defaults: 'update:modelValue'
    // Custom slot
    slot?: string;
    // BalmUI validator
    validator?: string;
    ...BalmUIValidationRule
  }

  interface FormItemComponentsConfig {
    key?: string;
    value?: string;
    attrOrProp?: object;
    ...customAttrOrProp
  }
  ```

  > NOTE: see BalmUI $validator rule and result [docs](https://material.balmjs.com/data-input/validator)

- `actionConfig: ActionButton[]`

  ```ts
  interface ActionButton {
    text: string;
    type?: 'button' | 'submit' | 'reset' | string;
    attrOrProp?: object;
  }
  ```

### Slots

| Name                                          | Props                               | Description                                                    |
| --------------------------------------------- | ----------------------------------- | -------------------------------------------------------------- |
| `before`                                      | `itemClass`, `subitemClass`, `data` | Before form items                                              |
| custom form item slots (by form model config) | `config`, `data`                    | Custom form item slots (See all slots names by `config.debug`) |
| `after`                                       | `itemClass`, `subitemClass`, `data` | After form items                                               |
| `actions`                                     | `className`, `data`                 | Custom form buttons                                            |

### Events

| Name                | Type                                   | Description |
| ------------------- | -------------------------------------- | ----------- |
| `update:modelValue` | `function(modelValue: object)`         |             |
| `action`            | `function(antionResult: ActionResult)` |             |

```ts
interface ActionResult {
  type: string; // ActionButton.type,
  ...validationResult?: BalmUIValidationResult
}
```

## Demo

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
  <template #after>
    <ui-alert v-if="message" state="warning">{{ message }}</ui-alert>
  </template>
</ui-form-view>
```

```js
import { useHttp } from '@/plugins/http';

const http = useHttp();

const modelConfig = ({
  data,
  selectOptions,
  checkboxOptions,
  radioOptions,
  chipsOptions,
  multiSelectOptions1
}) => {
  console.log('static data', data);

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
      label: 'Input',
      component: 'ui-textfield',
      key: 'a',
      value: '2'
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
      attrOrProp: {
        options: checkboxOptions
      }
    },
    {
      label: 'Radio',
      component: 'ui-radio-group',
      key: 'f',
      value: '',
      attrOrProp: {
        options: radioOptions
      }
    },
    {
      label: 'Chips',
      component: 'ui-chips',
      key: 'g',
      value: [],
      attrOrProp: {
        type: 'filter',
        options: chipsOptions
      }
    },
    {
      label: 'Datepicker',
      component: 'ui-datepicker',
      key: 'h',
      value: '',
      attrOrProp: {
        clear: true
      }
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
      attrOrProp: {
        options: [
          {
            label: 'ON',
            value: 'on'
          },
          {
            label: 'OFF',
            value: 'off'
          }
        ],
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
      components: [
        {
          key: 'l',
          value: '',
          options: multiSelectOptions1,
          attrOrProp: {
            defaultLabel: 'Select1'
          }
        },
        {
          key: 'm',
          value: '',
          options: ({ l }) =>
            l
              ? http.post('/api/multi-select/options2', {
                  id: l
                })
              : [],
          attrOrProp: {
            defaultLabel: 'Select2'
          }
        },
        {
          key: 'n',
          value: '',
          options: async ({ m }) =>
            m
              ? await http.post('/api/multi-select/options3', {
                  id: m
                })
              : [],
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
      debug: true,
      label: 'Component slot',
      component: 'ui-textfield',
      key: 'o',
      value: ''
    },
    {
      debug: true,
      label: 'Custom component',
      component: 'x-form-item',
      key: 'p',
      value: '',
      event: 'input'
    },
    {
      label: 'Custom slot',
      slot: 'custom-slot'
    }
  ];
};

const selectOptions = [
  {
    label: 'A',
    value: 1
  },
  {
    label: 'B',
    value: 2
  }
];

const checkboxOptions = [
  {
    label: 'C',
    value: 3
  },
  {
    label: 'D',
    value: 4
  }
];

const radioOptions = [
  {
    label: 'E',
    value: 5
  },
  {
    label: 'F',
    value: 6
  }
];

const chipsOptions = [
  {
    label: 'G',
    value: 7
  },
  {
    label: 'H',
    value: 8
  },
  {
    label: 'I',
    value: 9
  }
];

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
      modelOptions: {
        selectOptions,
        checkboxOptions,
        radioOptions,
        chipsOptions,
        multiSelectOptions1: []
      },
      actionConfig,
      message: ''
    };
  },
  async mounted() {
    const multiSelectOptions1 = await this.$http.post(
      '/api/multi-select/options1'
    );
    this.$set(this.modelOptions, 'multiSelectOptions1', multiSelectOptions1);
  },
  methods: {
    onAction({ type, valid, message }) {
      console.log(type);

      if (type === 'submit') {
        this.message = message;

        if (valid) {
          console.log('gg');
        }
      }
    }
  }
};
```
