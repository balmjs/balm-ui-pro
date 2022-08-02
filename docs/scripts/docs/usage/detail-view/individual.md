```scss
@use 'balm-ui/components/core';
@use 'balm-ui/components/form-field/form-field';
@use 'balm-ui/components/form/form';
@use 'balm-ui/components/button/button';
@use 'balm-ui/components/icon/icon'; // Optional
@use 'balm-ui/components/alert/alert';
@use 'balm-ui-pro/components/form-view/form-view';
// NOTE: use awesome form item components css
```

```js
import UiForm from 'balm-ui/components/form';
import UiFormField from 'balm-ui/components/form-field';
import UiButton from 'balm-ui/components/button';
import UiAlert from 'balm-ui/components/alert';
import UiDetailView from 'balm-ui-pro/components/detail-view';

Vue.use(UiForm);
Vue.use(UiFormField);
Vue.use(UiButton);
Vue.use(UiAlert);
// Optional. Overwrite `<ui-detail-view>` props with default value.
Vue.use(UiDetailView, {
  // some props
});
```
