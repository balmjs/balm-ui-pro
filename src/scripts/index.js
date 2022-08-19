import version from './version';
import autoInstall from './config/auto-install';

import UiFormView from './components/form-view/form-view.vue';
import UiDetailView from './components/detail-view/detail-view.vue';
import UiTableView from './components/table-view/table-view.vue';
import UiReadonlyItem from './components/readonly-item/readonly-item.vue';
import UiCheckboxGroup from './components/checkbox-group/checkbox-group.vue';
import UiRadioGroup from './components/radio-group/radio-group.vue';
import UiSwitchBox from './components/switch-box/switch-box.vue';
import UiMultiSelect from './components/multi-select/multi-select.vue';
import $apiModel, { useApiModel } from './plugins/api-model';
import $routerModel, { useRouterModel } from './plugins/router-model';
import $transform, { useTransform } from './plugins/transform';
import $constant, {
  useConstant,
  useConstantList,
  useConstantMap
} from './plugins/constant';

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
  $constant
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
  UiDetailView,
  UiTableView,
  UiReadonlyItem,
  UiCheckboxGroup,
  UiRadioGroup,
  UiSwitchBox,
  UiMultiSelect
};
export { $apiModel, useApiModel };
export { $routerModel, useRouterModel };
export { $transform, useTransform };
export { $constant, useConstant, useConstantList, useConstantMap };
