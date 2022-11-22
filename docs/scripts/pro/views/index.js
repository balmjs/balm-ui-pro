import { setModelOptionsFn, getModelConfigFn } from './form-view';
import { getModelDetailDataFn, setModelDataFn } from './detail-view';
import {
  getModelListDataFn,
  handleRowAction,
  handleTopAction
} from './list-view';

export default {
  UiFormView: {
    setModelOptionsFn
  },
  UiListView: {
    getModelConfigFn,
    getModelDataFn: getModelListDataFn,
    tableDataFormat: {
      data: 'data',
      total: ({ page }) => page.total
      // page: 'page'
    },
    rowActionHandler: handleRowAction,
    topActionHandler: handleTopAction,
    topActionIconFormat: {
      'multi-update': 'update',
      'multi-delete': 'delete'
    },
    searchOnReset: true
  },
  UiDetailView: {
    getModelConfigFn,
    getModelDataFn: getModelDetailDataFn,
    setModelDataFn
  }
};
