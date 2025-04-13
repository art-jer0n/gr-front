const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const env = dotenv.config({ path: '.env.production' }).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const plugins = [
  new MiniCssExtractPlugin({
    filename: '[contenthash].css',
  }),
  new ImageMinimizerPlugin({
    minimizer: {
      implementation: ImageMinimizerPlugin.imageminMinify,
      options: {
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 8 }],
          [
            'svgo',
            {
              plugins: [{ name: 'preset-default' }],
            },
          ],
        ],
      },
    },
  }),
  new webpack.DefinePlugin(envKeys),
];

module.exports = merge(common, {
  mode: 'production',
  target: 'browserslist',
  plugins,
  devtool: false,
  output: {
    filename: '[fullhash].js',
  },
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true,
          compress: true,
          output: {
            beautify: false,
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
});
