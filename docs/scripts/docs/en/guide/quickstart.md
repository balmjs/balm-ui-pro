# Quick Start

## Tips before development

BalmUI Pro is a front-end scaffolding. By default, readers have already understood some basic front-end knowledge, and understand awesome CLI and BalmUI. If you are a pure novice, it is recommended to read [Beginner's Need to know](https://material.balmjs.com/guide/quickstart).

## Installing

```bash
yarn add balm-ui balm-ui-pro
# OR
npm install --save balm-ui balm-ui-pro
```

## Usage

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
