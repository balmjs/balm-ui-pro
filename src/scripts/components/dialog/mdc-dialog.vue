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
        <!-- <footer v-if="hasActions" class="mdc-dialog__actions">
          <template
            v-for="(buttonData, buttonIndex) in actionConfig"
            :key="buttonIndex"
          >
            <ui-button
              v-if="buttonData.type === 'submit'"
              v-debounce="handleAction(buttonData)"
              v-bind="buttonData.attrOrProp || {}"
            >
              {{ buttonData.text }}
            </ui-button>
            <ui-button
              v-else
              v-bind="buttonData.attrOrProp || {}"
              @click="handleAction(buttonData)"
            >
              {{ buttonData.text }}
            </ui-button>
          </template>
        </footer> -->
      </div>
    </div>
    <div class="mdc-dialog__scrim" @click="handleClose"></div>
  </div>
</template>

<script>
// For $dialog
export default {
  name: 'MdcDialog',
  customOptions: {}
};
</script>

<script setup>
import { reactive, computed, watch, useSlots } from 'vue';

const props = defineProps({
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
  actionConfig: {
    type: Array,
    default: () => []
  },
  maskClosable: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['action', 'close']);
const slots = useSlots();

const state = reactive({
  opening: true,
  opened: false
});

const className = computed(() => ({
  'mdc-dialog': true,
  'mdc-dialog--opening': state.opening,
  'mdc-dialog--open': state.opened
}));
const hasActions = computed(() => !!props.actionConfig.length);

watch(
  () => props.open,
  (val) => {
    if (val) {
      // animation
      setTimeout(() => {
        state.opened = true;
        setTimeout(() => {
          state.opening = false;
        }, 150);
      }, 150);
    } else {
      // reset
      state.opening = true;
      state.opened = false;
    }
  }
);

function handleAction(action) {
  emit('action', action);
}

function handleClose() {
  props.maskClosable && emit('close');
}
</script>
