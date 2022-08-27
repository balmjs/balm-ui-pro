export function toCamelCase(str) {
  str = str.replace(/[-_\s]+(.)?/g, (match, c) => (c ? c.toUpperCase() : ''));

  return str.substr(0, 1).toLowerCase() + str.substr(1);
}

export function generateRandomString(prefix = '', number = 8) {
  if (number % 2 == 1) {
    throw new Error('Only even sizes are supported');
  }

  const crypto = window.crypto || window.msCrypto; // for IE 11
  const buf = new Uint8Array(number / 2);
  crypto.getRandomValues(buf);

  let ret = '';
  for (let i = 0; i < buf.length; ++i) {
    ret += ('0' + buf[i].toString(16)).slice(-2);
  }

  return prefix ? `${prefix}-${ret}` : ret;
}
