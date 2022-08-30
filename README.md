# [BalmUI Pro](https://pro.balmjs.com/)

> More configuration definition, less code implementation for Vue.js

> [`balm-ui-pro@legacy`](https://github.com/balmjs/balm-ui-pro/tree/legacy) supports for Vue 2

## Documentation & Demos

- Visit [pro.balmjs.com](https://pro.balmjs.com/)
- Visit [legacy.pro.balmjs.com](https://legacy.pro.balmjs.com/) (for Vue 2)

## Quick Start

### Requirements

- vue@3.x
- vue-router@4.x
- balm-ui@10.11.0+

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

## Special Thanks to

- [BalmJS](https://balm.js.org/)
- [Vue.js](https://vuejs.org/)
- [BalmUI](https://material.balmjs.com/)
