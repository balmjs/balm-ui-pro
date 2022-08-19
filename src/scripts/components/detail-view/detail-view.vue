<template>
  <div class="mdc-detail-view">
    <h2 v-if="hasTitle" class="mdc-detail-view__title">
      <slot name="title">{{ title }}</slot>
    </h2>

    <section class="mdc-detail-view__content">
      <slot name="before-detail-view"></slot>

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
        @change:x="handleChange"
        @action="handleAction"
      >
        <slot v-for="(_, name) in $slots" :slot="name" :name="name"></slot>
        <template v-for="(_, name) in $scopedSlots" #[name]="slotData">
          <slot :name="name" v-bind="slotData"></slot>
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
import viewMixins from '../../mixins/view';
import getType from '../../utils/typeof';

const UiDetailView = {
  name: 'UiDetailView',
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
  name: UiDetailView.name,
  mixins: [viewMixins],
  props: {
    actionConfig: {
      type: Array,
      default: () => defaultActionConfig
    },
    formViewAttrOrProp: {
      type: Object,
      default: () => ({})
    },
    to: {
      type: [Object, String],
      default: 'back'
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
  },
  data() {
    return {
      currentModelConfig: [],
      formData: {},
      formDataSource: {},
      message: '',
      loading: false
    };
  },
  async beforeMount() {
    if (this.modelConfig || this.modelPath) {
      await this.setModelConfig();
    }
  },
  methods: {
    async setModelConfig() {
      try {
        this.currentModelConfig =
          this.modelConfig || (await this.getModelConfigFn(this));
      } catch (err) {
        console.warn(`[${UiDetailView.name}]: ${err.toString()}`);
      }
    },
    async initModelData(formData = {}) {
      this.loading = true;
      this.formData = Object.assign(formData, this.defaultModelValue);
      await this.getModelData();
      this.loading = false;
    },
    async getModelData() {
      try {
        const formDataSource = await this.getModelDataFn(this);

        if (
          getType(formDataSource) === 'object' &&
          Object.keys(formDataSource).length
        ) {
          this.formDataSource = formDataSource;
          this.formData = Object.assign({}, formDataSource);
        }
      } catch (err) {
        console.warn(`[${UiDetailView.name}]: ${err.toString()}`);
      }
    },
    redirect() {
      if (this.to !== 'custom') {
        if (this.to === 'back') {
          this.$router.back();
        } else {
          const to = this.to || {
            name: `${this.model}.list`
          };
          this.replace ? this.$router.replace(to) : this.$router.push(to);
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
            await this.setModelDataFn(this);
            this.redirectOnSave && this.redirect();
          }
          break;
        case UiDetailView.EVENTS.reset:
          this.message = '';
          // NOTE: automatic processing in `<ui-form-view>`
          break;
        case UiDetailView.EVENTS.cancel:
          this.redirect();
          break;
      }

      canSubmit && this.exposeAction(action, result);
    }
  }
};
</script>
