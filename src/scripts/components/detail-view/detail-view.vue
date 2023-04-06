<template>
  <div class="mdc-detail-view">
    <h2 v-if="hasTitle" class="mdc-detail-view__title">
      <slot :name="`${namespace}-title`">{{ title }}</slot>
    </h2>

    <section class="mdc-detail-view__content">
      <slot :name="`before-${namespace}`" v-bind="instanceData"></slot>

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
        @change:x="handleChange"
        @action="handleAction"
      >
        <slot v-for="(_, name) in $slots" :slot="name" :name="name"></slot>
        <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
          <slot :name="name" v-bind="getSlotData(slotData)"></slot>
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

      <slot :name="`after-${namespace}`" v-bind="instanceData"></slot>
    </section>
  </div>
</template>

<script>
import viewMixin from '../../mixins/view';
import { isObject } from '../../utils/typeof';

const UiDetailView = {
  NAME: 'UiDetailView',
  NAMESPACE: 'detail-view',
  EVENTS: {
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
  name: UiDetailView.NAME,
  mixins: [viewMixin],
  props: {
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
      type: [Object, String],
      default: ''
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
  },
  data() {
    return {
      namespace: UiDetailView.NAMESPACE,
      formConfig: [],
      formData: {},
      formDataSource: {},
      message: '',
      loading: false
    };
  },
  computed: {
    instanceData() {
      return Object.assign({}, this.viewPropsData, {
        detailData: this.formData,
        detailDataSource: this.formDataSource
      });
    }
  },
  beforeMount() {
    this.init();
  },
  methods: {
    async init() {
      this.resetDetailData();

      if (this.modelConfig || this.modelPath) {
        await this.setModelConfig();
      }
    },
    async setModelConfig() {
      this.formConfig = [];

      try {
        this.formConfig =
          this.modelConfig ||
          (await this.getModelConfigFn(this.fullInstanceData));
      } catch (err) {
        console.warn(`[${UiDetailView.NAME}]: ${err.toString()}`);
      }
    },
    initModelData(formData = {}) {
      this.loading = false;

      this.$nextTick(async () => {
        this.formData = Object.assign(formData, this.modelValueDefaults);
        await this.getModelData();
      });
    },
    resetDetailData() {
      this.formData = {};
      this.formDataSource = {};
      this.message = '';
      this.loading = true;
    },
    async getModelData() {
      try {
        const originalData = await this.getModelDataFn(this.fullInstanceData);

        if (isObject(originalData) && Object.keys(originalData).length) {
          this.formDataSource = originalData;
          this.formData = Object.assign({}, originalData);
        }
      } catch (err) {
        console.warn(`[${UiDetailView.NAME}]: ${err.toString()}`);
      }
    },
    redirect(to, keepAlive = true) {
      if (to !== 'custom') {
        if (to === 'back') {
          try {
            this.$router.back();
          } catch (e) {}
        } else {
          const toNext = to || {
            name: `${this.model}.list`
          };

          // NOTE: for `<keep-alive>`
          if (isObject(toNext)) {
            toNext.params = toNext.params
              ? Object.assign({ keepAlive }, toNext.params)
              : { keepAlive };
          }

          try {
            this.replace
              ? this.$router.replace(toNext)
              : this.$router.push(toNext);
          } catch (e) {}
        }
      }
    },
    async handleAction(action, result) {
      let canSubmit = true;

      switch (action.type) {
        case UiDetailView.EVENTS.submit:
          if (this.useValidator) {
            canSubmit = result.valid;
            this.message = result.message;
          }

          if (canSubmit && action.submit !== false) {
            await this.setModelDataFn(this.fullInstanceData);
            this.redirectOnSave && this.redirect(this.to, false);
          }
          break;
        case UiDetailView.EVENTS.reset:
          this.message = '';
          // NOTE: automatic processing in `<ui-form-view>`
          break;
        case UiDetailView.EVENTS.cancel:
          this.redirect(this.to || 'back');
          break;
      }

      canSubmit && this.exposeAction(action, result);
    },
    getSlotData(slotData) {
      return Object.assign({}, slotData, {
        detailData: this.formData,
        detailDataSource: this.formDataSource,
        refreshData: this.getModelData
      });
    }
  }
};
</script>
