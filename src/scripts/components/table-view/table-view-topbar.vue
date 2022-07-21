<template>
  <section class="mdc-table-view__topbar">
    <ui-button
      v-for="(action, index) in topbarConfig"
      :key="`button-${index}`"
      v-bind="
        action.buttonAttrOrProp || {
          raised: true,
          icon: actionIcon(action)
        }
      "
      @click="handleClick(action)"
    >
      {{ action.text }}
    </ui-button>
  </section>
</template>

<script>
export default {
  name: 'UiTableViewTopbar',
  props: {
    topbarConfig: {
      type: Array,
      default: () => []
    },
    model: {
      type: String,
      default: ''
    },
    defaultParams: {
      type: Object,
      default: () => ({})
    },
    searchFormData: {
      type: Object,
      default: () => ({})
    },
    selectedRows: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    refreshData: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    actionIcon({ icon, type }) {
      let result = icon || '';

      if (!icon) {
        switch (type) {
          case 'import':
            result = 'upload';
            break;
          case 'export':
            result = 'download';
            break;
          default:
            if (/(add|create)$/.test(type)) {
              result = 'add';
            } else if (/(update|modify)$/.test(type)) {
              result = 'update';
            } else if (/(del|delete)$/.test(type)) {
              result = 'delete';
            }
        }
      }

      return result;
    },
    handleClick({ type, routeName }) {
      if (/^multi-.*/.test(type)) {
        // TODO
      } else {
        console.log(routeName || `${this.model}.detail`);
        this.$router.push({
          name: routeName || `${this.model}.detail`
        });
      }
    }
  }
};
</script>
