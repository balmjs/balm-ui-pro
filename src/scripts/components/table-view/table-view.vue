<template>
  <div class="mdc-table-view">
    <h2 v-if="hasTitle" class="mdc-table-view__title">
      <slot name="title">{{ title }}</slot>
    </h2>

    <section v-if="modelPath" class="mdc-table-view__conditions">
      <ui-form-view
        v-model="searchForm.data"
        v-bind="
          Object.assign(
            {
              useGrid: true,
              modelConfig: searchForm.config,
              modelOptions,
              actionConfig: searchActionConfig
            },
            formViewAttrOrProp
          )
        "
        @loaded="initModelData"
        @change:x="handleChange"
        @action="handleAction"
      >
        <slot v-for="(_, name) in $slots" :slot="name" :name="name"></slot>
        <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
          <slot :name="name" v-bind="slotData"></slot>
        </template>
        <!-- Default error message -->
        <template #after-form-view="slotData">
          <template v-if="useValidator">
            <ui-alert v-if="searchForm.message" state="warning">{{
              searchForm.message
            }}</ui-alert>
          </template>
          <slot v-else name="after-form-view" v-bind="slotData"></slot>
        </template>
      </ui-form-view>
    </section>

    <ui-table-view-top-actions
      v-if="topActionConfig.length"
    ></ui-table-view-top-actions>
    <slot v-else name="top-actions" v-bind="this"></slot>

    <section class="mdc-table-view__content">
      <slot name="before-table-view"></slot>

      <template v-if="table.data.length">
        <ui-table
          v-model="table.selectedRows"
          v-bind="
            Object.assign(
              {},
              {
                data: table.data,
                thead,
                tbody
              },
              tableAttrOrProp
            )
          "
        >
          <slot v-for="(_, name) in $slots" :slot="name" :name="name"></slot>
          <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
            <slot :name="name" v-bind="slotData"></slot>
          </template>
          <!-- Default actions -->
          <template #actions="{ data }">
            <ui-table-view-row-actions
              v-if="rowActionConfig.length"
              v-bind="{
                data,
                model,
                modelOptions,
                keyName,
                actionConfig: rowActionConfig,
                actionHandler: rowActionHandler,
                actionRendering: rowActionRendering,
                refreshData: getModelData
              }"
            ></ui-table-view-row-actions>
            <slot v-else name="actions" v-bind="data"></slot>
          </template>
        </ui-table>
        <ui-pagination
          v-if="!withoutPagination"
          v-model="table.page"
          v-bind="
            Object.assign(
              {},
              {
                total: table.total,
                pageSize
              },
              paginationAttrOrProp
            )
          "
          @change="getModelData"
        >
          <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
            <slot :name="name" v-bind="slotData"></slot>
          </template>
          <!-- Default pagination info -->
          <template #default="slotData">
            <slot
              name="pagination"
              v-bind="Object.assign({}, slotData, table)"
            ></slot>
          </template>
        </ui-pagination>
      </template>
      <div v-else class="mdc-table-view__empty">
        <slot name="empty">{{ noData }}</slot>
      </div>

      <slot name="after-table-view"></slot>
    </section>
  </div>
</template>

<script>
import UiTableViewTopActions from './table-view-top-actions';
import UiTableViewRowActions from './table-view-row-actions';
import viewMixins from '../../mixins/view';
import getType from '../../utils/typeof';

const UiTableView = {
  name: 'UiTableView',
  EVENTS: {
    submit: 'submit',
    reset: 'reset'
  }
};

const defaultSearchActionConfig = [
  {
    type: UiTableView.EVENTS.reset,
    text: 'Reset',
    attrOrProp: {
      outlined: true
    }
  },
  {
    type: UiTableView.EVENTS.submit,
    text: 'Search',
    attrOrProp: {
      raised: true
    }
  }
];

export default {
  name: UiTableView.name,
  components: {
    UiTableViewTopActions,
    UiTableViewRowActions
  },
  mixins: [viewMixins],
  props: {
    searchActionConfig: {
      type: Array,
      default: () => defaultSearchActionConfig
    },
    formViewAttrOrProp: {
      type: Object,
      default: () => ({
        formAttrOrProp: {
          actionAlign: 'center'
        }
      })
    },
    noData: {
      type: String,
      default: 'No Data'
    },
    thead: {
      type: Array,
      default: () => []
    },
    tbody: {
      type: Array,
      default: () => []
    },
    rowActionConfig: {
      type: Array,
      default: () => []
    },
    rowActionHandler: {
      type: Function,
      default: () => {}
    },
    rowActionRendering: {
      type: Function,
      default: () => true
    },
    topActionConfig: {
      type: Array,
      default: () => []
    },
    topActionHandler: {
      type: Function,
      default: () => {}
    },
    topActionRendering: {
      type: Function,
      default: () => true
    },
    tableAttrOrProp: {
      type: Object,
      default: () => ({
        fullwidth: true
      })
    },
    tableDataFormat: {
      type: Object,
      default: () => ({
        data: 'data',
        total: 'total'
      })
    },
    pageSize: {
      type: Number,
      default: 10
    },
    paginationAttrOrProp: {
      type: Object,
      default: () => ({
        showTotal: true,
        showJumper: true
      })
    },
    withoutPagination: {
      type: Boolean,
      default: false
    },
    getModelConfigFn: {
      type: Function,
      default: () => {}
    },
    getModelDataFn: {
      type: Function,
      default: () => {}
    },
    useValidator: {
      type: Boolean,
      default: false
    },
    searchOnReset: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // Search data
      searchForm: {
        config: [],
        data: {},
        message: ''
      },
      lastSearchFormData: {}, // cached for last search result
      // Table data
      table: {
        selectedRows: [],
        data: [],
        total: 0,
        page: 1
      },
      tableDataSource: {}
    };
  },
  computed: {
    hasSearchForm() {
      return !!(Array.isArray(this.searchForm.config)
        ? this.searchForm.config.length
        : this.searchForm.config);
    }
  },
  async beforeMount() {
    if (this.modelPath) {
      this.getModelConfig();
    } else {
      this.initModelData();
    }
  },
  activated() {
    // NOTE: refresh data for `<keep-alive>`
    const { keepAlive } = this.$route.meta;
    if (keepAlive === false) {
      this.$set(this.table, 'page', 1);
      this.getModelData();
    }
  },
  methods: {
    async getModelConfig() {
      try {
        const modelConfig = await this.getModelConfigFn(this);
        modelConfig && this.$set(this.searchForm, 'config', modelConfig);
      } catch (err) {
        console.warn(`[${UiTableView.name}]: ${err.toString()}`);
      }
    },
    initModelData(formData = {}) {
      this.searchForm.data = Object.assign(formData, this.defaultModelValue);
      !this.useValidator && this.getModelData();
    },
    async getModelData() {
      try {
        this.tableDataSource = await this.getModelDataFn(this);

        if (getType(this.tableDataSource) === 'object') {
          for (const [key, value] of Object.entries(this.tableDataFormat)) {
            if (this.tableDataSource[value]) {
              this.$set(this.table, key, this.tableDataSource[value]);
            }
          }

          this.lastSearchFormData = Object.assign({}, this.searchForm.data);
        }
      } catch (err) {
        console.warn(`[${UiTableView.name}]: ${err.toString()}`);
      }
    },
    async handleAction(action, result) {
      let canSubmit = true;

      switch (action.type) {
        case UiTableView.EVENTS.submit:
          if (this.useValidator) {
            canSubmit = result.valid;
            this.$set(this.searchForm, 'message', result.message);
          }

          if (canSubmit && action.submit !== false) {
            await this.getModelData();
          }
          break;
        case UiTableView.EVENTS.reset:
          this.$set(this.searchForm, 'message', '');
          // NOTE: automatic processing in `<ui-form-view>`
          if (this.searchOnReset) {
            this.getModelData();
          }
          break;
      }

      canSubmit && this.exposeAction(action, result);
    },
    resetSelectedRows() {
      this.$set(this.table, 'selectedRows', []);
    }
  }
};
</script>
