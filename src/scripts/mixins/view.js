const viewProps = {
  requestConfig: {
    type: Object,
    default: () => ({})
  },
  title: {
    type: String,
    default: ''
  },
  model: {
    type: String,
    default: '',
    required: true
  },
  modelName: {
    type: String,
    default: ''
  },
  formModelOptions: {
    type: Object,
    default: () => ({})
  },
  formViewAttrOrProp: {
    type: Object,
    default: () => ({})
  },
  routeName: {
    type: String,
    default: ''
  },
  keyName: {
    type: String,
    default: 'id'
  },
  defaultParams: {
    type: Object,
    default: () => ({})
  },
  validations: {
    type: Object,
    default: () => ({})
  }
};

function useView(props, { instance, state }) {
  const useValidator = computed(() => Object.keys(props.validations).length);

  function onSubmit(formData, fn, params = '') {
    if (useValidator) {
      const { valid, message } = instance.$validate(formData);
      state.errorMessage = message;

      if (valid) {
        fn(params);
      }
    } else {
      state.errorMessage = '';
      fn(params);
    }
  }

  return onSubmit;
}

export { viewProps, useView };
