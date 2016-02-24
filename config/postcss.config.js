'use strict';

module.exports = {
  use: [ 'postcss-import', 'postcss-url', 'precss', 'cssnext' ],
  cssnext: {
    compress: true
  },
  'postcss-import': {
    path: [ 'bower_components' ]
  },
  'postcss-url': {
    url: 'copy',
    assetsPath: '../asset',
    useHash: true
  }
};
