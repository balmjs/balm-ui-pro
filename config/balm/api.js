const env = require('../env');
const buildIndividual = require('../build/individual');

module.exports = (mix) => {
  if (env.buildDocs) {
  } else {
    if (mix.env.isProd) {
      mix.remove('dist/rev-manifest.json');
      buildIndividual(mix);
    } else {
      mix.copy('node_modules/balm-ui/fonts/*', 'docs/fonts');
    }
  }
};
