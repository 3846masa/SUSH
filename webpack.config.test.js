const config = require('./webpack.config.js');

config.rules.push(...[
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
