module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('worker-loader')
      .test(/\.worker.js$/)
      .use('worker-loader')
      .loader('worker-loader')
      .end();
    // config.module.rules.push({
    //   test: /\.worker.js$/,
    //   use: {
    //     loader: 'worker-loader',
    //     options: { inline: true, name: 'workerName.[hash].js' },
    //   },
    // });
  },
  parallel: false,
  chainWebpack: (config) => {
    config.output.globalObject('this');
  },
};
