import { useStore } from 'balm-ui';
import { isDev } from '@/config';

export async function getModelDetailDataFn({ model, keyName, $route }) {
  let result = {};

  const id = $route.params[keyName];

  isDev && console.info('getModelDetailDataFn', model, id);

  if (id) {
    const store = useStore();
    const params = {};

    params[keyName] = id;

    result = await store.getModelDetail(model, params);
  }

  return result;
}

export async function setModelDataFn({
  model,
  keyName,
  formData,
  formDataSource
}) {
  const store = useStore();

  const id = formDataSource[keyName] || formData[keyName];
  const fn = id ? 'updateModel' : 'createModel';

  isDev && console.info('setModelDataFn', model, id, formData);

  return await store[fn](model, formData);
}
