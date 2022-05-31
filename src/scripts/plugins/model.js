const DEFAULT_OPTIONS = {
  debug: true,
  baseDir: ''
};
let modelOptions = {};

class Model {
  // async getFormConfig(modelName, extension = 'js') {
  //   let formConfig = [];
  //   const formConfigFile = `${modelOptions.baseDir}/${modelName}.${extension}`;
  //   try {
  //     console.log(formConfigFile);
  //     const formConfigModule = await import(formConfigFile);
  //     formConfig =
  //       extension === 'json' ? formConfigModule : formConfigModule.default;
  //   } catch (err) {
  //     modelOptions.debug &&
  //       console.warn(`[BalmUIPro model]: ${err.toString()}`);
  //   }
  //   return formConfig;
  // }
}

const model = new Model();

function install(app, options = {}) {
  modelOptions = Object.assign({}, DEFAULT_OPTIONS, options);

  if (modelOptions.baseDir) {
    app.config.globalProperties.$model = model;
    app.provide('model', model);
  } else {
    console.warn(`[BalmUIPro model]: baseDir missing`);
  }
}

const $model = {
  install
};

const useModel = () => model;

export default $model;
export { install, useModel };
