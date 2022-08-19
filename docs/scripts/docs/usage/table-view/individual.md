```scss
@use 'balm-ui/components/core';
@use 'balm-ui/components/form-field/form-field';
@use 'balm-ui/components/form/form';
@use 'balm-ui/components/button/button';
@use 'balm-ui/components/icon/icon'; // Optional
@use 'balm-ui/components/table/table';
@use 'balm-ui/components/checkbox/checkbox'; // Required only for data table with row selection
@use 'balm-ui/components/icon-button/icon-button'; // Required only for data table with column sorting
@use 'balm-ui/components/pagination/pagination';
@use 'balm-ui/components/alert/alert';
@use 'balm-ui/components/spinner/spinner';
@use 'balm-ui-pro/components/form-view/form-view';
@use 'balm-ui-pro/components/table-view/table-view';
// NOTE: use awesome form item components css
```

```js
import UiForm from 'balm-ui/components/form';
import UiFormField from 'balm-ui/components/form-field';
import UiButton from 'balm-ui/components/button';
import UiTable from 'balm-ui/components/table';
import UiPagination from 'balm-ui/components/pagination';
import UiAlert from 'balm-ui/components/alert';
import UiSpinner from 'balm-ui/components/spinner';
import UiTableView from 'balm-ui-pro/components/table-view';

Vue.use(UiForm);
Vue.use(UiFormField);
Vue.use(UiButton);
Vue.use(UiTable);
Vue.use(UiPagination);
Vue.use(UiAlert);
Vue.use(UiSpinner);
// Optional. Overwrite `<ui-table-view>` props with default value.
Vue.use(UiTableView, {
  // some props
});
```
