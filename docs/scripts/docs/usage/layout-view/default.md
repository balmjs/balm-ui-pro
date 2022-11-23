```scss
@use 'balm-ui/dist/balm-ui';
@use 'balm-ui-pro/dist/balm-ui-pro';
```

```js
import BalmUI from 'balm-ui';
import BalmUIPro from 'balm-ui-pro';

Vue.use(BalmUI);
Vue.use(BalmUIPro {
  // Optional. Overwrite `<ui-layout-view>` props with default value.
  UiLayoutView: {
    // some props
  }
});
```
