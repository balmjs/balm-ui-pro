const env = require('../env');
const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const { ModuleFederationPlugin } = webpack.container;

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
      library: useDocsDev
        ? ''
        : {
            name: 'BalmUIPro',
            type: 'umd',
            umdNamedDefine: true
          },
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
        vue$: 'vue/dist/vue.esm-bundler.js',
        'vue-i18n$': 'vue-i18n/dist/vue-i18n.esm-bundler.js',
        'balm-ui$': 'balm-ui/src/scripts/balm-ui.js',
        'balm-ui-plus$': 'balm-ui/src/scripts/balm-ui-plus.js',
        'balm-ui-next$': 'balm-ui/src/scripts/balm-ui-next.js',
        'balm-ui-pro': resolve('src/scripts/index.js'),
        '@mock-server': resolve('mock-server'),
        '@': resolve('docs/scripts')
      },
      includeJsResource: [
        resolve('node_modules/balm-ui/src/scripts'),
        ...(useDocsDev ? [resolve('src/scripts')] : [])
      ],
      plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
          __VUE_OPTIONS_API__: JSON.stringify(true),
          __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
          __VUE_I18N_FULL_INSTALL__: JSON.stringify(true),
          __VUE_I18N_LEGACY_API__: JSON.stringify(false),
          __INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false)
        }),
        ...(useDocsProd
          ? [
              new ModuleFederationPlugin({
                name: 'RemoteBalmUIPro',
                filename: 'remote-balm-ui-pro.js',
                exposes,
                shared: ['vue']
              })
            ]
          : [])
      ],
      injectHtml: !useBuild,
      htmlPluginOptions: {
        template: env.buildDocs
          ? './docs/templates/prod.html'
          : './docs/templates/dev.html'
      },
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
