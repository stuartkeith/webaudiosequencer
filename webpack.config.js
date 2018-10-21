const path = require('path');

module.exports = {
  mode: 'production',
  entry: './source/javascript/main.js',
  resolve: {
    alias: {
      alertify: path.resolve(__dirname, 'source/javascript/libraries/alertify/alertify-0.4.0rc1.js'),
      backbone: path.resolve(__dirname, 'source/javascript/libraries/backbone/backbone-0.9.10.js'),
      jqueryPreloadCssImages: path.resolve(__dirname, 'source/javascript/libraries/jquery/preloadCssImages.jQuery_v5.js')
    },
    modules: [
      path.join(__dirname, 'source/javascript'),
      path.join(__dirname, 'node_modules')
    ]
  },
  resolveLoader: {
    alias: {
      text: 'text-loader'
    }
  }
};
