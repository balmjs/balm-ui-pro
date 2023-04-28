```scss
@use 'balm-ui/dist/balm-ui';
@use 'balm-ui-pro/dist/balm-ui-pro';
```

```js
import BalmUI from 'balm-ui';
import BalmUIPro from 'balm-ui-pro';

app.use(BalmUI);
app.use(BalmUIPro {
  // Optional. Overwrite `$dialog` options.
  $dialog: {
    // some options
  }
});
```
