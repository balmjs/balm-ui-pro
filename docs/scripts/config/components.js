import { isDev } from '@/config';
// BalmUI
import myStore from '@/store';
import validatorRules from '@/config/validator-rules';
// BalmUI Pro
import apiModelConfig from '@/apis';
import constantSource from '@/constants';
import proViewsConfig from '@/components/views';
// Custom
import PurePage from '@/views/layouts/pure-page';
import DocsPage from '@/views/layouts/docs-page';
import UiMarkdown from '@/components/markdown';
import UiSnippet from '@/components/snippet';
import UiFooterNav from '@/components/footer-nav';
import UiTocAffix from '@/components/toc-affix';
// import XFormItem from '@/components/x-form-item';
import DemoComponentPlus from '@/components/demo-component-plus';

export const BalmUIConfig = {
  $store: myStore,
  $validator: validatorRules
};

export const BalmUIProConfig = {
  $apiModel: apiModelConfig,
  $routerModel: {
    debug: isDev
  },
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
  // XFormItem
  DemoComponentPlus
];
