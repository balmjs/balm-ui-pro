import apiModelConfig from './apis';
import constantSource from './constants';
import { setModelOptionsFn, getModelConfigFn } from './views/form-view';
import { getModelDetailDataFn, setModelDataFn } from './views/detail-view';
import {
  getModelListDataFn,
  handleRowAction,
  handleTopAction
} from './views/table-view';
import { isDev } from '@/config';

const BalmUIProConfig = {
  $apiModel: apiModelConfig,
  $constant: constantSource,
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
    rowActionHandler: handleRowAction,
    topActionHandler: handleTopAction
  },
  UiDetailView: {
    getModelConfigFn,
    getModelDataFn: getModelDetailDataFn,
    setModelDataFn
  }
};

export default BalmUIProConfig;
