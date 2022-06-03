# BalmUI pro

> Coming up...

- Preview components
  - `<ui-form-view>`
  - `<ui-checkbox-group>`
  - `<ui-radio-group>`
  - `<ui-switch-box>`

## Quick Start

### Installing

```sh
yarn add balm-ui-pro@legacy
# OR
npm install --save balm-ui-pro@legacy
```

### Usage

```scss
@use 'balm-ui-pro/dist/balm-ui-pro';
```

```js
import Vue from 'vue';
import BalmUI fror 'balm-ui';
import BalmUIPro fror 'balm-ui-pro';

Vue.use(BalmUI);
Vue.use(BalmUIPro);
```

## Documentation

```html
<ui-form-view></ui-form-view>
```

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
| `actionConfig`       | actionButton[]  | `[]`       | Form button config, see BalmUI `<ui-button>` props [docs](https://material.balmjs.com/general/button) |

```ts
interface actionButton {
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

| Name                 | Type                           | Description |
| -------------------- | ------------------------------ | ----------- |
| `update:model-value` | `function(modelValue: object)` |             |
| `action`             | `function(type: string)`       |             |

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

function onAction(type) {
  console.log(type);
}
```
