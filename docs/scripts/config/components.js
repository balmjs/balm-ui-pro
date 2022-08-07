// BalmUI
import myStore from '@/store';
import validatorRules from '@/config/validator-rules';
// BalmUI Pro
import myModel, {
  setModelOptionsFn,
  getModelConfigFn,
  getModelListDataFn,
  listActionHandler,
  listTopbarHandler,
  getModelDetailDataFn,
  setModelDataFn
} from '@/model';
import ConstantSource from '@/model/constant-source';
// Custom
import UiMarkdown from '@/components/markdown';
import UiSnippet from '@/components/snippet';
import XFormItem from '@/components/x-form-item';

export const BalmUIConfig = {
  $store: myStore,
  $validator: validatorRules
};

export const BalmUIProConfig = {
  $model: myModel,
  $constant: ConstantSource,
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

export const customComponents = [UiMarkdown, UiSnippet, XFormItem];
