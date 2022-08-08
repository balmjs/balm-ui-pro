<template>
  <div :class="['mdc-multi-select', cssClasses.subitemClass]">
    <ui-select
      v-for="(component, index) in components"
      :key="`${component.key}-${index}`"
      v-model="selectedData[component.key]"
      :options="selectedOptions[component.key]"
      v-bind="component.attrOrProp || {}"
      @change="handleChange(component.key, $event)"
    ></ui-select>
  </div>
</template>

<script>
import formItemMixin from '../../mixins/form-item';
import getType, { isFunction } from '../../utils/typeof';

// Define multi select constants
const UI_MULTI_SELECT = {
  EVENTS: {
    CHANGE: 'change'
  }
};

export default {
  name: 'UiMultiSelect',
  mixins: [formItemMixin],
  props: {
    components: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedData: {},
      selectedOptions: {},
      optionsMap: {}
    };
  },
  computed: {
    selectedKeys() {
      return this.components.map(({ key }) => key);
    },
    rootSelectedKey() {
      return this.selectedKeys[0];
    },
    lastSelectedKey() {
      return this.selectedKeys[this.selectedKeys.length - 1];
    },
    hasSelectedOptions() {
      const rootSelectedOptions = this.selectedOptions[this.rootSelectedKey];
      return Array.isArray(rootSelectedOptions) && !!rootSelectedOptions.length;
    }
  },
  watch: {
    components: {
      handler() {
        this.initRootOptions(); // NOTE: for static options
      },
      immediate: true // NOTE: for dynamic form config
    },
    formData: {
      handler(val) {
        this.updateOptions(val);
      },
      deep: true,
      immediate: true // NOTE: for dynamic form config
    }
  },
  beforeMount() {
    if (this.components.length) {
      this.initOptions();
    } else {
      console.warn('[UiMultiSelect]: form config `components` are empty');
    }
  },
  methods: {
    initOptions() {
      if (!this.hasSelectedOptions) {
        for (const { key, value } of this.components) {
          this.$set(this.selectedData, key, value);
          this.$set(this.selectedOptions, key, []);
          this.$set(this.optionsMap, key, new Map());
        }
      }
    },
    async setSelectedOptions(parentValue, { key, options }) {
      let optionsMap = this.optionsMap[key];

      if (getType(optionsMap) !== 'map') {
        optionsMap = new Map();
      }

      if (!optionsMap.has(parentValue)) {
        const currentFormData = Object.assign(
          {},
          this.formData,
          this.selectedData
        );

        const selectedOptions = isFunction(options)
          ? await options(currentFormData)
          : options || [];

        if (Array.isArray(selectedOptions)) {
          if (selectedOptions.length) {
            optionsMap.set(parentValue, selectedOptions);
          }
        } else {
          console.warn('[UiMultiSelect]: `options` must return an array');
        }
      }

      const selectedOptions = optionsMap.get(parentValue) || [];
      this.$set(this.selectedOptions, key, selectedOptions);
    },
    initRootOptions() {
      if (!this.hasSelectedOptions) {
        this.initOptions();
        this.setSelectedOptions(0, this.components[0]);
      }
    },
    async updateOptions(formData) {
      let updateSelectedKeys = [];
      this.selectedKeys.forEach((key) => {
        const newValue = formData[key];
        if (this.selectedData[key] !== newValue) {
          this.$set(this.selectedData, key, newValue);

          if (newValue) {
            updateSelectedKeys.push({
              key,
              newValue
            });
          }
        }
      });

      if (updateSelectedKeys.length) {
        for await (const { key, newValue } of updateSelectedKeys) {
          if (key !== this.lastSelectedKey) {
            await this.getNextSelected(key, newValue);
          }
        }
      }
    },
    async getNextSelected(parentKey, parentValue) {
      const selectedIndex = this.selectedKeys.findIndex(
        (key) => key === parentKey
      );
      const nextSelectedKey = this.selectedKeys[selectedIndex + 1];
      if (nextSelectedKey) {
        parentValue
          ? await this.getNextOptions(nextSelectedKey, parentValue)
          : this.clearSelectedData(selectedIndex);
      }
    },
    getNextOptions(key, parentValue) {
      const currentComponent = this.components.find(
        (component) => component.key === key
      );
      const { options } = currentComponent;

      this.setSelectedOptions(parentValue, { key, options });
    },
    clearSelectedData(parentIndex) {
      const nextSelectedDataKeys = this.selectedKeys.filter(
        (key, index) => index > parentIndex
      );
      nextSelectedDataKeys.forEach((key) => {
        this.$set(this.selectedData, key, '');
        this.$set(this.selectedOptions, key, []);
      });
    },
    async handleChange(key, value) {
      this.$set(this.selectedData, key, value);
      if (key !== this.lastSelectedKey) {
        this.getNextSelected(key, value);
      }

      this.$emit(UI_MULTI_SELECT.EVENTS.CHANGE, this.selectedData);
    }
  }
};
</script>
