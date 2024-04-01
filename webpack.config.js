import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('webpack').Configuration} */

const webpackConfig = {
  mode: "production",
  devtool: false,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "mmsuntime.js",
  },
  // devServer: {
  //   static: {
  //     directory: path.resolve(__dirname, "./dist"),
  //   },
  //   port: 3033,
  //   open: true,
  //   hot: true,
  //   compress: true,
  //   historyApiFallback: true,
  // },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      // {
      //   test: /\.json$/,
      //   loader: "json-loader",
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "MM-Day Time",
      filename: "index.html",
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin(),
    // new FaviconsWebpackPlugin("./src/mm.ico"),
  ],
};

export default webpackConfig;
