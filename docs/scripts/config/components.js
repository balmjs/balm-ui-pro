// BalmUI
import myStore from '@/store';
import validatorRules from '@/config/validator-rules';
// BalmUI Pro
import apiModelConfig from './apis';
import constantSource from './constants';
import proViewsConfig from './views';
// Custom
import PurePage from '@/views/layouts/pure-page';
import DocsPage from '@/views/layouts/docs-page';
import UiMarkdown from '@/components/markdown';
import UiSnippet from '@/components/snippet';
import UiFooterNav from '@/components/footer-nav';
import UiTocAffix from '@/components/toc-affix';
import XFormItem from '@/components/x-form-item';

export const BalmUIConfig = {
  $store: myStore,
  $validator: validatorRules
};

export const BalmUIProConfig = {
  $apiModel: apiModelConfig,
  $constant: constantSource,
  ...proViewsConfig
};

export const customComponents = [
  PurePage,
  DocsPage,
  UiMarkdown,
  UiSnippet,
  UiFooterNav,
  UiTocAffix,
  XFormItem
];
