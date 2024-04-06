import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('webpack').Configuration} */

const webpackConfig = {
  mode: "development",
  entry: {
    // home: "./src/index.js",
    bago: "./src/states/bago/index.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist/bago"),
    filename: "index.js",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./dist/bago"),
    },
    port: 3033,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
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
      {
        test: /\.json$/,
        loader: "json-loader",
      },
      {
        test: /\.node$/,
        loader: "node-loader",
      },
    ],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   title: "MM-Day Time",
    //   filename: "index.html",
    //   template: "./src/index.html",
    //   chunks: ['home'],
    // }),
    new HtmlWebpackPlugin({
      title: "Bago",
      filename: "./bago/index.html",
      template: "./src/index.html",
      chunks: ['bago'],
    }),
    new NodePolyfillPlugin(),
    new MiniCssExtractPlugin(),
    // new FaviconsWebpackPlugin("./src/mm.ico"),
  ],
};

export default webpackConfig;
