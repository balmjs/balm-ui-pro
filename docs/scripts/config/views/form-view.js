import { useStore } from 'balm-ui';

export function setModelOptionsFn(modelList) {
  // const store = useStore();

  console.warn('setModelOptionsFn', modelList);

  return async () => {}; // store.setModelOptions(modelList);
}

export async function getModelConfigFn({ modelPath }) {
  const store = useStore();

  return await store.getModelConfig(modelPath);
}
