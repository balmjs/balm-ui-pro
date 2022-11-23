```scss
@use 'balm-ui/components/core';
@use 'balm-ui/components/top-app-bar/top-app-bar';
@use 'balm-ui/components/icon-button/icon-button';
@use 'balm-ui/components/icon/icon';
@use 'balm-ui/components/drawer/drawer';
@use 'balm-ui/components/list/list';
@use 'balm-ui-pro/components/layout-view/layout-view';
```

```js
import Vue from 'vue';
import UiTopAppBar from 'balm-ui/components/top-app-bar';
import UiDrawerComponents from 'balm-ui/components/drawer';
import UiListComponents from 'balm-ui/components/list';
import UiLayoutView from 'balm-ui-pro/components/layout-view';

// Optional. Overwrite `<ui-layout-view>` props with default value.
Vue.use(UiLayoutView, {
  // some props
});
```
