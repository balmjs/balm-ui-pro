import { computed } from 'vue';

const viewProps = {
  title: {
    type: String,
    default: ''
  },
  model: {
    type: String,
    default: ''
  },
  modelName: {
    type: String,
    default: ''
  },
  modelPath: {
    type: String,
    default: ''
  },
  modelOptions: {
    type: Object,
    default: () => ({})
  },
  keyName: {
    type: String,
    default: 'id'
  },
  defaultParams: {
    type: Object,
    default: () => ({})
  }
};

function useView(props, slots) {
  const hasTitle = computed(() => props.title || slots.title);

  return hasTitle;
}

export { viewProps, useView };
