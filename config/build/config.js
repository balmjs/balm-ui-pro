const input = {
  components: './src/scripts/components',
  plugins: './src/scripts/plugins',
  sass: './src/styles'
};

const components = [
  'form-view',
  'detail-view',
  'list-view',
  'layout-view',
  'readonly-item',
  'checkbox-group',
  'radio-group',
  'switch-box',
  'multi-select'
];

const plugins = [
  'api-model',
  'router-model',
  'transform',
  'constant',
  'dialog'
];

const output = {
  dist: './dist',
  components: './components',
  plugins: './plugins',
  vetur: './vetur'
};

module.exports = {
  input,
  components,
  plugins,
  output
};
