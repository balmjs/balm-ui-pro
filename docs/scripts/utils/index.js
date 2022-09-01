export function getPageClassName(namespace, routeName) {
  const className = [];
  const routeNames = routeName ? routeName.split('.') : '';

  const mainPageName = routeNames[0] ? `${namespace}-${routeNames[0]}` : '';
  const subPageName = routeNames[1] ? `${mainPageName}_${routeNames[1]}` : '';

  return [mainPageName, subPageName].filter((name) => name);
}

export function openInNewTab(url) {
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener');
  link.click();
}
