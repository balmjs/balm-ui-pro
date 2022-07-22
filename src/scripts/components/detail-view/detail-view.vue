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
  name: 'UiDetailView',
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
      type: [Boolean, Object, String],
      default: false
    },
    replace: {
      type: Boolean,
      default: false
    },
    setModelDataFn: {
      type: Function,
      default: () => {}
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
      message: ''
    };
  },
  async beforeMount() {
    if (this.model) {
      await this.getModelConfig();
      await this.getModelData();
    } else {
      console.warn('[UiDetailView]', 'model is missing');
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
    async getModelData() {
      try {
        this.formData = await this.getModelDataFn(this);
      } catch (e) {
        console.log(e);
      }
    },
    redirect() {
      if (this.to !== 'custom') {
        const to = this.to || `${this.model}.list`;
        this.replace ? this.$router.replace(to) : this.$router.push(to);
      }
    },
    async handleAction(result) {
      const { type, valid, message } = result;

      switch (type) {
        case UiDetailView.EVENTS.submit:
          let canSubmit = true;

          if (this.useValidator) {
            canSubmit = valid;
            this.message = message;
          }

          if (canSubmit) {
            await this.setModelDataFn(this);
            this.redirectOnSave && this.redirect();
          }
          break;
        case UiDetailView.EVENTS.cancel:
          switch (this.to) {
            case 'custom':
              this.$emit(UiDetailView.EVENTS.cancel);
              break;
            case false:
              this.$router.back();
              break;
            default:
              this.redirect();
          }
          break;
      }

      if (type !== UiDetailView.EVENTS.cancel) {
        this.$emit(type, result, this);
      }
    }
  }
};
</script>
