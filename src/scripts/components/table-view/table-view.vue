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
        @update:x="handleChange"
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
      v-if="topActionConfig.length"
      v-bind="{
        data: instanceData,
        model,
        modelOptions,
        keyName,
        actionConfig: topActionConfig,
        actionHandler: topActionHandler,
        actionRendering: topActionRendering,
        refreshData: getModelData
      }"
    ></ui-table-view-top-actions>
    <slot v-else name="top-actions" v-bind="instanceData"></slot>

    <section class="mdc-table-view__content">
      <slot name="before-table-view"></slot>

      <div v-if="table.usePlaceholder" class="mdc-table-view__placeholder">
        <ui-spinner v-if="table.loading" active></ui-spinner>
        <slot v-else name="placeholder">{{ placeholder }}</slot>
      </div>
      <template v-else>
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
            @update:model-value="getModelData"
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
      </template>

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
import { reactive, toRefs, computed, onBeforeMount, useSlots } from 'vue';
import { useRoute } from 'vue-router';
import UiTableViewTopActions from './table-view-top-actions.vue';
import UiTableViewRowActions from './table-view-row-actions.vue';
import { viewProps, useView } from '../../mixins/view';
import { useKeepAlive } from '../../mixins/keep-alive';
import getType, { isFunction } from '../../utils/typeof';

const route = useRoute();

const props = defineProps({
  ...viewProps,
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
});
const emit = defineEmits([
  UiTableView.EVENTS.updateFormItem,
  UiTableView.EVENTS.action
]);
const slots = useSlots();

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
    loading: false,
    usePlaceholder: props.useValidator && props.placeholder
  },
  tableDataSource: {}
});
const { searchForm, lastSearchFormData, table } = toRefs(state);

const { viewPropsData, hasTitle, handleChange, exposeAction } = useView(props, {
  slots,
  emit,
  state
});
const hasSearchForm = computed(() => !!(props.modelConfig || props.modelPath));
const instanceData = computed(() =>
  Object.assign({}, viewPropsData, {
    route,
    searchForm: state.searchForm,
    table: state.table,
    tableDataSource: state.tableDataSource
  })
);

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
      props.modelConfig || (await props.getModelConfigFn()(instanceData.value));
    modelConfig && (state.searchForm.config = modelConfig);
  } catch (err) {
    console.warn(`[${UiTableView.name}]: ${err.toString()}`);
  }
}

async function initModelData(formData = {}) {
  state.searchForm.loading = true;
  state.searchForm.data = Object.assign(formData, props.defaultModelValue);
  !props.useValidator && (await getModelData());
  state.searchForm.loading = false;
}

function resetTableData() {
  state.table.selectedRows = [];
  state.table.data = [];
  state.table.total = 0;
  state.table.page = 1;
  state.table.loading = false;
}

async function getModelData() {
  try {
    state.table.loading = true;
    state.tableDataSource = await props.getModelDataFn()(instanceData.value);
    state.table.loading = false;
    state.table.usePlaceholder = false;

    if (getType(state.tableDataSource) === 'object') {
      for (const [key, value] of Object.entries(props.tableDataFormat)) {
        const tableDataValue = isFunction(value)
          ? value(state.tableDataSource)
          : state.tableDataSource[value];

        state.table[key] = tableDataValue;
      }

      state.lastSearchFormData = Object.assign({}, state.searchForm.data);
    }
  } catch (err) {
    state.table.loading = false;
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

// NOTE: for `<keep-alive>`
function refreshComponent() {
  resetTableData();
  getModelData();
}

useKeepAlive(refreshComponent);
</script>
