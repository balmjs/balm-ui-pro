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

app.use(UiDialogComponents);
app.use(UiButton);
// Optional. Overwrite `$dialog` options.
app.use($dialog, {
  // some options
});
```
