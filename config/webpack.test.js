const merge = require('webpack-merge');
const webpack = require('webpack');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
        'process.env': {API_ROOT:'"http://localhost:8001/"'}
    })
  ],
});
