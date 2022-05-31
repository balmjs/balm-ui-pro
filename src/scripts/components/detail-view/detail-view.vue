<template>
  <div class="mdc-detail-view">
    <h2 class="mdc-detail-view__title"></h2>
    <section class="mdc-detail-view__content">
      <slot name="before"></slot>
      <ui-spinner v-if="!config.length" active></ui-spinner>
      <ui-form-view
        v-show="config.length"
        v-model="formData"
        :model-config="modelConfig"
        :model-options="modelOptions"
        v-bind="formViewAttrOrProp"
      >
        <template
          v-for="(_, slotName) in $scopedSlots"
          v-slot:[slotName]="data"
        >
          <slot
            :name="slotName"
            v-bind="{
              ...data,
              formConfig: detailForm.config,
              formData: detailForm.data,
              refreshData: getData,
              originalData: detailForm.originalData
            }"
          ></slot>
        </template>

        <template #after="{ className: { itemClass, subitemClass } }">
          <ui-alert v-if="errorMessage" state="warning">
            {{ errorMessage }}
          </ui-alert>

          <ui-form-field :class="[itemClass, subitemClass]">
            <slot name="actions" :data="detailForm.data" :submit="onSubmit">
              <ui-button outlined @click="onCancel">
                {{ cancelText }}
              </ui-button>
              <ui-button v-debounce="debounceConfig" raised>
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
import { reactive, toRefs, onBeforeMount, getCurrentInstance } from 'vue';
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
const state = reactive({
  formData: {},
  modelConfig: [],
  modelOptions: {},
  errorMessage: ''
});
const { formData, modelConfig, modelOptions, errorMessage } = toRefs(state);

const { onSubmit } = useView(props, { instance, state });

const debounceConfig = {
  callback: () => onSubmit(),
  delay: 100
};

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
    props.apiEndpoint ? { baseURL: props.apiEndpoint } : {}
  );
}
</script>
