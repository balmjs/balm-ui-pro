const reTypeOf = /(?:^\[object\s(.*?)\]$)/;

const getType = (any) => {
  return Object.prototype.toString
    .call(any)
    .replace(reTypeOf, '$1')
    .toLowerCase();
};

const isFunction = (fn) => {
  const type = getType(fn);
  return (
    type === 'function' ||
    type === 'generatorfunction' ||
    type === 'asyncfunction'
  );
};

export default getType;
export { isFunction };
