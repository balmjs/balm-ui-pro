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
      default: () => ({
        formAttrOrProp: {
          actionAlign: 'center'
        }
      })
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
      modelConfig: [],
      formData: {},
      formDataSource: {},
      message: ''
    };
  },
  async beforeMount() {
    if (this.modelPath) {
      await this.getModelConfig();
    }
  },
  methods: {
    async getModelConfig() {
      try {
        this.modelConfig = await this.getModelConfigFn(this);
      } catch (e) {
        console.log(e);
      }
    },
    initModelData(formData = {}) {
      this.formData = Object.assign(formData, this.defaultParams);
      this.getModelData();
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
      } catch (e) {
        console.warn(`[${UiDetailView.name}]: ${e.toString()}`);
      }
    },
    redirect() {
      if (this.to !== 'custom') {
        const to = this.to || {
          name: `${this.model}.list`
        };
        this.replace ? this.$router.replace(to) : this.$router.push(to);
      }
    },
    async handleAction(action, data) {
      switch (action.type) {
        case UiDetailView.EVENTS.submit:
          let canSubmit = true;

          if (this.useValidator) {
            canSubmit = data.valid;
            this.message = data.message;
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
          if (this.to === 'back') {
            this.$router.back();
          } else {
            this.redirect();
          }
          break;
      }

      this.exposeAction(action, data);
    }
  }
};
</script>
