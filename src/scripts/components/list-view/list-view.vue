<template>
  <div class="mdc-list-view">
    <h2 v-if="hasTitle" class="mdc-list-view__title">
      <slot :name="`${namespace}-title`">{{ title }}</slot>
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
        @reload="initModelData"
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
      v-if="topActionConfig.length"
      v-bind="{
        data: instanceData,
        model,
        modelOptions,
        keyName,
        actionConfig: topActionConfig,
        actionHandler: topActionHandler,
        actionRendering: topActionRendering,
        actionIconFormat: topActionIconFormat,
        refreshData: getModelData,
        resetSelectedRows
      }"
    ></ui-list-view-top-actions>
    <slot
      v-else
      :name="`${namespace}-top-actions`"
      v-bind="instanceData"
    ></slot>

    <section class="mdc-list-view__content">
      <slot :name="`before-${namespace}`" v-bind="instanceData"></slot>

      <div v-if="dataList.usePlaceholder" class="mdc-list-view__placeholder">
        <ui-spinner v-if="dataList.loading" active></ui-spinner>
        <slot v-else :name="`${namespace}-placeholder`">{{ placeholder }}</slot>
      </div>
      <template v-else>
        <slot :name="`${namespace}-content`" v-bind="instanceData">
          <ui-table
            v-model="dataList.selectedRows"
            v-bind="
              Object.assign(
                {},
                {
                  data: dataList.data,
                  thead,
                  tbody,
                  fullwidth: true,
                  showProgress: dataList.loading
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
              <ui-list-view-row-actions
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
              ></ui-list-view-row-actions>
              <slot
                v-else
                :name="`${namespace}-row-actions`"
                v-bind="data"
              ></slot>
            </template>
          </ui-table>
        </slot>

        <template v-if="dataList.data.length">
          <ui-pagination
            v-if="!withoutPagination"
            v-model="dataList.page"
            v-bind="
              Object.assign(
                {},
                {
                  total: dataList.total,
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
                v-bind="Object.assign({}, slotData, dataList)"
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
import getType, { isFunction } from '../../utils/typeof';

const UiListView = {
  name: 'UiListView',
  namespace: 'list-view',
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
  name: UiListView.name,
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
    }
  },
  data() {
    return {
      namespace: UiListView.namespace,
      // Search data
      searchForm: {
        config: [],
        data: {},
        message: '',
        loading: false
      },
      lastSearchFormData: {}, // cached for last search result
      // List data
      dataList: {
        selectedRows: [],
        data: [],
        total: 0,
        page: 1,
        pageSize: this.paginationAttrOrProp.pageSize || this.pageSize,
        loading: false,
        usePlaceholder: this.useValidator && this.placeholder
      },
      dataListSource: {}
    };
  },
  computed: {
    hasSearchForm() {
      return !!(this.modelConfig || this.modelPath);
    },
    instanceData() {
      return Object.assign({}, this.viewPropsData, {
        searchForm: this.searchForm,
        dataList: this.dataList,
        dataListSource: this.dataListSource
      });
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
        console.warn(`[${UiListView.name}]: ${err.toString()}`);
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
      this.dataListSource = {};

      this.$set(this.dataList, 'selectedRows', []);
      this.$set(this.dataList, 'data', []);
      this.$set(this.dataList, 'total', 0);
      this.$set(this.dataList, 'page', 1);
      this.$set(this.dataList, 'loading', false);
      this.$set(
        this.dataList,
        'usePlaceholder',
        this.useValidator && this.placeholder
      );
    },
    async getModelData() {
      try {
        this.$set(this.dataList, 'loading', true);
        this.dataListSource = await this.getModelDataFn(this.fullInstanceData);
        this.$set(this.dataList, 'loading', false);
        this.$set(this.dataList, 'usePlaceholder', false);

        if (getType(this.dataListSource) === 'object') {
          for (const [key, value] of Object.entries(this.tableDataFormat)) {
            const dataListValue = isFunction(value)
              ? value(this.dataListSource)
              : this.dataListSource[value];

            this.$set(this.dataList, key, dataListValue);
          }

          this.lastSearchFormData = Object.assign({}, this.searchForm.data);
        }
      } catch (err) {
        this.$set(this.dataList, 'loading', false);
        console.warn(`[${UiListView.name}]: ${err.toString()}`);
      }
    },
    async handleAction(action, result) {
      let canSubmit = true;

      switch (action.type) {
        case UiListView.EVENTS.submit:
          if (this.useValidator) {
            canSubmit = result.valid;
            this.$set(this.searchForm, 'message', result.message);
          }

          if (canSubmit && action.submit !== false) {
            await this.getModelData();
          }
          break;
        case UiListView.EVENTS.reset:
          this.$set(this.searchForm, 'message', '');
          // NOTE: automatic processing in `<ui-form-view>`
          if (this.searchOnReset) {
            this.getModelData();
          }
          break;
      }

      canSubmit && this.exposeAction(action, result);
    },
    // NOTE: for multi actions
    resetSelectedRows() {
      this.$set(this.dataList, 'selectedRows', []);
    },
    // NOTE: for `<keep-alive>`
    refreshComponent() {
      this.resetListData();
      this.getModelData();
    }
  }
};
</script>
