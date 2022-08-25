import version from './version';
import autoInstall from './config/auto-install';
import autoInit from './config/auto-init';

import UiFormView from './components/form-view/form-view';
import UiDetailView from './components/detail-view/detail-view';
import UiTableView from './components/table-view/table-view';
import UiReadonlyItem from './components/readonly-item/readonly-item';
import UiCheckboxGroup from './components/checkbox-group/checkbox-group';
import UiRadioGroup from './components/radio-group/radio-group';
import UiSwitchBox from './components/switch-box/switch-box';
import UiMultiSelect from './components/multi-select/multi-select';
import $apiModel, { useApiModel } from './plugins/api-model';
import $routerModel, { useRouterModel } from './plugins/router-model';
import $transform, { useTransform } from './plugins/transform';
import $constant, {
  useConstant,
  useConstantList,
  useConstantMap
} from './plugins/constant';
import $dialog, { useDialog } from './plugins/dialog';

const Components = {
  UiFormView,
  UiDetailView,
  UiTableView,
  UiReadonlyItem,
  UiCheckboxGroup,
  UiRadioGroup,
  UiSwitchBox,
  UiMultiSelect
};

const Plugins = {
  $apiModel,
  $routerModel,
  $transform,
  $constant,
  $dialog
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
  UiDetailView,
  UiTableView,
  UiReadonlyItem,
  UiCheckboxGroup,
  UiRadioGroup,
  UiSwitchBox,
  UiMultiSelect
};
export {
  $apiModel,
  useApiModel,
  $routerModel,
  useRouterModel,
  $transform,
  useTransform,
  $constant,
  useConstant,
  useConstantList,
  useConstantMap,
  $dialog,
  useDialog
};
