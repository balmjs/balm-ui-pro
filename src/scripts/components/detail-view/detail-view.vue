<template>
  <div class="mdc-detail-view">
    <h2 v-if="hasTitle" class="mdc-detail-view__title">
      <slot :name="`${UI_DETAIL_VIEW.NAMESPACE}-title`">{{ title }}</slot>
    </h2>

    <section class="mdc-detail-view__content">
      <slot
        :name="`before-${UI_DETAIL_VIEW.NAMESPACE}`"
        v-bind="instanceData"
      ></slot>

      <ui-spinner v-if="loading" active></ui-spinner>
      <ui-form-view
        v-show="!loading"
        v-model="formData"
        v-bind="
          Object.assign(
            {
              modelConfig: formConfig,
              modelOptions,
              actionConfig,
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
          <slot :name="slotName" v-bind="getSlotData(slotData)"></slot>
        </template>
        <!-- Default error message -->
        <template #after-form-view="slotData">
          <template v-if="useValidator">
            <ui-alert v-if="message" state="warning">{{ message }}</ui-alert>
          </template>
          <slot
            v-else
            name="after-form-view"
            v-bind="getSlotData(slotData)"
          ></slot>
        </template>
      </ui-form-view>

      <slot
        :name="`after-${UI_DETAIL_VIEW.NAMESPACE}`"
        v-bind="instanceData"
      ></slot>
    </section>
  </div>
</template>

<script>
const UI_DETAIL_VIEW = {
  NAME: 'UiDetailView',
  NAMESPACE: 'detail-view',
  EVENTS: {
    updateFormItem: 'change:x',
    action: 'action',
    submit: 'submit',
    reset: 'reset',
    cancel: 'cancel'
  }
};

const defaultActionConfig = [
  {
    type: UI_DETAIL_VIEW.EVENTS.cancel,
    text: 'Cancel',
    attrOrProp: {
      outlined: true
    }
  },
  {
    type: UI_DETAIL_VIEW.EVENTS.submit,
    text: 'Save',
    attrOrProp: {
      raised: true
    }
  }
];

export default {
  name: UI_DETAIL_VIEW.NAME,
  customOptions: {}
};
</script>

<script setup>
import {
  reactive,
  toRefs,
  computed,
  onBeforeMount,
  useSlots,
  nextTick
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { viewProps, useView } from '../../mixins/view';
import { isObject } from '../../utils/typeof';

const route = useRoute();
const router = useRouter();

const props = defineProps({
  ...viewProps,
  actionConfig: {
    type: Array,
    default: () => defaultActionConfig
  },
  formViewAttrOrProp: {
    type: Object,
    default: () => ({})
  },
  // Redirect
  to: {
    type: [Boolean, Object, String],
    default: false
  },
  replace: {
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
  setModelDataFn: {
    type: Function,
    default: () => {}
  },
  // Others
  useValidator: {
    type: Boolean,
    default: true
  },
  redirectOnSave: {
    type: Boolean,
    default: true
  }
});
const emit = defineEmits([
  UI_DETAIL_VIEW.EVENTS.updateFormItem,
  UI_DETAIL_VIEW.EVENTS.action
]);
const slots = useSlots();

const state = reactive({
  formConfig: [],
  formData: {},
  formDataSource: {},
  message: '',
  loading: false
});
const { formConfig, formData, message, loading } = toRefs(state);

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
    detailData: state.formData,
    detailDataSource: state.formDataSource
  })
);
const fullInstanceData = computed(() =>
  Object.assign({}, globalModelOptions, instanceData.value)
);

onBeforeMount(() => {
  init();
});

function init() {
  resetDetailData();

  if (props.modelConfig || props.modelPath) {
    setModelConfig();
  }
}

async function setModelConfig() {
  state.formConfig = [];

  try {
    state.formConfig =
      props.modelConfig ||
      (await props.getModelConfigFn()(fullInstanceData.value));
  } catch (err) {
    console.warn(`[${UI_DETAIL_VIEW.NAME}]: ${err.toString()}`);
  }
}

function initModelData(formData = {}) {
  state.loading = false;

  nextTick(async () => {
    state.formData = Object.assign(formData, props.modelValueDefaults);
    await getModelData();
  });
}

function resetDetailData() {
  state.formData = {};
  state.formDataSource = {};
  state.message = '';
  state.loading = true;
}

async function getModelData() {
  try {
    const formDataSource = await props.getModelDataFn()(fullInstanceData.value);

    if (isObject(formDataSource) && Object.keys(formDataSource).length) {
      state.formDataSource = formDataSource;
      state.formData = Object.assign({}, formDataSource);
    }
  } catch (err) {
    console.warn(`[${UI_DETAIL_VIEW.NAME}]: ${err.toString()}`);
  }
}

function redirect(to, keepAlive = true) {
  if (to !== 'custom') {
    if (to === 'back') {
      try {
        router.back();
      } catch (e) {}
    } else {
      const toNext = to || {
        name: `${props.model}.list`
      };

      // NOTE: for `<keep-alive>`
      if (isObject(toNext)) {
        toNext.state = toNext.state
          ? Object.assign({ keepAlive }, toNext.state)
          : { keepAlive };
      }

      try {
        props.replace ? router.replace(toNext) : router.push(toNext);
      } catch (e) {}
    }
  }
}

async function handleAction(action, result) {
  let canSubmit = true;

  switch (action.type) {
    case UI_DETAIL_VIEW.EVENTS.submit:
      if (props.useValidator) {
        canSubmit = result.valid;
        state.message = result.message;
      }

      if (canSubmit && action.submit !== false) {
        await props.setModelDataFn()(fullInstanceData.value);
        props.redirectOnSave && redirect(props.to, false);
      }
      break;
    case UI_DETAIL_VIEW.EVENTS.reset:
      state.message = '';
      // NOTE: automatic processing in `<ui-form-view>`
      break;
    case UI_DETAIL_VIEW.EVENTS.cancel:
      redirect(props.to || 'back');
      break;
  }

  canSubmit && exposeAction(action, result);
}

function getSlotData(slotData) {
  return Object.assign({}, slotData, {
    detailData: state.formData,
    detailDataSource: state.formDataSource,
    refreshData: getModelData
  });
}
</script>
