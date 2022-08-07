<template>
  <div class="mdc-detail-view">
    <h2 v-if="hasTitle" class="mdc-detail-view__title">
      <slot name="title">{{ title }}</slot>
    </h2>

    <section class="mdc-detail-view__content">
      <slot name="before-detail-view"></slot>

      <ui-form-view
        v-model="formData"
        v-bind="
          Object.assign(
            {
              modelConfig,
              modelOptions,
              actionConfig
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
            <ui-alert v-if="message" state="warning">{{ message }}</ui-alert>
          </template>
          <slot v-else name="after-form-view" v-bind="slotData"></slot>
        </template>
      </ui-form-view>

      <slot name="after-detail-view"></slot>
    </section>
  </div>
</template>

<script>
const name = 'UiDetailView';

const UiDetailView = {
  EVENTS: {
    cancel: 'cancel',
    submit: 'submit'
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
  name,
  customOptions: {}
};
</script>

<script setup>
import {
  reactive,
  toRefs,
  onBeforeMount,
  useSlots,
  getCurrentInstance
} from 'vue';
import { useRouter } from 'vue-router';
import { viewProps, useView } from '../../mixins/view';

const router = useRouter();

const props = defineProps({
  ...viewProps,
  actionConfig: {
    type: Array,
    default: () => defaultActionConfig
  },
  formViewAttrOrProp: {
    type: Object,
    default: () => ({
      formAttrOrProp: {
        actionAlign: 'center'
      }
    })
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
let emit = defineEmits([]);
const slots = useSlots();

const instance = getCurrentInstance();
const state = reactive({
  modelConfig: [],
  formData: {},
  message: ''
});
const { modelConfig, formData, message } = toRefs(state);

const { hasTitle } = useView(props, slots);

onBeforeMount(async () => {
  if (props.model) {
    emit = defineEmits(props.actionConfig.map(({ type }) => type));

    await getModelConfig();
    await getModelData();
  } else {
    console.warn(`[${name}]: 'model' is missing`);
  }
});

async function getModelConfig() {
  try {
    state.modelConfig = await props.getModelConfigFn(instance);
  } catch (e) {
    console.log(e);
  }
}

async function getModelData() {
  try {
    state.formData = await props.getModelDataFn(instance);
  } catch (e) {
    console.log(e);
  }
}

function redirect() {
  if (props.to !== 'custom') {
    const to = props.to || {
      name: `${props.model}.list`
    };
    props.replace ? router.replace(to) : router.push(to);
  }
}

async function handleAction(result) {
  const { type } = result;

  switch (type) {
    case UiDetailView.EVENTS.submit:
      let canSubmit = true;

      if (props.useValidator) {
        canSubmit = result.valid;
        state.message = result.message;
      }

      if (canSubmit) {
        await props.setModelDataFn(instance);
        props.redirectOnSave && redirect();
      }
      break;
    case UiDetailView.EVENTS.cancel:
      switch (props.to) {
        case 'custom':
          emit(UiDetailView.EVENTS.cancel);
          break;
        case false:
          router.back();
          break;
        default:
          redirect();
      }
      break;
    default:
      state.message = '';
  }

  if (type !== UiDetailView.EVENTS.cancel) {
    emit(type, result, instance);
  }
}
</script>
