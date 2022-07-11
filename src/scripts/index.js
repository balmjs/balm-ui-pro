import version from './version';
import autoInstall from './config/auto-install';
import autoInit from './config/auto-init';

import UiFormView from './components/form-view/form-view';
import UiReadonlyItem from './components/form-components/readonly-item';
import UiCheckboxGroup from './components/form-components/checkbox-group';
import UiRadioGroup from './components/form-components/radio-group';
import UiSwitchBox from './components/form-components/switch-box';
import UiMultiSelect from './components/form-components/multi-select';
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

autoInit(BalmUIPro);

export default BalmUIPro;
export { version, install };
export {
  UiFormView,
  UiCheckboxGroup,
  UiRadioGroup,
  UiSwitchBox,
  UiMultiSelect
};
export { $model, useApiModel, useRouterModel, $transform, useTransform };
