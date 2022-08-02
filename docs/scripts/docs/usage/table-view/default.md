```scss
@use 'balm-ui/dist/balm-ui';
@use 'balm-ui-pro/dist/balm-ui-pro';
```

```js
import BalmUI from 'balm-ui';
import BalmUIPlus from 'balm-ui/dist/balm-ui-plus';
import BalmUIPro from 'balm-ui-pro';

Vue.use(BalmUI);
Vue.use(BalmUIPlus);
Vue.use(BalmUIPro {
  // Optional. Overwrite `<ui-table-view>` props with default value.
  UiTableView: {
    // some props
  }
});
```
