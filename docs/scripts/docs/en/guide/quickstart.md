# Quick Start

## Tips before development

BalmUI Pro is a front-end scaffolding. By default, readers have already understood some basic front-end knowledge, and understand awesome CLI and BalmUI. If you are a pure novice, it is recommended to read [Beginner's Need to know](https://v8.material.balmjs.com/#/guide/quickstart).

## Requirements

- vue 2.6.0+
- vue-router 3.x
- balm-ui 8.56.2+

## Installing

```bash
yarn add balm-ui@legacy balm-ui-pro@legacy
# OR
npm install --save balm-ui@legacy balm-ui-pro@legacy
```

## Usage

```scss
@use 'balm-ui/dist/balm-ui';
@use 'balm-ui-pro/dist/balm-ui-pro';
```

```js
import Vue from 'vue';
import BalmUI from 'balm-ui';
import BalmUIPro from 'balm-ui-pro';

Vue.use(BalmUI);
Vue.use(BalmUIPro);
```
