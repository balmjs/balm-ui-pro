import { generateRandomString } from '../utils/helpers';

const cssClasses = {
  subitemClass: 'mdc-form__subitem'
};

export default {
  props: {
    proConfig: {
      type: Object,
      default: () => ({})
    },
    proFormData: {
      type: Object,
      default: () => ({})
    },
    proFormDataSource: {
      type: Object,
      default: () => ({})
    },
    proComponentKey: {
      type: String,
      default: 'unknown'
    },
    optionFormat: {
      type: Object,
      default: () => ({
        label: 'label',
        value: 'value'
      })
    }
  },
  data() {
    return {
      cssClasses
    };
  },
  computed: {
    currentOptions() {
      return Array.isArray(this.options)
        ? this.options.map((option) => {
            option.uuid = generateRandomString(this.proComponentKey);
            return option;
          })
        : [];
    },
    uuid() {
      return generateRandomString(this.proComponentKey);
    }
  },
  methods: {
    checkOptionFormat(componentName) {
      const { label, value } = this.optionFormat;
      if (!(label && value)) {
        console.error(
          `[${componentName}]: Invalid option format ({ label: string; value: string })`
        );
      }
    }
  }
};
