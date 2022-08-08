import { useStore } from 'balm-ui';

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
