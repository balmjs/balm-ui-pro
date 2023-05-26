<template>
  <div :class="className">
    <div class="mdc-dialog__container">
      <div class="mdc-dialog__surface">
        <h2 v-if="title" class="mdc-dialog__title">
          {{ title }}
        </h2>
        <div
          :class="{
            'mdc-dialog__content': true,
            'mdc-dialog__content--without-actions': !hasActions
          }"
        >
          <slot></slot>
        </div>
        <footer v-if="hasActions" class="mdc-dialog__actions">
          <slot name="actions"></slot>
        </footer>
      </div>
    </div>
    <div class="mdc-dialog__scrim" @click="handleClose"></div>
  </div>
</template>

<script>
// For $dialog
export default {
  name: 'MdcDialog',
  props: {
    // States
    open: {
      type: Boolean,
      default: false
    },
    // UI attributes
    title: {
      type: String,
      default: ''
    },
    maskClosable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      opening: true,
      opened: false
    };
  },
  computed: {
    className() {
      return [
        'mdc-dialog',
        {
          'mdc-dialog--opening': this.opening,
          'mdc-dialog--open': this.opened
        }
      ];
    },
    hasActions() {
      return this.$slots.actions;
    }
  },
  watch: {
    open(val) {
      if (val) {
        setTimeout(() => {
          this.opened = true;
          setTimeout(() => {
            this.opening = false;
          }, 150);
        }, 150);
      } else {
        this.opened = false;
      }
    }
  },
  methods: {
    handleClose() {
      this.maskClosable && this.$emit('close');
    }
  }
};
</script>
