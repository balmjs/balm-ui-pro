import '@mock-server';

const MOCK = true;

const useMock = () => MOCK;

export default {
  install(Vue) {
    Vue.prototype.$mock = MOCK;
  }
};
export { useMock };
