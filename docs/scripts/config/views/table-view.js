import { useStore, useConfirm } from 'balm-ui';

const $confirm = useConfirm();

export async function getModelListDataFn({ model, searchForm, table }) {
  const store = useStore();

  const { data } = searchForm;
  const { page } = table;
  const params = Object.assign({}, data, {
    page
  });

  return await store.getModelList(model, params);
}

export async function listActionHandler(action, data, refresh) {
  console.log('listActionHandler', action);
}

export async function listTopbarHandler(action, data, refresh) {
  console.log('listTopbarHandler', action);
}
