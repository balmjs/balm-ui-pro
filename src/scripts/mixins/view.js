import { toRefs, computed, watch } from 'vue';
import { isFunction } from '../utils/typeof';

const FORM_VIEW_EVENTS = {
  updateFormItem: 'change:x',
  action: 'action'
};

const viewProps = {
  title: {
    type: String,
    default: ''
  },
  model: {
    type: String,
    default: ''
  },
  modelAction: {
    type: String,
    default: ''
  },
  modelConfig: {
    type: [Array, Function, Boolean],
    default: false
  },
  modelPath: {
    type: String,
    default: ''
  },
  modelOptions: {
    type: Object,
    default: () => ({})
  },
  modelValueDefaults: {
    type: Object,
    default: () => ({})
  },
  keyName: {
    type: [String, Array],
    default: 'id'
  }
};

function useView(props, { route, slots, emit, state, init, refreshData }) {
  const {
    title,
    model,
    modelAction,
    modelConfig,
    modelPath,
    modelOptions,
    modelValueDefaults,
    keyName
  } = props;

  let globalModelOptions = {
    route
  };

  const validModelOptions = {};
  Object.keys(modelOptions).forEach((key) => {
    if (/^\$/.test(key)) {
      if (key === '$constant') {
        console.warn(
          `Please avoid using '$constant' in modelOptions, please use 'useConstant' instead`
        );
      } else {
        globalModelOptions[key] = modelOptions[key];
      }
    } else {
      validModelOptions[key] = modelOptions[key];
    }
  });

  const viewPropsData = {
    title,
    model,
    modelAction,
    modelConfig,
    modelPath,
    modelOptions: validModelOptions,
    modelValueDefaults,
    keyName,
    refreshData
  };

  watch(
    () => props.modelConfig,
    () => {
      init();
    }
  );

  watch(
    () => props.modelPath,
    () => {
      init();
    }
  );

  function handleChange(key, value) {
    emit(FORM_VIEW_EVENTS.updateFormItem, key, value, refreshData);
  }

  function exposeAction(action, result = {}) {
    const { handler, ...actionConfig } = action;
    const customHandler = isFunction(handler) ? handler : false;

    const data = {
      ...viewPropsData,
      ...toRefs(state),
      ...result
    };

    customHandler
      ? customHandler(actionConfig, data, refreshData)
      : emit(FORM_VIEW_EVENTS.action, actionConfig, data, refreshData);
  }

  return {
    globalModelOptions,
    viewPropsData,
    handleChange,
    exposeAction
  };
}

export { viewProps, useView };
