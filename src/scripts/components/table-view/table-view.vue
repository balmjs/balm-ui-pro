<template>
  <div class="mdc-table-view">
    <h2 v-if="hasTitle" class="mdc-table-view__title">
      <slot name="title">{{ title }}</slot>
    </h2>

    <section v-if="hasSearchForm" class="mdc-table-view__conditions">
      <ui-spinner v-if="searchForm.loading" active></ui-spinner>
      <ui-form-view
        v-show="!searchForm.loading"
        v-model="searchForm.data"
        v-bind="
          Object.assign(
            {
              useGrid: true,
              modelConfig: searchForm.config,
              modelOptions,
              actionConfig: searchActionConfig,
              formAttrOrProp: {
                actionAlign: 'center'
              }
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

      <ui-table
        v-model="table.selectedRows"
        v-bind="
          Object.assign(
            {},
            {
              data: table.data,
              thead,
              tbody,
              fullwidth: true,
              showProgress: table.loading
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

      <template v-if="table.data.length">
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
import viewMixin from '../../mixins/view';
import keepAliveMixin from '../../mixins/keep-alive';
import getType, { isFunction } from '../../utils/typeof';

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
  mixins: [viewMixin, keepAliveMixin],
  props: {
    searchActionConfig: {
      type: Array,
      default: () => defaultSearchActionConfig
    },
    formViewAttrOrProp: {
      type: Object,
      default: () => ({})
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
      default: () => ({})
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
        message: '',
        loading: false
      },
      lastSearchFormData: {}, // cached for last search result
      // Table data
      table: {
        selectedRows: [],
        data: [],
        total: 0,
        page: 1,
        loading: false
      },
      tableDataSource: {}
    };
  },
  computed: {
    hasSearchForm() {
      return !!(this.modelConfig || this.modelPath);
    }
  },
  async beforeMount() {
    if (this.hasSearchForm) {
      this.setModelConfig();
    } else {
      this.initModelData();
    }
  },
  methods: {
    async setModelConfig() {
      try {
        const modelConfig =
          this.modelConfig || (await this.getModelConfigFn(this));
        modelConfig && this.$set(this.searchForm, 'config', modelConfig);
      } catch (err) {
        console.warn(`[${UiTableView.name}]: ${err.toString()}`);
      }
    },
    async initModelData(formData = {}) {
      this.$set(this.searchForm, 'loading', true);
      this.searchForm.data = Object.assign(formData, this.defaultModelValue);
      !this.useValidator && (await this.getModelData());
      this.$set(this.searchForm, 'loading', false);
    },
    resetTableData() {
      this.$set(this.table, 'selectedRows', []);
      this.$set(this.table, 'data', []);
      this.$set(this.table, 'total', 0);
      this.$set(this.table, 'page', 1);
      this.$set(this.table, 'loading', false);
    },
    async getModelData() {
      try {
        this.$set(this.table, 'loading', true);
        this.tableDataSource = await this.getModelDataFn(this);
        this.$set(this.table, 'loading', false);

        if (getType(this.tableDataSource) === 'object') {
          for (const [key, value] of Object.entries(this.tableDataFormat)) {
            const tableDataValue = isFunction(value)
              ? value(this.tableDataSource)
              : this.tableDataSource[value];

            this.$set(this.table, key, tableDataValue);
          }

          this.lastSearchFormData = Object.assign({}, this.searchForm.data);
        }
      } catch (err) {
        this.$set(this.table, 'loading', false);
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
    },
    // NOTE: for `<keep-alive>`
    refreshComponent() {
      this.resetTableData();
      this.getModelData();
    }
  }
};
</script>
