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
        <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
          <slot :name="slotName" v-bind="slotData"></slot>
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
      v-if="table.data.length && topActionConfig.length"
    ></ui-table-view-top-actions>
    <slot v-else name="top-actions" v-bind="instance"></slot>

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
        <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
          <slot :name="slotName" v-bind="slotData"></slot>
        </template>
        <!-- Default actions -->
        <template #actions="{ data }">
          <ui-table-view-row-actions
            v-if="actionConfig.length"
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
          <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
            <slot :name="slotName" v-bind="slotData"></slot>
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
const UiTableView = {
  name: 'UiTableView',
  EVENTS: {
    updateFormItem: 'change:x',
    action: 'action',
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
  name: UiTableView.name,
  customOptions: {}
};
</script>

<script setup>
import {
  reactive,
  toRefs,
  computed,
  onActivated,
  onBeforeMount,
  useSlots,
  getCurrentInstance
} from 'vue';
import { useRoute } from 'vue-router';
import UiTableViewTopActions from './table-view-top-actions';
import UiTableViewRowActions from './table-view-row-actions';
import { viewProps, useView } from '../../mixins/view';
import getType, { isFunction } from '../../utils/typeof';

const route = useRoute();

const props = defineProps({
  ...viewProps,
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
});
const emit = defineEmits([
  UiTableView.EVENTS.updateFormItem,
  UiTableView.EVENTS.action
]);
const slots = useSlots();

const instance = getCurrentInstance();
const state = reactive({
  // Search data
  searchForm: {
    config: [],
    data: {},
    message: '',
    loading: false
  },
  lastSearchFormData: {}, // cache for last search result
  // Table data
  table: {
    selectedRows: [],
    data: [],
    total: 0,
    page: 1,
    loading: false
  },
  tableDataSource: {}
});
const { searchForm, lastSearchFormData, table } = toRefs(state);

const { hasTitle, handleChange, exposeAction } = useView(props, {
  slots,
  emit,
  state
});
const hasSearchForm = computed(() => !!(props.modelConfig || props.modelPath));

onActivated(() => {
  const { matched } = route;
  const noKeepAlive = matched.some((route) => route.meta?.keepAlive === false);

  // NOTE: refresh data for `<keep-alive>`
  if (noKeepAlive) {
    resetTableData();
    getModelData();
  }
});

onBeforeMount(() => {
  if (hasSearchForm.value) {
    setModelConfig();
  } else {
    initModelData();
  }
});

async function setModelConfig() {
  try {
    const modelConfig =
      props.modelConfig || (await props.getModelConfigFn(instance));
    modelConfig && (state.searchForm.config = modelConfig);
  } catch (err) {
    console.warn(`[${UiTableView.name}]: ${err.toString()}`);
  }
}

async function initModelData(formData = {}) {
  this.searchForm.loading = true;
  this.searchForm.data = Object.assign(formData, props.defaultModelValue);
  !props.useValidator && (await getModelData());
  this.searchForm.loading = false;
}

function resetTableData() {
  this.table.selectedRows = [];
  this.table.data = [];
  this.table.total = 0;
  this.table.page = 1;
  this.table.loading = false;
}

async function getModelData() {
  try {
    this.searchForm.loading = true;
    state.tableDataSource = await props.getModelDataFn(instance);
    this.searchForm.loading = false;

    if (getType(this.tableDataSource) === 'object') {
      for (const [key, value] of Object.entries(props.tableDataFormat)) {
        const tableDataValue = isFunction(value)
          ? value(state.tableDataSource)
          : state.tableDataSource[value];

        state.table[key] = tableDataValue;
      }

      state.lastSearchFormData = Object.assign({}, state.searchForm.data);
    }
  } catch (err) {
    this.searchForm.loading = false;
    console.warn(`[${UiTableView.name}]: ${err.toString()}`);
  }
}

async function handleAction(action, result) {
  let canSubmit = true;

  switch (action.type) {
    case UiTableView.EVENTS.submit:
      if (props.useValidator) {
        canSubmit = result.valid;
        state.searchForm.message = result.message;
      }

      if (canSubmit && action.submit !== false) {
        await getModelData();
      }
      break;
    case UiTableView.EVENTS.reset:
      state.searchForm.message = '';
      // NOTE: automatic processing in `<ui-form-view>`
      if (props.searchOnReset) {
        getModelData();
      }
      break;
  }

  canSubmit && exposeAction(action, result);
}

function resetSelectedRows() {
  state.table.selectedRows = [];
}
</script>
