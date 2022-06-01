# BalmUI pro

> Coming up...

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

### Props

| Name                 | Type            | Default    | Description                                                                       |
| -------------------- | --------------- | ---------- | --------------------------------------------------------------------------------- |
| `debug`              | boolean         | `false`    | Debug form view                                                                   |
| `modelValue`         | object          | `{}`       | Form model data                                                                   |
| `modelConfig`        | array, function | `required` | Form model config                                                                 |
| `modelOptions`       | object          | `{}`       | The extra options of the form model config                                        |
| `useGrid`            | boolean         | `false`    |                                                                                   |
| `formAttrOrProp`     | object          | `{}`       | See BalmUI `<ui-form>` props [docs](https://material.balmjs.com/layout/form)      |
| `formItemAttrOrProp` | object          | `{}`       |                                                                                   |
| `gridAttrOrProp`     | object          | `{}`       | See BalmUI `<ui-grid>` props [docs](https://material.balmjs.com/layout/grid)      |
| `gridCellAttrOrProp` | object          | `{}`       | See BalmUI `<ui-grid-cell>` props [docs](https://material.balmjs.com/layout/grid) |

### Slots

| Name                               | Props                                              | Description                                |
| ---------------------------------- | -------------------------------------------------- | ------------------------------------------ |
| `before`                           | `itemClass`, `subitemClass`, `data`                |                                            |
| custom slot (by from model config) | `value`, `config`, `data`                          | See all custom slot name by `debug = true` |
| `after`                            | `itemClass`, `subitemClass`, `actionClass`, `data` |                                            |

### Events

| Name                 | Type                           | Description |
| -------------------- | ------------------------------ | ----------- |
| `update:model-value` | `function(modelValue: object)` |             |

## Demo

```html
<ui-form-view v-model="formData" :model-config="config">
  <template #after="{ actionClass }">
    <ui-form-field :class="actionClass">
      <ui-button raised @click="onSubmit">Submit</ui-button>
    </ui-form-field>
  </template>
</ui-form-view>
```

```js
const config = ({ data }) => {
  return [
    {
      component: 'ui-textfield',
      label: 'Input',
      key: 'a',
      value: ''
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
```
