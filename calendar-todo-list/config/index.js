import { resolve } from 'path';

const config = {
  projectName: 'jianyunrili-html',
  date: '2023-1-5',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    },
  },
  framework: 'react',
  compiler: {
    type: 'webpack5',
    prebundle: {
      exclude: ['taro-ui'],
    },
  },

  cache: {
    enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    enableExtract: true,
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    optimizeMainPackage: {
      enable: true,
    },
    miniCssExtractPluginOption: {
      ignoreOrder: true,
    },
    // compile: {
    //  exclude: [
    //    // 跳过编译
    //    resolve(__dirname, '..', 'src/packageA/components/ec-canvas/echarts.js')
    //  ]
    // },

    // addChunkPages(pages) {
    //  pages.set('packageA/pages/homeStatistics/index', ['packageA/echarts']);
    // },
    // webpackChain(chain) {
    //  chain.merge({
    //    optimization: {
    //      splitChunks: {
    //        cacheGroups: {
    //          packageEcharts: {
    //            name: 'packageA/echarts',
    //            priority: 50,
    //            test(module) {
    //              return /[\\/]packageA[\\/]components[\\/]ec-canvas[\\/]echarts.js/.test(
    //                module.resource
    //              );
    //            },
    //          },
    //        },
    //      },
    //    },
    //  });
    //  chain.plugin('analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, []);
    // },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  rn: {
    appName: 'taroDemo',
    postcss: {
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      },
    },
  },
  alias: {
    '@/constant': resolve(__dirname, '..', 'src/constant'),
    '@/assets': resolve(__dirname, '..', 'src/assets'),
    '@/components': resolve(__dirname, '..', 'src/components'),
    '@/utils': resolve(__dirname, '..', 'src/utils'),
    '@/pages': resolve(__dirname, '..', 'src/pages'),
    '@/services': resolve(__dirname, '..', 'src/services'),
    '@/store': resolve(__dirname, '..', 'src/store'),
  },
};

export default function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
}
