import { useStore, useConfirm } from 'balm-ui';
import { isDev } from '@/config';

const $confirm = useConfirm();

export async function getModelListDataFn({ model, searchForm, listData }) {
  const store = useStore();

  const { data } = searchForm;
  const { page } = listData;
  const params = Object.assign({}, data, {
    page
  });

  isDev && console.info('getModelListDataFn', model, params);

  return await store.getModelList(model, params);
}

export async function handleRowAction(action, rowData, listViewData) {
  isDev && console.log('handleRowAction', action, rowData, listViewData);
}

export async function handleTopAction(action, listViewData) {
  isDev && console.log('handleTopAction', action, listViewData);
}
