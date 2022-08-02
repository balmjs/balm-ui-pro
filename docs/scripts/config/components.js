// BalmUI
import myStore from '@/store';
import validatorRules from '@/config/validator-rules';
// BalmUIPro
import myModel, {
  setModelOptionsFn,
  getModelConfigFn,
  getModelListDataFn,
  listActionHandler,
  listTopbarHandler,
  getModelDetailDataFn,
  setModelDataFn
} from '@/model';
import myConstants from '@/model/constants';
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
  $model: myModel,
  $constant: myConstants,
  UiFormView: {
    setModelOptionsFn
  },
  UiTableView: {
    getModelConfigFn,
    getModelDataFn: getModelListDataFn,
    tableDataFormat: {
      data: 'data',
      total: 'total'
      // page: 'page'
    },
    actionHandler: listActionHandler,
    topbarHandler: listTopbarHandler
  },
  UiDetailView: {
    getModelConfigFn,
    getModelDataFn: getModelDetailDataFn,
    setModelDataFn
  }
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
