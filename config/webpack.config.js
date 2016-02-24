'use strict';

const path = require('path');
const webpack = require('webpack');
const uglifySaveLicense = require('uglify-save-license');

module.exports = {
  entry: {
    index: path.resolve(__dirname, '../src/js/index.js'),
    register: path.resolve(__dirname, '../src/js/register.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist/js'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
        except: [ '$super', '$', 'exports', 'require' ]
      },
      output: {
        comments: uglifySaveLicense
      }
    })
  ]
};
