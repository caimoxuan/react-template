const merge = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
      new webpack.DefinePlugin({
          'process.env': {API_ROOT:'"https://localhost:8002/"'}
      })
  ]
});
