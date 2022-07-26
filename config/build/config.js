const input = {
  components: './src/scripts/components',
  plugins: './src/scripts/plugins',
  sass: './src/styles'
};

const components = [
  'form-view',
  'detail-view',
  'table-view',
  'readonly-item',
  'checkbox-group',
  'radio-group',
  'switch-box',
  'multi-select'
];

const plugins = ['model', 'transform'];

const output = {
  dist: './dist',
  components: './components',
  plugins: './plugins'
};

module.exports = {
  input,
  components,
  plugins,
  output
};
