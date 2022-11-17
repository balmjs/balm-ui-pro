import { isFunction } from '../utils/typeof';

const FORM_VIEW_EVENTS = {
  updateFormItem: 'change:x',
  action: 'action'
};

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    model: {
      type: String,
      required: true
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
  },
  data() {
    return {
      globalModelOptions: {
        $route: this.$route
      }
    };
  },
  computed: {
    viewPropsData() {
      const {
        title,
        model,
        modelAction,
        modelConfig,
        modelPath,
        modelOptions,
        modelValueDefaults,
        keyName
      } = this.$props;

      const validModelOptions = {};
      Object.keys(modelOptions).forEach((key) => {
        if (/^\$/.test(key)) {
          if (key === '$constant') {
            console.warn(
              `Please avoid using '$constant' in modelOptions, please use 'useConstant' instead`
            );
          } else {
            this.$set(this.globalModelOptions, key, modelOptions[key]);
          }
        } else {
          validModelOptions[key] = modelOptions[key];
        }
      });

      return {
        title,
        model,
        modelAction,
        modelConfig,
        modelPath,
        modelOptions: validModelOptions,
        modelValueDefaults,
        keyName,
        refreshData: this.refreshData
      };
    },
    fullInstanceData() {
      return Object.assign({}, this.instanceData, this.globalModelOptions);
    },
    hasTitle() {
      return this.title || this.$slots.title;
    },
    refreshData() {
      return /(UiListView|UiDetailView)$/.test(this.$vnode.tag)
        ? this.getModelData
        : null;
    }
  },
  watch: {
    modelConfig() {
      this.init();
    },
    modelPath() {
      this.init();
    }
  },
  methods: {
    handleChange(key, value) {
      this.$emit(FORM_VIEW_EVENTS.updateFormItem, key, value, this.refreshData);
    },
    exposeAction(action, result = {}) {
      const { handler, ...actionConfig } = action;
      const customHandler = isFunction(handler) ? handler : false;

      const data = {
        ...this.viewPropsData,
        ...this.$data,
        ...result
      };

      customHandler
        ? customHandler(actionConfig, data, this.refreshData)
        : this.$emit(
            FORM_VIEW_EVENTS.action,
            actionConfig,
            data,
            this.refreshData
          );
    }
  }
};
