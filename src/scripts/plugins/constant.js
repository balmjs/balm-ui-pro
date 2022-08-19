const NAME = '$constant';

const DEFAULTS = {
  listFormat: { label: 'label', value: 'value' },
  mapFormat: { key: 'key', value: 'value' }
};

function checkFormat(formatField1, formatField2, keyField) {
  if (!(formatField1 && formatField2)) {
    throw new Error(
      `[${NAME}]: Constant format must assign '${keyField}' and 'value'`
    );
  }
}

class Constant {
  constructor() {
    this.map = new Map();
    this.currentConstant = [];
  }

  use(key) {
    this.currentConstant = this.map.has(key)
      ? this.map.get(key)
      : Array.isArray(key)
      ? key
      : [];

    return this;
  }

  valueOf() {
    return this.currentConstant;
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
  toList(format = DEFAULTS.listFormat) {
    const formatLabel = format.label;
    const formatValue = format.value;

    checkFormat(formatLabel, formatValue, 'label');

    return this.currentConstant.map((data) => ({
      [formatLabel]: data[formatLabel],
      [formatValue]: data[formatValue]
    }));
  }

  useList(key, format = DEFAULTS.listFormat) {
    return this.use(key).toList(format);
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
  toMap(format = DEFAULTS.mapFormat) {
    const formatKey = format.key;
    const formatValue = format.value;

    checkFormat(formatKey, formatValue, 'key');

    return this.currentConstant.reduce((previousValue, currentValue) => {
      const k = currentValue[formatKey];
      const v = currentValue[formatValue];
      previousValue[k] = v;
      return previousValue;
    }, {});
  }

  useMap(key, format = DEFAULTS.mapFormat) {
    return this.use(key).toMap(format);
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
