<template>
  <div class="mdc-list-view">
    <h2 v-if="hasTitle" class="mdc-list-view__title">
      <slot :name="`${namespace}-title`" v-bind="instanceData">{{
        title
      }}</slot>
    </h2>

    <section v-if="hasSearchForm" class="mdc-list-view__conditions">
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

    <ui-list-view-top-actions
      v-bind="{
        listViewData: instanceData,
        thead,
        actionConfig: topActionConfig,
        actionHandler: topActionHandler,
        actionRendering: topActionRendering,
        actionIconFormat: topActionIconFormat,
        resetSelectedRows
      }"
      @column-selection="handleColumnSelection"
    >
      <slot v-for="(_, name) in $slots" :slot="name" :name="name"></slot>
      <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
        <slot :name="name" v-bind="slotData"></slot>
      </template>
    </ui-list-view-top-actions>

    <section class="mdc-list-view__content">
      <slot :name="`before-${namespace}`" v-bind="instanceData"></slot>

      <div v-if="listData.usePlaceholder" class="mdc-list-view__placeholder">
        <ui-spinner v-if="listData.loading" active></ui-spinner>
        <slot v-else :name="`${namespace}-placeholder`">{{ placeholder }}</slot>
      </div>
      <template v-else>
        <slot :name="`${namespace}-content`" v-bind="instanceData">
          <ui-table
            v-model="listData.selectedRows"
            v-bind="
              Object.assign(
                {},
                {
                  data: listData.data,
                  thead: listData.thead,
                  tbody: listData.tbody,
                  fullwidth: true,
                  showProgress: listData.loading
                },
                tableAttrOrProp
              )
            "
            v-on="tableListeners"
          >
            <slot v-for="(_, name) in $slots" :slot="name" :name="name"></slot>
            <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
              <slot :name="name" v-bind="slotData"></slot>
            </template>
            <!-- Default actions -->
            <template #actions="{ data }">
              <ui-list-view-row-actions
                v-if="rowActionConfig.length"
                v-bind="{
                  data,
                  listViewData: instanceData,
                  actionConfig: rowActionConfig,
                  actionHandler: rowActionHandler,
                  actionRendering: rowActionRendering
                }"
              ></ui-list-view-row-actions>
              <slot
                v-else
                :name="`${namespace}-row-actions`"
                v-bind="data"
              ></slot>
            </template>
          </ui-table>
        </slot>

        <template v-if="listData.data.length">
          <ui-pagination
            v-if="!withoutPagination"
            v-model="listData.page"
            v-bind="
              Object.assign(
                {},
                {
                  total: listData.total,
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
                :name="`${namespace}-pagination`"
                v-bind="Object.assign({}, slotData, listData)"
              ></slot>
            </template>
          </ui-pagination>
        </template>
        <div v-else class="mdc-list-view__empty">
          <slot :name="`${namespace}-empty`">{{ noData }}</slot>
        </div>
      </template>

      <slot :name="`after-${namespace}`" v-bind="instanceData"></slot>
    </section>
  </div>
</template>

<script>
import UiListViewTopActions from './list-view-top-actions.vue';
import UiListViewRowActions from './list-view-row-actions.vue';
import viewMixin from '../../mixins/view';
import keepAliveMixin from '../../mixins/keep-alive';
import { isObject, isFunction } from '../../utils/typeof';

const UiListView = {
  NAME: 'UiListView',
  NAMESPACE: 'list-view',
  EVENTS: {
    submit: 'submit',
    reset: 'reset'
  }
};

const defaultSearchActionConfig = [
  {
    type: UiListView.EVENTS.reset,
    text: 'Reset',
    attrOrProp: {
      outlined: true
    }
  },
  {
    type: UiListView.EVENTS.submit,
    text: 'Search',
    attrOrProp: {
      raised: true
    }
  }
];

export default {
  name: UiListView.NAME,
  components: {
    UiListViewTopActions,
    UiListViewRowActions
  },
  mixins: [viewMixin, keepAliveMixin],
  props: {
    // Search form
    searchActionConfig: {
      type: Array,
      default: () => defaultSearchActionConfig
    },
    formViewAttrOrProp: {
      type: Object,
      default: () => ({})
    },
    // Data table
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
    topActionIconFormat: {
      type: Object,
      default: () => ({})
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
    tableListeners: {
      type: Object,
      default: () => ({})
    },
    // Pagination
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
    // Model function
    getModelConfigFn: {
      type: Function,
      default: () => {}
    },
    getModelDataFn: {
      type: Function,
      default: () => {}
    },
    // Others
    useValidator: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    searchOnReset: {
      type: Boolean,
      default: false
    },
    forceRefreshData: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      namespace: UiListView.NAMESPACE,
      // Search data
      searchForm: {
        config: [],
        data: {},
        message: '',
        loading: false
      },
      lastSearchFormData: {}, // cached for last search result
      // List data
      listData: {
        selectedRows: [],
        data: [],
        total: 0,
        page: 1,
        pageSize: this.paginationAttrOrProp.pageSize || this.pageSize,
        loading: false,
        usePlaceholder: this.useValidator && this.placeholder,
        thead: this.thead,
        tbody: this.tbody
      },
      listDataSource: {}
    };
  },
  computed: {
    hasSearchForm() {
      return !!(this.modelConfig || this.modelPath);
    },
    instanceData() {
      return Object.assign({}, this.viewPropsData, {
        searchForm: this.searchForm,
        listData: this.listData,
        listDataSource: this.listDataSource
      });
    }
  },
  watch: {
    thead(val) {
      this.$set(this.listData, 'thead', val);
    },
    tbody(val) {
      this.$set(this.listData, 'tbody', val);
    }
  },
  async beforeMount() {
    this.init();
  },
  methods: {
    init() {
      this.resetListData();

      if (this.hasSearchForm) {
        this.setModelConfig();
      } else {
        this.initModelData();
      }
    },
    async setModelConfig() {
      this.searchForm = {
        config: [],
        data: {},
        message: '',
        loading: true
      };

      try {
        const modelConfig =
          this.modelConfig ||
          (await this.getModelConfigFn(this.fullInstanceData));
        modelConfig && this.$set(this.searchForm, 'config', modelConfig);
      } catch (err) {
        console.warn(`[${UiListView.NAME}]: ${err.toString()}`);
      }
    },
    initModelData(formData = {}) {
      this.$set(this.searchForm, 'loading', false);

      this.$nextTick(async () => {
        this.searchForm.data = Object.assign(formData, this.modelValueDefaults);
        !this.useValidator && (await this.getModelData());
      });
    },
    resetListData() {
      this.listDataSource = {};

      this.$set(this.listData, 'selectedRows', []);
      this.$set(this.listData, 'data', []);
      this.$set(this.listData, 'total', 0);
      this.$set(this.listData, 'page', 1);
      this.$set(this.listData, 'loading', false);
      this.$set(
        this.listData,
        'usePlaceholder',
        this.useValidator && this.placeholder
      );
    },
    async getModelData() {
      try {
        this.$set(this.listData, 'loading', true);
        this.listDataSource = await this.getModelDataFn(this.fullInstanceData);
        this.$set(this.listData, 'loading', false);
        this.$set(this.listData, 'usePlaceholder', false);

        if (isObject(this.listDataSource)) {
          for (const [key, value] of Object.entries(this.tableDataFormat)) {
            const listDataValue = isFunction(value)
              ? value(this.listDataSource)
              : this.listDataSource[value];

            this.$set(this.listData, key, listDataValue);
          }

          this.lastSearchFormData = Object.assign({}, this.searchForm.data);
        } else {
          if (this.withoutPagination && Array.isArray(this.listDataSource)) {
            this.$set(this.listData, 'data', this.listDataSource);
          } else {
            console.warn(`[${UiListView.NAME}]: Invalid response data`);
          }
        }

        const { action } = this.tableListeners;
        isFunction(action) &&
          action({
            ...this.viewPropsData,
            ...this.$data
          });
      } catch (err) {
        this.$set(this.listData, 'loading', false);
        console.warn(`[${UiListView.NAME}]: ${err.toString()}`);
      }
    },
    async handleAction(action, result) {
      let canSubmit = true;

      if (this.useValidator) {
        canSubmit = result.valid;
        this.$set(this.searchForm, 'message', result.message);
      }

      this.resetListData();

      switch (action.type) {
        case UiListView.EVENTS.submit:
          if (canSubmit && action.submit !== false) {
            await this.getModelData();
          }
          break;
        case UiListView.EVENTS.reset:
          // NOTE: automatic processing in `<ui-form-view>`
          if (canSubmit && this.searchOnReset) {
            await this.getModelData();
          }
          break;
      }

      canSubmit && this.exposeAction(action, result);
    },
    handleColumnSelection(selectedColumns) {
      const selectedThead = this.thead.filter((_, index) =>
        selectedColumns.includes(index)
      );
      const selectedTbody = this.tbody.filter((_, index) =>
        selectedColumns.includes(index)
      );

      this.$nextTick(() => {
        this.$set(this.listData, 'thead', selectedThead);
        this.$set(this.listData, 'tbody', selectedTbody);
      });
    },
    // NOTE: for `<keep-alive>`
    refreshComponent(noKeepAlive) {
      if (noKeepAlive) {
        this.resetListData();
        this.getModelData();
      } else {
        if (this.forceRefreshData) {
          const canRefreshData = Object.values(this.searchForm.data).some(
            (val) => !!val
          );
          canRefreshData && this.getModelData();
        }
      }
    },
    // expose
    resetSelectedRows(selectedRows = []) {
      this.$set(this.listData, 'selectedRows', selectedRows);
    }
  }
};
</script>
