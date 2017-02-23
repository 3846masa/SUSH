const path = require('path');
const readPkg = require('read-pkg');
const BabiliPlugin = require("babili-webpack-plugin");
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

module.exports = {
  entry: './src/index',
  output: {
    path: './dist',
    filename: 'index.js',
    library: readPkg.sync('.')['config']['library_name'],
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'awesome-typescript-loader',
            options: {
              sourceMap: false,
              inlineSourceMap: true,
            },
          },
        ],
      },
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
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  plugins: [
    new TsConfigPathsPlugin(),
    new BabiliPlugin(),
  ],
};
