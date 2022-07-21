<template>
  <div class="mdc-table-view">
    <h2 v-if="hasTitle" class="mdc-table-view__title">
      <slot name="title">{{ title }}</slot>
    </h2>
    <section v-if="hasSearchForm" class="mdc-table-view__conditions">
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
    <ui-table-view-topbar
      v-if="topbarConfig.length"
      v-bind="{
        topbarConfig,
        model,
        topbarActionHandler,
        defaultParams,
        selectedRows: table.selectedRows,
        tableData: table.data,
        searchFormData: lastSearchFormData,
        refreshData: getModelData
      }"
    ></ui-table-view-topbar>
    <section class="mdc-table-view__content">
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
            <ui-table-view-actions
              v-if="actionConfig.length"
              v-bind="{
                actionConfig,
                requestConfig,
                model,
                data,
                keyName,
                refreshData: getModelData
              }"
            ></ui-table-view-actions>
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
      <div v-else class="mdc-table-view__no-data">
        <slot name="no-data">{{ noData }}</slot>
      </div>
    </section>
  </div>
</template>

<script>
import UiTableViewTopbar from './table-view-topbar';
import UiTableViewActions from './table-view-actions';
import viewMixins from '../../mixins/view';

const UiTableView = {
  EVENTS: {
    reset: 'reset',
    submit: 'submit'
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
  name: 'UiTableView',
  components: {
    UiTableViewTopbar,
    UiTableViewActions
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
    actionConfig: {
      type: Array,
      default: () => []
    },
    topbarConfig: {
      type: Array,
      default: () => []
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
        total: 'total',
        page: 'page'
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
    needSearch: {
      type: Boolean,
      default: false
    },
    topbarActionHandler: {
      type: Function,
      default: () => {}
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
      lastSearchFormData: {}, // cache for last search result
      // Table data
      table: {
        selectedRows: [],
        data: [],
        total: 0,
        page: 1
      }
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
    if (this.model) {
      await this.getModelConfig();
    }
    if (!this.needSearch) {
      await this.getModelData();
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
        this.$set(this.searchForm, 'config', modelConfig);
      } catch (e) {
        console.log(e);
      }
    },
    async getModelData() {
      try {
        const data = await this.getModelDataFn(this);

        for (const [key, value] of Object.entries(this.tableDataFormat)) {
          if (data[value]) {
            this.$set(this.table, key, data[value]);
          }
        }

        this.lastSearchFormData = Object.assign({}, this.searchForm.data);
      } catch (e) {
        console.log(e);
      }
    },
    async handleAction(result) {
      const { type, message } = result;

      switch (type) {
        case UiTableView.EVENTS.submit:
          if (this.useValidator) {
            this.$set(this.searchForm, 'message', message);
          }
          await this.getModelData();
          break;
        case UiTableView.EVENTS.reset:
          // NOTE: automatic processing in `<ui-form-view>`
          break;
      }

      if (type !== UiTableView.EVENTS.reset) {
        this.$emit(type, result, this);
      }
    },
    resetSelectedRows() {
      this.$set(this.table, 'selectedRows', []);
    }
  }
};
</script>
