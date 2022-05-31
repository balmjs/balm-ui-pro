module.exports = (mix) => {
  if (mix.env.isProd) {
  } else {
    mix.copy('node_modules/balm-ui/fonts/*', 'docs/fonts');
  }
};
