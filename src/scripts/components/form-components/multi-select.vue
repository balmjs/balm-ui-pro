<template>
  <div :class="['mdc-multi-select', cssClasses]">
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
import { cssClasses } from './constants';
import getType from '../../utils/typeof';

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
      cssClasses,
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
    hasSelectedValue() {
      return this.selectedKeys.some((key) => this.selectedData[key]);
    },
    hasSelectedOptions() {
      const rootSelectedOptions = this.selectedOptions[this.rootSelectedKey];
      return Array.isArray(rootSelectedOptions) && !!rootSelectedOptions.length;
    }
  },
  watch: {
    components() {
      this.initRootOptions(); // NOTE: for static options
    },
    formData: {
      handler(val) {
        this.updateOptions(val);
      },
      deep: true,
      immediate: true // NOTE: for dynamic form config
    }
  },
  mounted() {
    if (this.components.length) {
      this.initOptions();
    } else {
      console.warn('[UiMultiSelect]: `components` are empty');
    }
  },
  methods: {
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

        const selectedOptions =
          getType(options) === 'function'
            ? await options(currentFormData)
            : options;

        if (selectedOptions.length) {
          optionsMap.set(parentValue, selectedOptions);
        }
      }

      const selectedOptions = optionsMap.get(parentValue) || [];
      this.$set(this.selectedOptions, key, selectedOptions);
    },
    initRootOptions() {
      if (!this.hasSelectedOptions) {
        this.setSelectedOptions(0, this.components[0]);
      }
    },
    async initOptions() {
      if (!this.hasSelectedValue) {
        for (const { key, value } of this.components) {
          this.$set(this.selectedData, key, value);
          this.$set(this.selectedOptions, key, []);
          this.$set(this.optionsMap, key, new Map());
        }
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
