import myStore from '@/store';
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
import UiMarkdown from '@/components/markdown';
import UiSnippet from '@/components/snippet';
import XFormItem from '@/components/x-form-item';

export const BalmUIConfig = {
  $store: myStore
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

export const customComponents = [UiMarkdown, UiSnippet, XFormItem];
