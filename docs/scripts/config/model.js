import { useStore } from 'balm-ui';
import { useHttp } from '@/plugins/http';

export async function setModelOptionsFn(modelList) {
  const store = useStore();
  console.log('setModelOptionsFn', store.getModelOptions);
  return await store.getModelOptions(modelList);
}

export async function getModelConfigFn({ modelPath }) {
  const store = useStore();
  return await store.getModelConfig(modelPath);
}

export async function getModelDataFn({ model, searchForm, table }) {
  const store = useStore();

  const { data } = searchForm;
  const { page } = table;
  const params = Object.assign({}, data, {
    page
  });

  return await store.getModelList(model, params);
}
