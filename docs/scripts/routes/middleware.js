import { useBus, useStore } from 'balm-ui';
import { getPageClassName } from '@/utils';
import { statistics } from '@/config/analytics';

const ROOT_CLASS_NAMESPACE = 'balmui';

export function initRouter(router) {
  const bus = useBus();

  router.beforeEach((to, from, next) => {
    const store = useStore();

    store.isFirstLoad = !from.name;

    next();
  });

  router.afterEach((to, from) => {
    const store = useStore();

    const pageClassList = document.querySelector('html').classList;
    const fromRouteName = from.name;
    const toRouteName = to.name;
    const isNoLayout = toRouteName ? ['test'].includes(toRouteName) : true;

    if (isNoLayout) {
      pageClassList.add(`${ROOT_CLASS_NAMESPACE}-no-layout`);
    } else {
      pageClassList.remove(`${ROOT_CLASS_NAMESPACE}-no-layout`);
    }

    if (fromRouteName) {
      const className = getPageClassName(ROOT_CLASS_NAMESPACE, fromRouteName);
      pageClassList.remove(...className);
    }

    if (toRouteName) {
      const className = getPageClassName(ROOT_CLASS_NAMESPACE, toRouteName);
      pageClassList.add(...className);
    }

    if (toRouteName !== fromRouteName) {
      statistics(to.fullPath);
    }

    if (store && !store.isFirstLoad) {
      bus.emit('page-loaded');
    }
  });
}
