import prismjs from 'prismjs';

const usePrism = () => prismjs;

export default {
  install(Vue) {
    Vue.prototype.$prism = prismjs;
  }
};
export { usePrism };
