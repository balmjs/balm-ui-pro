import { isFunction } from '../../utils/typeof';

export const cssClasses = {
  topAction: 'top-action',
  rowAction: 'row-action'
};

export const TYPES = {
  noSlot: 'no-slot',
  routerLink: 'router-link',
  columnSelection: 'column-selection'
};

export function getRouteLocationRaw(action, listViewData) {
  const { to, routeName, routeParams } = action;
  const { model, data, params } = listViewData;
  const toRoute = isFunction(to) ? to(data) : to;

  return (
    toRoute || {
      name: isFunction(routeName)
        ? routeName(data || listViewData)
        : routeName || `${model}.detail`,
      params: isFunction(routeParams)
        ? routeParams(data || listViewData)
        : routeParams || params || {}
    }
  );
}
