import { computed, onActivated } from 'vue';
import { useRoute } from 'vue-router';

export function useKeepAlive(refreshComponent) {
  const route = useRoute();

  const noKeepAlive = computed(() => {
    const { params, matched } = route;
    return (
      params?.keepAlive === false ||
      matched.some((route) => route.meta?.keepAlive === false)
    );
  });

  onActivated(() => {
    if (noKeepAlive.value) {
      refreshComponent();
    }
  });
}
