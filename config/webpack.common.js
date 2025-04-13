const path = require("path");
const paths = require("./paths");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const plugins = [
  new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: [paths.build],
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.join(paths.src, "assets"),
        to: "assets",
        noErrorOnMissing: true,
      },
    ],
  }),
  new HtmlWebpackPlugin({
    template: path.join(paths.public, "index.html"),
    filename: "index.html",
  }),
];

if (process.env.SERVE) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

const devServer = {
  historyApiFallback: true,
  open: true,
  compress: true,
  allowedHosts: "all",
  hot: true,
  client: {
    overlay: false,
    progress: true,
  },
  port: 3000,
};

module.exports = {
  devServer,
  plugins,
  entry: path.join(paths.src, "index.tsx"),
  output: {
    path: paths.build,
    publicPath: "/",
  },
  performance: {
    hints: "warning",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: [paths.src, "node_modules"],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      { test: /\.(html)$/, use: ["html-loader"] },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              esModule: true,
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        exclude: /node_modules/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[hash][ext]",
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        exclude: /node_modules/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[hash][ext]",
        },
      },
    ],
  },
};
