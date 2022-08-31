import { toRefs, computed } from 'vue';
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

function useView(props, { slots, emit, state, refreshData }) {
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

  const viewPropsData = {
    title,
    model,
    modelAction,
    modelConfig,
    modelPath,
    modelOptions,
    modelValueDefaults,
    keyName
  };

  const hasTitle = computed(() => props.title || slots.title);

  function handleChange(key, value) {
    emit(FORM_VIEW_EVENTS.updateFormItem, key, value, refreshData);
  }

  function exposeAction(action, result = {}) {
    const { handler, ...actionConfig } = action;
    const customHandler = isFunction(handler) ? handler : false;

    const { model, modelOptions, keyName } = props;
    const data = {
      model,
      modelOptions,
      keyName,
      ...toRefs(state),
      ...result
    };

    customHandler
      ? customHandler(actionConfig, data, refreshData)
      : emit(FORM_VIEW_EVENTS.action, actionConfig, data, refreshData);
  }

  return {
    viewPropsData,
    hasTitle,
    handleChange,
    exposeAction
  };
}

export { viewProps, useView };
