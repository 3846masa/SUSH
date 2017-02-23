const config = require('./webpack.config.js');

config.module.rules.push(...[
  {
    test: /\.ts$/,
    loader: 'istanbul-instrumenter-loader',
    enforce: 'post',
    options: {
      esModules: true
    },
    exclude: [
      'node_modules',
      /\.spec\.ts$/
    ],
  },
]);

module.exports = config;
