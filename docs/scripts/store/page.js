import { reactive, toRefs } from 'vue';

const state = reactive({
  isFirstLoad: true,
  serviceWorker: null
});

const usePageStore = () => {
  return {
    ...toRefs(state)
  };
};

export default usePageStore;
