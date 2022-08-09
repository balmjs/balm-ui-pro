import getType from '../utils/typeof';

const NAME = '$transform';

class Transform {
  constructor() {
    this.originalDataMap = new Map();
    this.formattedData = {};
  }

  in(data) {
    if (getType(data) === 'object') {
      this.originalDataMap = new Map(Object.entries(data));
    } else {
      throw new Error(`[${NAME}]: invalid object data`);
    }
    return this;
  }

  format(keys, formatFn) {
    const originalData = Object.fromEntries(this.originalDataMap);
    const result = formatFn(originalData);
    for (const [key, value] of Object.entries(result)) {
      this.originalDataMap.set(key, value);
    }

    if (Array.isArray(keys)) {
      keys.forEach((key) => {
        if (this.originalDataMap.has(key)) {
          this.originalDataMap.delete(key);
        }
      });
    } else if (getType(keys) === 'string') {
      const key = keys;
      if (this.originalDataMap.has(key)) {
        this.originalDataMap.delete(key);
      }
    } else {
      throw new Error(`[${NAME}]: out keys must be a string or array`);
    }

    return this;
  }

  out() {
    this.formattedData = Object.fromEntries(this.originalDataMap);
    return this.formattedData;
  }
}

const transform = new Transform();

function install(Vue, options = {}) {
  Vue.prototype.$transform = transform;
}

const $transform = {
  install
};
const useTransform = () => transform;

export default $transform;
export { useTransform };
