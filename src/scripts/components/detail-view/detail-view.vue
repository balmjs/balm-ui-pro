<template>
  <div class="mdc-detail-view">
    <h2 v-if="hasTitle" class="mdc-detail-view__title">
      <slot name="title">{{ title }}</slot>
    </h2>

    <section class="mdc-detail-view__content">
      <slot name="before-detail-view" v-bind="instanceData"></slot>

      <ui-spinner v-if="loading" active></ui-spinner>
      <ui-form-view
        v-show="!loading"
        v-model="formData"
        v-bind="
          Object.assign(
            {
              modelConfig: currentModelConfig,
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
          <slot :name="slotName" v-bind="slotData"></slot>
        </template>
        <!-- Default error message -->
        <template #after-form-view="slotData">
          <template v-if="useValidator">
            <ui-alert v-if="message" state="warning">{{ message }}</ui-alert>
          </template>
          <slot v-else name="after-form-view" v-bind="slotData"></slot>
        </template>
      </ui-form-view>

      <slot name="after-detail-view" v-bind="instanceData"></slot>
    </section>
  </div>
</template>

<script>
const UiDetailView = {
  name: 'UiDetailView',
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
    type: UiDetailView.EVENTS.cancel,
    text: 'Cancel',
    attrOrProp: {
      outlined: true
    }
  },
  {
    type: UiDetailView.EVENTS.submit,
    text: 'Save',
    attrOrProp: {
      raised: true
    }
  }
];

export default {
  name: UiDetailView.name,
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
import getType from '../../utils/typeof';

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
  to: {
    type: [Boolean, Object, String],
    default: false
  },
  replace: {
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
  setModelDataFn: {
    type: Function,
    default: () => {}
  },
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
  UiDetailView.EVENTS.updateFormItem,
  UiDetailView.EVENTS.action
]);
const slots = useSlots();

const state = reactive({
  currentModelConfig: [],
  formData: {},
  formDataSource: {},
  message: '',
  loading: false
});
const { currentModelConfig, formData, message, loading } = toRefs(state);

const {
  globalModelOptions,
  viewPropsData,
  hasTitle,
  handleChange,
  exposeAction
} = useView(props, {
  route,
  slots,
  emit,
  state,
  init
});
const instanceData = computed(() =>
  Object.assign({}, viewPropsData, {
    formData: state.formData,
    formDataSource: state.formDataSource
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
  state.currentModelConfig = [];

  try {
    state.currentModelConfig =
      props.modelConfig ||
      (await props.getModelConfigFn()(fullInstanceData.value));
  } catch (err) {
    console.warn(`[${UiDetailView.name}]: ${err.toString()}`);
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

    if (
      getType(formDataSource) === 'object' &&
      Object.keys(formDataSource).length
    ) {
      state.formDataSource = formDataSource;
      state.formData = Object.assign({}, formDataSource);
    }
  } catch (err) {
    console.warn(`[${UiDetailView.name}]: ${err.toString()}`);
  }
}

function redirect(to, keepAlive = true) {
  if (to !== 'custom') {
    if (to === 'back') {
      router.back();
    } else {
      const toNext = to || {
        name: `${props.model}.list`
      };

      // NOTE: for `<keep-alive>`
      if (getType(toNext) === 'object') {
        toNext.params = toNext.params
          ? Object.assign({ keepAlive }, toNext.params)
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
    case UiDetailView.EVENTS.submit:
      if (props.useValidator) {
        canSubmit = result.valid;
        state.message = result.message;
      }

      if (canSubmit && action.submit !== false) {
        await props.setModelDataFn()(fullInstanceData.value);
        props.redirectOnSave && redirect(props.to, false);
      }
      break;
    case UiDetailView.EVENTS.reset:
      state.message = '';
      // NOTE: automatic processing in `<ui-form-view>`
      break;
    case UiDetailView.EVENTS.cancel:
      redirect(props.to || 'back');
      break;
  }

  canSubmit && exposeAction(action, result);
}
</script>
