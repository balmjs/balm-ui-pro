const reTypeOf = /(?:^\[object\s(.*?)\]$)/;

const getType = (any) => {
  return Object.prototype.toString
    .call(any)
    .replace(reTypeOf, '$1')
    .toLowerCase();
};

const isBoolean = (bool) => getType(bool) === 'boolean';

const isFunction = (fn) => {
  const type = getType(fn);
  return (
    type === 'function' ||
    type === 'generatorfunction' ||
    type === 'asyncfunction'
  );
};

export default getType;
export { isBoolean, isFunction };
