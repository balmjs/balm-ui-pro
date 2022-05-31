const getConfig = require('./config/balm');
const api = require('./config/balm/api');

module.exports = (balm) => {
  return {
    config: getConfig(balm),
    api
  };
};
