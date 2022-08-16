import { useStore } from 'balm-ui';
import { isDev } from '@/config';

export function setModelOptionsFn(modelList) {
  const store = useStore();

  isDev && console.info('setModelOptionsFn', modelList);

  return store.setModelOptions(modelList);
}

export async function getModelConfigFn({ modelPath }) {
  const store = useStore();

  isDev && console.info('getModelConfigFn', modelPath);

  return await store.getModelConfig(modelPath);
}
