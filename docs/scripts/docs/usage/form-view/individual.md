```scss
@use 'balm-ui/components/core';
@use 'balm-ui/components/form-field/form-field';
@use 'balm-ui/components/form/form';
@use 'balm-ui/components/button/button';
@use 'balm-ui/components/icon/icon'; // Optional
@use 'balm-ui-pro/components/form-view/form-view';
// NOTE: use awesome form item components css
```

```js
import UiForm from 'balm-ui/components/form';
import UiFormField from 'balm-ui/components/form-field';
import UiButton from 'balm-ui/components/button';
import UiFormView from 'balm-ui-pro/components/form-view';

Vue.use(UiForm);
Vue.use(UiFormField);
Vue.use(UiButton);
// Optional. Overwrite `<ui-form-view>` props with default value.
Vue.use(UiFormView, {
  // some props
});
```
