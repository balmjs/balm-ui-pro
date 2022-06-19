<template>
  <div :class="['mdc-multi-select', cssClasses]">
    <ui-select
      v-for="(component, index) in components"
      :key="`${component.key}-${index}`"
      v-model="selectedData[component.key]"
      :options="optionsMap[component.key]"
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
      selectedDataSource: {},
      optionsMap: {},
      subOptionsSourceMap: {}
    };
  },
  computed: {
    selectedDataKeys() {
      return this.components.map(({ key }) => key);
    },
    hasRootOptions() {
      let result = false;
      if (this.components.length) {
        const { key, options } = this.components[0];
        result =
          getType(options) !== 'undefined' &&
          Array.isArray(this.optionsMap[key]) &&
          this.optionsMap[key].length;
      }
      return result;
    }
  },
  watch: {
    components() {
      if (!this.hasRootOptions) {
        this.initRootOptions();
      }
    },
    formData: {
      handler(val) {
        if (this.hasRootOptions) {
          this.selectedDataKeys.forEach((key) => {
            const value = val[key];
            if (this.selectedDataSource[key] !== value) {
              this.$set(this.selectedDataSource, key, value);
              this.getNextSelectKey(key, value);
            }
          });
        }
      },
      deep: true
    }
  },
  beforeMount() {
    this.initFormData();
  },
  methods: {
    initFormData() {
      if (this.components.length) {
        for (const { key, value } of this.components) {
          this.$set(this.selectedData, key, value);
          this.$set(this.optionsMap, key, []);
          this.$set(this.subOptionsSourceMap, key, new Map());
        }
        this.$emit('change', this.selectedData);
      } else {
        console.warn('components are empty');
      }
    },
    async initRootOptions() {
      const { key, options } = this.components[0];
      const rootOptions =
        getType(options) === 'function'
          ? await options(this.formData)
          : options;
      this.$set(this.optionsMap, key, rootOptions);
    },
    getNextSelectKey(parentKey, parentValue) {
      const index = this.selectedDataKeys.findIndex((key) => key === parentKey);
      const nextKey = this.selectedDataKeys[index + 1];
      if (nextKey) {
        parentValue
          ? this.getNextOptions(nextKey)
          : this.resetSelectedData(index);
      }
    },
    async getNextOptions(currentKey) {
      const currentComponent = this.components.find(
        ({ key }) => key === currentKey
      );
      const { options } = currentComponent;
      const currentOptions =
        getType(options) === 'function'
          ? await options(this.formData)
          : options;
      this.$set(this.optionsMap, currentKey, currentOptions);
    },
    resetSelectedData(parentIndex) {
      const nextSelectedDataKeys = this.selectedDataKeys.filter(
        (key, index) => index > parentIndex
      );
      nextSelectedDataKeys.forEach((key) => {
        this.$set(this.selectedDataSource, key, '');
        this.$set(this.selectedData, key, '');
        this.$set(this.optionsMap, key, []);
      });
      this.$emit('change', this.selectedData);
    },
    async handleChange(key, value) {
      this.$set(this.selectedData, key, value);
      this.$emit('change', this.selectedData);
    }
  }
};
</script>
