import { computed, onActivated } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export function useKeepAlive(refreshComponent) {
  const route = useRoute();
  const router = useRouter();

  const noKeepAlive = computed(() => {
    const { matched } = route;
    const { state } = router.options.history;

    return (
      state?.keepAlive === false ||
      matched.some((route) => route.meta?.keepAlive === false)
    );
  });

  onActivated(() => refreshComponent(noKeepAlive.value));
}
