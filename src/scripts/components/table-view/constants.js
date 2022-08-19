import { isFunction } from '../../utils/typeof';

export const cssClasses = {
  topAction: 'top-action',
  rowAction: 'row-action'
};

export const TYPES = {
  noSlot: 'no-slot',
  routerLink: 'router-link'
};

export function getRouteLocationRaw(action, { model, data, params }) {
  const { routeName, routeParams } = action;
  return (
    action.to || {
      name: routeName || `${model}.detail`,
      params: isFunction(routeParams) ? routeParams(data) : params || {}
    }
  );
}
