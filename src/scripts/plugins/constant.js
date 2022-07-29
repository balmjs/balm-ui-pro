const DEFAULTS = {
  listFormat: { label: 'label', value: 'value' },
  mapFormat: { key: 'key', value: 'value' }
};

const constantMap = new Map();

function checkFormat(formatField1, formatField2, keyField) {
  if (!(formatField1 && formatField2)) {
    throw new Error(
      `[$constant]: constant format must assign '${keyField}' and 'value'`
    );
  }
}

class Constant {
  use(key) {
    return constantMap.get(key);
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

    return Object.assign(
      {},
      ...this.use(key).map((data) => ({
        [data[formatKey]]: data[formatValue]
      }))
    );
  }
}

const constant = new Constant();

function install(Vue, options = {}) {
  for (const [key, value] of Object.entries(options)) {
    if (Array.isArray(value)) {
      constantMap.set(key, value);
    }
  }

  Vue.prototype.$constant = constant;
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
export { useConstant, useConstantList, useConstantMap };
