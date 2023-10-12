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
import UiFormViewComponents from 'balm-ui-pro/components/form-view';

app.use(UiForm);
app.use(UiFormField);
app.use(UiButton);
app.use(UiFormViewComponents, {
  // Optional. Overwrite `<ui-form-view>` props with default value.
  UiFormView: {
    // some props
  }
});
```
