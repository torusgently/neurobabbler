var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './client/entry.js',
  output: {
    path: path.join(__dirname, 'server/public'),
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [
      {
        test: path.join(__dirname, 'src/scripts/'),
        loader: 'babel',
        exlude: /node_modules/,
          query: {
          presets: ['es2015']
          }

      },
        {
            test: /\.(css|scss|sass)$/,
            loader: "style!css!sass"
        },
        {
          test: /\.(png|jpg|svg)$/,
          loader: 'url-loader'
        },
        {
            test: /\.json$/,
            loader: 'json'
        },
        {
          test: /\.woff|\.woff2|\.eot/,
          // Inline small woff files and output them below font/.
          // Set mimetype just in case.
          loader: 'url',
          query: {
            name: 'font/[hash].[ext]',
            limit: 5000,
            mimetype: 'application/font-woff'
          }
        },
        {
          test: /\.ttf$|\.eot$/,
          loader: 'file',
          query: {
            name: 'font/[hash].[ext]'
          }
        }

    ]
  },
  plugins: [
    // Webpack 1.0
    new webpack.optimize.OccurenceOrderPlugin(),
    // Webpack 2.0 fixed this mispelling
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
]
};
