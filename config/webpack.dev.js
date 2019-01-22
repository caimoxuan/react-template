const merge = require('webpack-merge');
const webpack = require('webpack');

const path = require('./path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.appDist,
    historyApiFallback: true,
    hot: true,
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env': {API_ROOT:'"http://localhost:8080/"'}
    }),
    new webpack.HotModuleReplacementPlugin(), // 热替换插件
  ],
});
