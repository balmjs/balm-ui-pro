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

export function getRouteLocationRaw(action, listViewData, rowData = '') {
  const { to, routeName, routeParams } = action;
  const { model, params } = listViewData;
  const toRoute = isFunction(to)
    ? rowData
      ? to(rowData, listViewData)
      : to(listViewData)
    : to;

  return (
    toRoute || {
      name: isFunction(routeName)
        ? rowData
          ? routeName(rowData, listViewData)
          : routeName(listViewData)
        : routeName || `${model}.detail`,
      params: isFunction(routeParams)
        ? rowData
          ? routeParams(rowData, listViewData)
          : routeParams(listViewData)
        : routeParams || params || {}
    }
  );
}
