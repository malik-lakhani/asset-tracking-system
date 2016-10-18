var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: './app/App.js',
  output: {
   path:'public/',
   filename: 'bundle.js',
   publicPath: 'public/'
 },
  //
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: [ '', '.json', '.js' ,'.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.md/,
        loaders: [ "html-loader", "markdown-loader" ]
      },
    { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff2" },
    { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=application/octet-stream" },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=image/svg+xml" },
    ]
  }
}


