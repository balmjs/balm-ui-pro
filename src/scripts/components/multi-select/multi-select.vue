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
import { isFunction } from '../../utils/typeof';

// Define multi select constants
const UI_MULTI_SELECT = {
  name: 'UiMultiSelect',
  EVENTS: {
    CHANGE: 'change'
  }
};

export default {
  name: UI_MULTI_SELECT.name,
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
      selectedOptionsMap: {},
      loading: false
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
    components() {
      this.initRootSelectedOptions();
    },
    formData: {
      handler(val) {
        if (JSON.stringify(val) !== JSON.stringify(this.selectedData)) {
          this.updateSelected();
        }
      },
      deep: true
    }
  },
  beforeMount() {
    if (this.components.length) {
      this.initSelectedData();
    } else {
      console.warn(
        `[${UI_MULTI_SELECT.name}]: Form config 'components' are empty`
      );
    }
  },
  methods: {
    initSelectedData() {
      if (!this.hasSelectedOptions) {
        for (const { key, value } of this.components) {
          this.$set(this.selectedData, key, this.formDataSource[key] || value);
          this.$set(this.selectedOptions, key, []);
          this.$set(this.selectedOptionsMap, key, new Map());
        }

        this.initSelectedOptions();
      }
    },
    async initSelectedOptions() {
      const selectedData = Object.assign({}, this.selectedData);

      for await (const key of this.selectedKeys) {
        const index = this.selectedKeys.findIndex(
          (selectedKey) => selectedKey === key
        );
        const parentKey = this.selectedKeys[index - 1];
        const parentValue =
          key === this.rootSelectedKey ? 0 : selectedData[parentKey];

        if (key === this.rootSelectedKey || parentValue) {
          await this.setSelectedOptions(parentValue, this.components[index]);
        }
      }
    },
    initRootSelectedOptions() {
      if (!this.hasSelectedOptions) {
        this.setSelectedOptions(0, this.components[0]);
      }
    },
    async setSelectedOptions(parentValue, { key, options }) {
      const selectedOptionsMap = this.selectedOptionsMap[key];
      let selectedOptions = selectedOptionsMap.get(parentValue) || [];

      if (!selectedOptionsMap.has(parentValue)) {
        let newSelectedOptions = [];
        if (isFunction(options)) {
          const canLoad = key !== this.rootSelectedKey && parentValue;
          if (canLoad && !this.loading) {
            this.loading = true;
            newSelectedOptions = await options(this.selectedData);
            this.loading = false;
          }
        } else {
          newSelectedOptions = options || [];
        }

        if (Array.isArray(newSelectedOptions)) {
          if (newSelectedOptions.length) {
            selectedOptionsMap.set(parentValue, newSelectedOptions);
            selectedOptions = selectedOptionsMap.get(parentValue);
          }
        } else {
          console.warn(
            `[${UI_MULTI_SELECT.name}]: 'options' must return an array`
          );
        }
      }

      this.$set(this.selectedOptions, key, selectedOptions);
    },
    async updateSelected() {
      let updateSelectedKeys = [];
      this.selectedKeys.forEach((key) => {
        const newValue = this.formData[key];
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
    async getNextOptions(key, parentValue) {
      const currentComponent = this.components.find(
        (component) => component.key === key
      );
      const { options } = currentComponent;

      await this.setSelectedOptions(parentValue, { key, options });
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
        await this.getNextSelected(key, value);
      }

      this.$emit(UI_MULTI_SELECT.EVENTS.CHANGE, this.selectedData);
    }
  }
};
</script>
