import { useStore, useConfirm } from 'balm-ui';
import { isDev } from '@/config';

const $confirm = useConfirm();

export async function getModelListDataFn({ model, searchForm, table }) {
  const store = useStore();

  const { data } = searchForm;
  const { page } = table;
  const params = Object.assign({}, data, {
    page
  });

  isDev && console.info('getModelListDataFn', model, params);

  return await store.getModelList(model, params);
}

export async function handleRowAction(action, data, refresh) {
  isDev && console.log('handleRowAction', action, data);
}

export async function handleTopAction(action, data, refresh) {
  isDev && console.log('handleTopAction', action, data);
}
