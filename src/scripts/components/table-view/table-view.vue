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

    <ui-table-view-topbar v-if="topbarConfig.length"></ui-table-view-topbar>
    <slot v-else name="topbar" v-bind="instance"></slot>

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
          <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
            <slot :name="slotName" v-bind="slotData"></slot>
          </template>
          <!-- Default actions -->
          <template #actions="{ data }">
            <ui-table-view-actions
              v-if="actionConfig.length"
              v-bind="{
                actionConfig,
                model,
                data,
                keyName,
                actionHandler,
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
const name = 'UiTableView';

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
  name,
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
import UiTableViewTopbar from './table-view-topbar';
import UiTableViewActions from './table-view-actions';
import { viewProps, useView } from '../../mixins/view';

const route = useRoute();

const props = defineProps({
  ...viewProps,
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
  actionHandler: {
    type: Function,
    default: () => {}
  },
  actionRendering: {
    type: Function,
    default: () => true
  },
  topbarConfig: {
    type: Array,
    default: () => []
  },
  topbarHandler: {
    type: Function,
    default: () => {}
  },
  topbarRendering: {
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
  }
});
let emit = defineEmits([]);
const slots = useSlots();

const instance = getCurrentInstance();
const state = reactive({
  // Search data
  searchForm: {
    config: [],
    data: {},
    message: ''
  },
  lastSearchFormData: {}, // cache for last search result
  // Table data
  tableDataSource: {},
  table: {
    selectedRows: [],
    data: [],
    total: 0,
    page: 1
  }
});
const { searchForm, lastSearchFormData, table } = toRefs(state);

const { hasTitle } = useView(props, slots);
const hasSearchForm = computed(
  () =>
    !!(Array.isArray(state.searchForm.config)
      ? state.searchForm.config.length
      : state.searchForm.config)
);

onActivated(() => {
  // NOTE: refresh data for `<keep-alive>`
  const { keepAlive } = route.meta;
  if (keepAlive === false) {
    state.table.page = 1;
    getModelData();
  }
});

onBeforeMount(async () => {
  if (props.model) {
    await getModelConfig();
  }
  if (!props.useValidator) {
    await getModelData();
  }
});

async function getModelConfig() {
  try {
    const modelConfig = await props.getModelConfigFn(instance);
    state.searchForm.config = modelConfig;
  } catch (e) {
    console.log(e);
  }
}

async function getModelData() {
  try {
    state.tableDataSource = await props.getModelDataFn(instance);

    for (const [key, value] of Object.entries(props.tableDataFormat)) {
      if (state.tableDataSource[value]) {
        state.table[key] = state.tableDataSource[value];
      }
    }

    state.lastSearchFormData = Object.assign({}, state.searchForm.data);
  } catch (e) {
    console.log(e);
  }
}

async function handleAction(result) {
  const { type } = result;

  switch (type) {
    case UiTableView.EVENTS.submit:
      let canSubmit = true;

      if (props.useValidator) {
        canSubmit = result.valid;
        state.searchForm.message = result.message;
      }

      canSubmit && (await getModelData());
      break;
    case UiTableView.EVENTS.reset:
      state.searchForm.message = '';
      // NOTE: automatic processing in `<ui-form-view>`
      break;
  }

  type === UiTableView.EVENTS.reset
    ? emit(type, instance)
    : emit(type, result, instance);
}

function resetSelectedRows() {
  state.table.selectedRows = [];
}
</script>
