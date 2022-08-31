import { useStore, helpers } from 'balm-ui';
import { isDev } from '@/config';

export async function setModelOptionsFn(modelList) {
  const modelOptions = {};

  const store = useStore();

  for await (const model of modelList) {
    const models = model.split(':');
    const [modelType, modelName] = models;
    const key = helpers.toCamelCase(modelName || modelType);
    const options = await store.getModelOptions(model);

    modelOptions[`${key}Options`] = options;
  }

  isDev && console.info('getModelOptions', modelOptions);

  return modelOptions;
}

export async function getModelConfigFn({ modelPath }) {
  const store = useStore();

  isDev && console.info('getModelConfigFn', modelPath);

  return await store.getModelConfig(modelPath);
}
