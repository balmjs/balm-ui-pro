<template>
  <div class="mdc-list-view">
    <h2 v-if="hasTitle" class="mdc-list-view__title">
      <slot :name="`${UI_LIST_VIEW.NAMESPACE}-title`" v-bind="instanceData">{{
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
      <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
        <slot :name="slotName" v-bind="slotData"></slot>
      </template>
    </ui-list-view-top-actions>

    <section class="mdc-list-view__content">
      <slot
        :name="`before-${UI_LIST_VIEW.NAMESPACE}`"
        v-bind="instanceData"
      ></slot>

      <div v-if="listData.usePlaceholder" class="mdc-list-view__placeholder">
        <ui-spinner v-if="listData.loading" active></ui-spinner>
        <slot v-else :name="`${UI_LIST_VIEW.NAMESPACE}-placeholder`">{{
          placeholder
        }}</slot>
      </div>
      <template v-else>
        <slot :name="`${UI_LIST_VIEW.NAMESPACE}-content`" v-bind="instanceData">
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
            <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
              <slot :name="slotName" v-bind="slotData"></slot>
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
                :name="`${UI_LIST_VIEW.NAMESPACE}-row-actions`"
                v-bind="data"
              ></slot>
            </template>
          </ui-table>
        </slot>

        <template v-if="listData.total || listData.data.length">
          <ui-pagination
            v-if="usePagination"
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
            @update:model-value="getModelData"
          >
            <template v-for="(_, slotName) in $slots" #[slotName]="slotData">
              <slot :name="slotName" v-bind="slotData"></slot>
            </template>
            <!-- Default pagination info -->
            <template #default="slotData">
              <slot
                :name="`${UI_LIST_VIEW.NAMESPACE}-pagination`"
                v-bind="Object.assign({}, slotData, listData)"
              ></slot>
            </template>
          </ui-pagination>
        </template>
        <div v-else class="mdc-list-view__empty">
          <slot :name="`${UI_LIST_VIEW.NAMESPACE}-empty`">{{ noData }}</slot>
        </div>
      </template>

      <slot
        :name="`after-${UI_LIST_VIEW.NAMESPACE}`"
        v-bind="instanceData"
      ></slot>
    </section>
  </div>
</template>

<script>
const UI_LIST_VIEW = {
  NAME: 'UiListView',
  NAMESPACE: 'list-view',
  EVENTS: {
    updateData: 'change',
    updateFormItem: 'change:x',
    action: 'action',
    reset: 'reset',
    submit: 'submit'
  }
};

const defaultSearchActionConfig = [
  {
    type: UI_LIST_VIEW.EVENTS.reset,
    text: 'Reset',
    attrOrProp: {
      outlined: true
    }
  },
  {
    type: UI_LIST_VIEW.EVENTS.submit,
    text: 'Search',
    attrOrProp: {
      raised: true
    }
  }
];

export default {
  name: UI_LIST_VIEW.NAME,
  customOptions: {}
};
</script>

<script setup>
import {
  reactive,
  toRefs,
  computed,
  watch,
  onBeforeMount,
  useSlots,
  nextTick
} from 'vue';
import { useRoute } from 'vue-router';
import UiListViewTopActions from './list-view-top-actions.vue';
import UiListViewRowActions from './list-view-row-actions.vue';
import { viewProps, useView } from '../../mixins/view';
import { useKeepAlive } from '../../mixins/keep-alive';
import { isObject, isFunction } from '../../utils/typeof';

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
});
const emit = defineEmits([
  UI_LIST_VIEW.EVENTS.updateData,
  UI_LIST_VIEW.EVENTS.updateFormItem,
  UI_LIST_VIEW.EVENTS.action
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
  // List data
  listData: {
    selectedRows: [],
    data: [],
    total: 0,
    page: 1,
    pageSize: props.paginationAttrOrProp.pageSize || props.pageSize,
    loading: false,
    usePlaceholder: props.useValidator && props.placeholder,
    thead: props.thead,
    tbody: props.tbody
  },
  listDataSource: {}
});
const { searchForm, lastSearchFormData, listData } = toRefs(state);

const { globalModelOptions, viewPropsData, handleChange, exposeAction } =
  useView(props, {
    route,
    slots,
    emit,
    state,
    init,
    refreshData: getModelData
  });
const hasTitle = computed(
  () => props.title || slots[`${UI_LIST_VIEW.NAMESPACE}-title`]
);
const instanceData = computed(() =>
  Object.assign({}, viewPropsData, {
    searchForm: state.searchForm,
    listData: state.listData,
    listDataSource: state.listDataSource
  })
);
const fullInstanceData = computed(() =>
  Object.assign({}, globalModelOptions, instanceData.value)
);
const hasSearchForm = computed(() => !!(props.modelConfig || props.modelPath));
const usePagination = computed(() => {
  const pageCount = Math.ceil(state.listData.total / state.listData.pageSize);
  return !props.withoutPagination && pageCount > 1;
});

onBeforeMount(() => {
  init();
});

watch(
  () => props.thead,
  (val) => {
    state.listData.thead = val;
  }
);

watch(
  () => props.tbody,
  (val) => {
    state.listData.tbody = val;
  }
);

function init() {
  resetListData();

  if (hasSearchForm.value) {
    setModelConfig();
  } else {
    initModelData();
  }
}

async function setModelConfig() {
  state.searchForm = {
    config: [],
    data: {},
    message: '',
    loading: true
  };

  try {
    const modelConfig =
      props.modelConfig ||
      (await props.getModelConfigFn()(fullInstanceData.value));
    modelConfig && (state.searchForm.config = modelConfig);
  } catch (err) {
    console.warn(`[${UI_LIST_VIEW.NAME}]: ${err.toString()}`);
  }
}

function initModelData(formData = {}) {
  state.searchForm.loading = false;

  nextTick(async () => {
    state.searchForm.data = Object.assign(formData, props.modelValueDefaults);
    !state.listData.usePlaceholder && (await getModelData());
  });
}

function resetListData() {
  state.listDataSource = {};

  state.listData.selectedRows = [];
  state.listData.data = [];
  state.listData.total = 0;
  state.listData.page = 1;
  state.listData.loading = false;
  state.listData.usePlaceholder = props.useValidator && props.placeholder;
}

async function getModelData() {
  try {
    state.listData.loading = true;
    state.listDataSource = await props.getModelDataFn()(fullInstanceData.value);
    state.listData.loading = false;
    state.listData.usePlaceholder = false;

    if (isObject(state.listDataSource)) {
      for (const [key, value] of Object.entries(props.tableDataFormat)) {
        const listDataValue = isFunction(value)
          ? value(state.listDataSource)
          : state.listDataSource[value];

        state.listData[key] = listDataValue;
      }

      state.lastSearchFormData = Object.assign({}, state.searchForm.data);
    } else {
      if (props.withoutPagination && Array.isArray(state.listDataSource)) {
        state.listData.data = state.listDataSource;
      } else {
        console.warn(`[${UI_LIST_VIEW.NAME}]: Invalid response data`);
      }
    }

    const listViewData = {
      ...viewPropsData,
      ...toRefs(state)
    };
    emit(UI_LIST_VIEW.EVENTS.updateData, listViewData);

    const { action } = props.tableListeners;
    isFunction(action) && action(listViewData);
  } catch (err) {
    state.listData.loading = false;
    console.warn(`[${UI_LIST_VIEW.NAME}]: ${err.toString()}`);
  }
}

async function handleAction(action, result) {
  let canSubmit = true;

  if (props.useValidator) {
    canSubmit = result.valid;
    state.searchForm.message = result.message;
  }

  switch (action.type) {
    case UI_LIST_VIEW.EVENTS.submit:
      resetListData();
      if (canSubmit && action.submit !== false) {
        await getModelData();
      }
      break;
    case UI_LIST_VIEW.EVENTS.reset:
      resetListData();
      // NOTE: automatic processing in `<ui-form-view>`
      if (canSubmit && props.searchOnReset) {
        await getModelData();
      }
      break;
  }

  canSubmit && exposeAction(action, result);
}

function handleColumnSelection(selectedColumns) {
  const selectedThead = props.thead.filter((_, index) =>
    selectedColumns.includes(index)
  );
  const selectedTbody = props.tbody.filter((_, index) =>
    selectedColumns.includes(index)
  );

  nextTick(() => {
    state.listData.thead = selectedThead;
    state.listData.tbody = selectedTbody;
  });
}

// NOTE: for `<keep-alive>`
function refreshComponent(noKeepAlive) {
  if (noKeepAlive) {
    resetListData();
    getModelData();
  } else {
    if (props.forceRefreshData) {
      const canRefreshData = Object.values(state.searchForm.data).some(
        (val) => !!val
      );
      canRefreshData && getModelData();
    }
  }
}

useKeepAlive(refreshComponent);

// expose
function resetSelectedRows() {
  state.listData.selectedRows = [];
}

defineExpose({
  resetSelectedRows
});
</script>
