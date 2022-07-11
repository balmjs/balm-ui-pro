<template>
  <div class="mdc-detail-view">
    <h2 v-if="hasTitle" class="mdc-detail-view__title">
      <slot name="title">{{ title }}</slot>
    </h2>
    <section class="mdc-detail-view__content">
      <slot name="before"></slot>
      <ui-spinner v-if="!config.length" active></ui-spinner>
      <ui-form-view
        v-show="config.length"
        v-model="formData"
        :model-config="modelConfig"
        :model-options="modelOptions"
        :action-config="actionConfig"
        v-bind="formViewAttrOrProp"
      >
        <slot v-for="(_, name) in $slots" :slot="name" :name="name"></slot>
        <template v-for="(_, name) in $scopedSlots">
          <slot
            :name="name"
            v-bind="{
              ...data,
              formConfig: detailForm.config,
              formData: detailForm.data,
              refreshData: getData,
              originalData: detailForm.originalData
            }"
          ></slot>
        </template>

        <template #actions="{ className, data }">
          <ui-alert v-if="errorMessage" state="warning">
            {{ errorMessage }}
          </ui-alert>

          <ui-form-field :class="className">
            <slot name="actions" :data="data">
              <ui-button outlined @click="onCancel">
                {{ cancelText }}
              </ui-button>
              <ui-button v-debounce="onSubmit" raised>
                {{ submitText }}
              </ui-button>
            </slot>
          </ui-form-field>
        </template>
      </ui-form-view>
      <slot name="after"></slot>
    </section>
  </div>
</template>

<script>
export default {
  name: 'UiDetailView'
};
</script>

<script setup>
import {
  reactive,
  toRefs,
  computed,
  onBeforeMount,
  getCurrentInstance,
  useSlot
} from 'vue';
import { viewProps, useView } from '../../mixins/view';

const props = defineProps({
  ...viewProps,
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  submitText: {
    type: String,
    default: 'Submit'
  }
});

const instance = getCurrentInstance();
const slots = useSlot();
const state = reactive({
  formData: {},
  modelConfig: [],
  modelOptions: {},
  actionConfig: [],
  errorMessage: ''
});
const { formData, modelConfig, modelOptions, errorMessage } = toRefs(state);

const { onSubmit } = useView(props, { instance, state });

const hasTitle = computed(() => props.title || slots.title);

onBeforeMount(() => {
  if (!instance.$model) {
    console.warn('[UiDetailView]', '$model is missing');
  } else {
    initFormConfig();
  }
});

async function initModelConfig() {
  state.modelConfig = await instance.$model.getModelConfig(
    props.modelName || props.model
  );
}

async function getData() {
  state.formData = await instance.$model.getDetailData(
    props.model,
    props.queryParams,
    props.requestConfig
  );
}
</script>
