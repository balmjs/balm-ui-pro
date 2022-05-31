import prismjs from 'prismjs';

const usePrism = () => prismjs;

export default {
  install(app) {
    app.config.globalProperties.$prism = prismjs;
  }
};
export { usePrism };
