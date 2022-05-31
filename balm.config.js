const getConfig = require('./config/balmrc');
const api = require('./config/balm.api');

module.exports = (balm) => {
  return {
    config: getConfig(balm),
    api
  };
};
