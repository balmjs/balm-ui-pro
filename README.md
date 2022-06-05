# BalmUI pro

> Coming up...

> [`balm-ui-pro@legacy`](https://github.com/balmjs/balm-ui-pro/tree/legacy) supports for Vue 2

- Preview components
  - `<ui-form-view>`
  - `<ui-checkbox-group>`
  - `<ui-radio-group>`
  - `<ui-switch-box>`

## Quick Start

### Installing

```sh
yarn add balm-ui-pro
# OR
npm install --save balm-ui-pro
```

### Usage

```scss
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

```ts
interface FormConfigItem {
  if?: boolean;
  show?: boolean;
  component: string;
  label?: string;
  key?: string;
  value?: string;
  attrOrProp?: object;
  showSlots?: boolean; // For dev and debug
  reload?: boolean;
  ...BalmUIValidationRule
}
```

> NOTE: see BalmUI $validator rule and result [docs](https://material.balmjs.com/data-input/validator)

### Props

| Name                 | Type            | Default    | Description                                                                                           |
| -------------------- | --------------- | ---------- | ----------------------------------------------------------------------------------------------------- |
| `modelValue`         | object          | `{}`       | Form model data                                                                                       |
| `modelConfig`        | array, function | `required` | Form model config                                                                                     |
| `modelOptions`       | object          | `{}`       | The extra options of the form model config                                                            |
| `useGrid`            | boolean         | `false`    |                                                                                                       |
| `formAttrOrProp`     | object          | `{}`       | See BalmUI `<ui-form>` props [docs](https://material.balmjs.com/layout/form)                          |
| `formItemAttrOrProp` | object          | `{}`       |                                                                                                       |
| `gridAttrOrProp`     | object          | `{}`       | See BalmUI `<ui-grid>` props [docs](https://material.balmjs.com/layout/grid)                          |
| `gridCellAttrOrProp` | object          | `{}`       | See BalmUI `<ui-grid-cell>` props [docs](https://material.balmjs.com/layout/grid)                     |
| `actionConfig`       | ActionButton[]  | `[]`       | Form button config, see BalmUI `<ui-button>` props [docs](https://material.balmjs.com/general/button) |

```ts
interface ActionButton {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  attrOrProp?: object;
}
```

### Slots

| Name                                          | Props                               | Description                                                        |
| --------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------ |
| `before`                                      | `itemClass`, `subitemClass`, `data` | Before form items                                                  |
| custom form item slots (by form model config) | `value`, `config`, `data`           | Custom form item slots (See all slots names by `config.showSlots`) |
| `after`                                       | `itemClass`, `subitemClass`, `data` | After form items                                                   |
| `actions`                                     | `className`, `data`                 | Custom form buttons                                                |

### Events

| Name                 | Type                                   | Description |
| -------------------- | -------------------------------------- | ----------- |
| `update:model-value` | `function(modelValue: object)`         |             |
| `action`             | `function(antionResult: ActionResult)` |             |

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
></ui-form-view>
```

```js
const modelConfig = ({ data }) => {
  return [
    {
      component: 'ui-textfield',
      label: 'Input',
      key: 'a',
      value: '',
      showSlots: true // show all custom slots names in console
    },
    {
      component: 'ui-autocomplete',
      label: 'Autocomplete',
      key: 'b',
      value: ''
    },
    {
      component: 'ui-editor',
      label: 'Editor',
      key: 'c',
      value: ''
    },
    {
      component: 'ui-select',
      label: 'Select',
      key: 'd',
      value: '',
      attrOrProp: {
        'default-label': 'default',
        options: [
          {
            label: 'A',
            value: 1
          },
          {
            label: 'B',
            value: 2
          }
        ]
      },
      reload: true
    },
    {
      component: 'ui-checkbox-group',
      label: 'Checkbox',
      key: 'e',
      value: [],
      attrOrProp: {
        options: [
          {
            label: 'C',
            value: 3
          },
          {
            label: 'D',
            value: 4
          }
        ]
      }
    },
    {
      component: 'ui-radio-group',
      label: 'Radio',
      key: 'f',
      value: '',
      attrOrProp: {
        options: [
          {
            label: 'E',
            value: 5
          },
          {
            label: 'F',
            value: 6
          }
        ]
      }
    },
    {
      component: 'ui-chips',
      label: 'Chips',
      key: 'g',
      value: [],
      attrOrProp: {
        type: 'filter',
        options: [
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
        ]
      }
    },
    {
      component: 'ui-datepicker',
      label: 'Datepicker',
      key: 'h',
      value: '',
      attrOrProp: {
        clear: true
      }
    },
    // {
    //   component: 'ui-rangepicker',
    //   label: 'Rangepicker',
    //   key: 'i',
    //   value: []
    // },
    {
      component: 'ui-switch-box',
      label: 'Switch',
      key: 'j',
      value: false,
      attrOrProp: {
        options: [
          {
            label: 'On',
            value: true
          },
          {
            label: 'Off',
            value: false
          }
        ]
      }
    },
    {
      component: 'ui-slider',
      label: 'Slider',
      key: 'k',
      value: 0
    }
  ];
};

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

function onAction({ type }) {
  console.log(type);
}
```
