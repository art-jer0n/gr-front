const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

const dotenvResult = dotenv.config({ path: '.env.development' });

if (dotenvResult.error) {
  throw dotenvResult.error;
}

const env = dotenvResult.parsed || {};

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const plugins = [
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
  }),
  new webpack.DefinePlugin(envKeys),
];

module.exports = merge(common, {
  mode: 'development',
  target: 'web',
  plugins,
  devtool: 'inline-source-map',
  output: {
    filename: '[name].[contenthash].js',
  },
});
