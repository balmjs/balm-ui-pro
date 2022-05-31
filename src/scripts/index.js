import version from './version';
import autoInstall from './config/auto-install';

import UiFormView from './components/form-view/form-view.vue';
import UiCheckboxGroup from './components/form-components/checkbox-group.vue';
import UiRadioGroup from './components/form-components/radio-group.vue';
import UiSwitchBox from './components/form-components/switch-box.vue';
// import $model, { useModel } from './plugins/model';

const Components = {
  UiFormView,
  UiCheckboxGroup,
  UiRadioGroup,
  UiSwitchBox
};

const Plugins = {
  // $model
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
export { UiFormView, UiCheckboxGroup, UiRadioGroup, UiSwitchBox };
// export { $model, useModel };
