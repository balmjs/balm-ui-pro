export const toCamelCase = (str) => {
  str = str.replace(/[-_\s]+(.)?/g, (match, c) => (c ? c.toUpperCase() : ''));

  return str.substr(0, 1).toLowerCase() + str.substr(1);
};
