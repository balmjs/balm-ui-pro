const fs = require('fs');
const config = require('./config');

const individualBuild = ['components', 'plugins'];

function getComponentName(item) {
  return item
    .split('-')
    .map((name) => name.replace(/^\S/, (s) => s.toUpperCase()))
    .join('');
}

function getLibrary(buildName, item) {
  let library;

  switch (buildName) {
    case 'components':
      library = `Ui${getComponentName(item)}`;
      break;
    case 'plugins':
      library = `$${item}`;
      break;
    default:
      library = item;
  }

  console.log(`library: ${library}`);

  return library;
}

function buildIndividual(mix) {
  console.log('Individual libraries:');

  // Clear individual
  mix.remove([config.output.components, config.output.plugins]);

  const uiOutput = `${config.output.dist}/css/balm-ui-pro`;
  individualBuild.forEach((buildName) => {
    config[buildName].forEach((item) => {
      const library = getLibrary(buildName, item);

      let jsInput;
      switch (buildName) {
        case 'components':
          jsInput = {
            index: `${config.input[buildName]}/${item}/index.js`
          };
          break;
        default:
          jsInput = {
            index: `${config.input[buildName]}/${item}.js`
          };
      }
      const jsOutput = `${uiOutput}/${buildName}/${item}`;

      mix.webpack(jsInput, jsOutput, {
        output:
          buildName === 'plugins'
            ? {
                library
              }
            : {
                library,
                libraryExport: 'default'
              }
      });

      const sassFolder = `${config.input.sass}/balm-ui-pro/${buildName}`;
      if (fs.existsSync(sassFolder)) {
        mix.copy(`${sassFolder}/**/*`, `${uiOutput}/${buildName}`);
      }
    });
  });

  individualBuild.forEach((buildName) => {
    mix.copy(`${uiOutput}/${buildName}/**/*`, buildName);
  });

  mix.copy(['./dist/css/*.css', './dist/js/*.js'], config.output.dist);
  mix.remove(['./dist/css', './dist/js']);
}

module.exports = buildIndividual;
