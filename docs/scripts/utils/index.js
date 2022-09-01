export function openInNewTab(url) {
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener');
  link.click();
}
