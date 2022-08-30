import '@mock-server';

const MOCK = true;

const useMock = () => MOCK;

export default {
  install(app) {
    app.config.globalProperties.$mock = MOCK;
  }
};
export { useMock };
