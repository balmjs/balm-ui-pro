const NAME = '$constant';
const DEFAULTS = {
  listFormat: { label: 'label', value: 'value' },
  mapFormat: { key: 'key', value: 'value' }
};

function checkFormat(formatField1, formatField2, keyField) {
  if (!(formatField1 && formatField2)) {
    throw new Error(
      `[${NAME}]: constant format must assign '${keyField}' and 'value'`
    );
  }
}

class Constant {
  constructor() {
    this.map = new Map();
  }

  use(key) {
    return this.map.get(key);
  }

  /**
   * @example
   *
   * input: [
   *   { label1, key1, value1 },
   *   { label2, key2, value2 }
   * ]
   *
   * output: [{
   *   label: label1,
   *   value: value1
   * }, {
   *   label: label2,
   *   value: value2
   * }]
   */
  useList(key, format = DEFAULTS.listFormat) {
    const formatLabel = format.label;
    const formatValue = format.value;

    checkFormat(formatLabel, formatValue, 'label');

    return this.use(key).map((data) => ({
      [formatLabel]: data[formatLabel],
      [formatValue]: data[formatValue]
    }));
  }

  /**
   * @example
   *
   * input: [
   *   { label1, key1, value1 },
   *   { label2, key2, value2 }
   * ]
   *
   * output: {
   *   key1: value1,
   *   key2: value2
   * }
   */
  useMap(key, format = DEFAULTS.mapFormat) {
    const formatKey = format.key;
    const formatValue = format.value;

    checkFormat(formatKey, formatValue, 'key');

    return this.use(key).reduce((previousValue, currentValue) => {
      const k = currentValue[formatKey];
      const v = currentValue[formatValue];
      previousValue[k] = v;
      return previousValue;
    }, {});
  }
}

const constant = new Constant();

function install(app, options = {}) {
  for (const [key, value] of Object.entries(options)) {
    if (Array.isArray(value)) {
      constant.map.has(key)
        ? console.warn(`[${NAME}]: Conflicting constant definition - ${key}`)
        : constant.map.set(key, value);
    }
  }

  app.config.globalProperties.$constant = constant;
  app.provide('constant', constant);
}

const $constant = {
  install
};
const useConstant = (key) => constant.use(key);
const useConstantList = (key, format = DEFAULTS.listFormat) =>
  constant.useList(key, format);
const useConstantMap = (key, format = DEFAULTS.mapFormat) =>
  constant.useMap(key, format);

export default $constant;
export { install, useConstant, useConstantList, useConstantMap };
