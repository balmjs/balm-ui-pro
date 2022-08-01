const env = require('./env');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

const workspace = path.join(__dirname, '..', '..');

function resolve(dir) {
  return path.join(workspace, dir);
}

function getConfig(balm) {
  const { isProd } = balm.config.env;
  const useDocsProd = isProd && env.buildDocs;
  const useDocsDev = !isProd || env.buildDocs;
  const useBuild = isProd && !env.buildDocs;

  return {
    server: {
      historyOptions: true
    },
    roots: {
      source: useDocsDev ? 'docs' : 'src'
    },
    styles: {
      extname: 'scss'
    },
    scripts: {
      lint: true,
      entry: useDocsDev
        ? {
            app: './docs/scripts/index.js'
          }
        : {
            'balm-ui-pro': './src/scripts/index.js'
          },
      library: useDocsDev ? '' : 'BalmUIPro',
      libraryTarget: useDocsDev ? 'var' : 'umd',
      loaders: [
        {
          test: /\.md$/,
          use: ['html-loader', 'markdown-loader']
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
      ],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        pickerLangZh: 'flatpickr/dist/l10n/zh.js',
        'balm-ui$': 'balm-ui/src/scripts/index.js',
        'balm-ui-plus$': 'balm-ui/src/scripts/plus.js',
        'balm-ui-next$': 'balm-ui/src/scripts/next.js',
        'balm-ui-pro$': resolve('src/scripts/index.js'),
        miragejs$: 'miragejs/dist/mirage-esm.js',
        '@mock-server': resolve('mock-server'),
        '@': resolve('docs/scripts')
      },
      includeJsResource: [
        resolve('node_modules/balm-ui/src/scripts'),
        ...(useDocsDev ? [resolve('src/scripts')] : [])
      ],
      plugins: [new VueLoaderPlugin()],
      externals: useBuild
        ? {
            vue: {
              root: 'Vue',
              commonjs: 'vue',
              commonjs2: 'vue',
              amd: 'vue'
            }
          }
        : {},
      webpackOptions: useBuild
        ? {
            output: {
              umdNamedDefine: true,
              // See https://github.com/webpack/webpack/issues/6522
              globalObject: "typeof self !== 'undefined' ? self : this"
            }
          }
        : {}
    },
    extras: {
      includes: ['CNAME']
    },
    assets: {
      cache: env.buildDocs
    },
    logs: {
      level: 2
    }
  };
}

module.exports = getConfig;
