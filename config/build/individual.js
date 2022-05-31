const config = require('./config');

function buildIndividual(mix) {
  mix.copy(['./dist/css/*.css', './dist/js/*.js'], config.output.dist);
  mix.remove(['./dist/css', './dist/js']);
}

module.exports = buildIndividual;
