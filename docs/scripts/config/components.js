// BalmUI
import myStore from '@/store';
import validatorRules from '@/config/validator-rules';
// BalmUI Pro
import apiModelConfig from '@/pro/apis';
import constantSource from '@/pro/constants';
import proViewsConfig from '@/pro/views';
// Custom
import UiMarkdown from '@/components/markdown';
import UiSnippet from '@/components/snippet';
import XFormItem from '@/components/x-form-item';

export const BalmUIConfig = {
  $store: myStore,
  $validator: validatorRules
};

export const BalmUIProConfig = {
  $apiModel: apiModelConfig,
  $routerModel: {
    debug: false
  },
  $constant: constantSource,
  ...proViewsConfig
};

export const customComponents = [UiMarkdown, UiSnippet, XFormItem];
