import { setModelOptionsFn, getModelConfigFn } from './form-view';
import { getModelDetailDataFn, setModelDataFn } from './detail-view';
import {
  getModelListDataFn,
  handleRowAction,
  handleTopAction
} from './table-view';

export default {
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
    topActionHandler: handleTopAction,
    searchOnReset: true
  },
  UiDetailView: {
    getModelConfigFn,
    getModelDataFn: getModelDetailDataFn,
    setModelDataFn
  }
};
