import { useStore, useConfirm } from 'balm-ui';

const $confirm = useConfirm();

export async function setModelOptionsFn(modelList) {
  const store = useStore();

  return await store.getModelOptions(modelList);
}

export async function getModelConfigFn({ modelPath }) {
  const store = useStore();

  return await store.getModelConfig(modelPath);
}

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

export async function getModelDetailDataFn({ model, keyName, $route }) {
  let result = {};

  const id = $route.params[keyName];
  if (id) {
    const store = useStore();
    const params = {};

    params[keyName] = id;

    result = await store.getModelDetail(model, params);
  }

  return result;
}

export async function setModelDataFn({ model, keyName, formData }) {
  const store = useStore();

  const id = formData[keyName];
  const fn = id ? 'updateModel' : 'createModel';

  // console.log(model, formData); // TODO: init formData is empty

  return await store[fn](model, formData);
}
