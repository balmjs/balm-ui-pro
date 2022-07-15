import version from './version';
import autoInstall from './config/auto-install';

import UiFormView from './components/form-view/form-view.vue';
import UiReadonlyItem from './components/form-components/readonly-item.vue';
import UiCheckboxGroup from './components/form-components/checkbox-group.vue';
import UiRadioGroup from './components/form-components/radio-group.vue';
import UiSwitchBox from './components/form-components/switch-box.vue';
import UiMultiSelect from './components/form-components/multi-select.vue';
import $model, { useApiModel, useRouterModel } from './plugins/model';
import $transform, { useTransform } from './plugins/transform';

const Components = {
  UiFormView,
  UiReadonlyItem,
  UiCheckboxGroup,
  UiRadioGroup,
  UiSwitchBox,
  UiMultiSelect
};

const Plugins = {
  $model,
  $transform
};

const install = (app, options = {}) =>
  autoInstall(app, options, {
    Components,
    Plugins
  });

const BalmUIPro = {
  install
};

export default BalmUIPro;
export { version, install };
export {
  UiFormView,
  UiReadonlyItem,
  UiCheckboxGroup,
  UiRadioGroup,
  UiSwitchBox,
  UiMultiSelect
};
export { $model, useApiModel, useRouterModel };
export { $transform, useTransform };
