const reTypeOf = /(?:^\[object\s(.*?)\]$)/;

const getType = (any) => {
  return Object.prototype.toString
    .call(any)
    .replace(reTypeOf, '$1')
    .toLowerCase();
};

const isUndefined = (_var) => getType(_var) === 'undefined';

const isBoolean = (bool) => getType(bool) === 'boolean';

const isString = (str) => getType(str) === 'string';

const isObject = (obj) => getType(obj) === 'object';

const isFunction = (fn) => {
  const type = getType(fn);
  return (
    type === 'function' ||
    type === 'generatorfunction' ||
    type === 'asyncfunction'
  );
};

export default getType;
export { isUndefined, isBoolean, isString, isObject, isFunction };
