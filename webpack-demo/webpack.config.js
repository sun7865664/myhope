const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BabiliPlugin = require('babili-webpack-plugin');
const webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const plugin = new ExtractTextPlugin({
  filename: '[name].css',
  ignoreOrder: true,
});

module.exports = {
  devServer: {
    host: process.env.HOST, // Defaults to `localhost`
    port: 9090, // Defaults to 8080
    overlay: {
      errors: true,
      warnings: true,
    },
    hotOnly: true,
  },
  devtool: 'source-map',
  performance: {
    hints: 'warning', //'error'
    maxEntrypointSize: 500000, //bytes
    maxAssetSize: 450000, //bytes
  },
  entry: {
    index: './app/index.js',
    about: './app/about.js',
    vendor: ['react'],
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        enforce: 'pre',

        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
      /* 用来解析vue后缀的文件 */
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: plugin.extract({
          use: {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          fallback : 'style-loader',
        }),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack demo',
    }),
    plugin,
    new BabiliPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.HotModuleReplacementPlugin(), //HMR --hot
  ],
};
