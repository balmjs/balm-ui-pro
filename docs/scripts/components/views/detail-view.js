import { useStore } from 'balm-ui';
import { isDev } from '@/config';

export async function getModelDetailDataFn({
  model,
  modelAction,
  keyName,
  $route
}) {
  let result = {};

  const id = $route?.params[keyName];

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
  detailData,
  detailDataSource
}) {
  const store = useStore();

  const id = detailDataSource[keyName] || detailData[keyName];
  const fn = id ? 'updateModel' : 'createModel';

  isDev && console.info('setModelDataFn', model, id, detailData);

  return await store[fn](model, detailData);
}
