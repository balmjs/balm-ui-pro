```scss
@use 'balm-ui/components/core';
@use 'balm-ui/components/dialog/dialog';
@use 'balm-ui/components/button/button';
@use 'balm-ui-pro/plugins/dialog/dialog';
// NOTE: use awesome components css
```

```js
import UiDialogComponents from 'balm-ui/components/dialog';
import UiButton from 'balm-ui/components/button';
import $dialog from 'balm-ui-pro/plugins/dialog';
// NOTE: import awesome components

Vue.use(UiDialogComponents);
Vue.use(UiButton);
// Optional. Overwrite `$dialog` options.
Vue.use($dialog, {
  // some options
});
```
