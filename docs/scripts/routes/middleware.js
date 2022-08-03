import { useBus } from 'balm-ui';
import { statistics } from '@/config/analytics';

function initRouter(router) {
  const bus = useBus();

  const CLASS_NAMESPACE = 'balmui';
  router.afterEach((to, from) => {
    const pageClassList = document.querySelector('html').classList;
    const routeName = to.name;
    const isNoLayout = routeName ? ['test'].includes(routeName) : true;

    if (isNoLayout) {
      pageClassList.add(`${CLASS_NAMESPACE}-no-layout`);
    } else {
      pageClassList.remove(`${CLASS_NAMESPACE}-no-layout`);
    }

    if (from.name) {
      let fromName = from.name.replace('.', '_');
      pageClassList.remove(`${CLASS_NAMESPACE}-${fromName}`);
    }

    if (to.name) {
      let toName = to.name.replace('.', '_');
      pageClassList.add(`${CLASS_NAMESPACE}-${toName}`);
    }

    if (to.name !== from.name) {
      statistics(to.fullPath);
    }

    bus.emit('page-loaded');
  });
}

export { initRouter };
