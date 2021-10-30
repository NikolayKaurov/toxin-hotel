const path = require('path');
const fs = require('fs');

const slash = '\\';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const pages = path.resolve(__dirname, 'pages');
const blocks = path.resolve(__dirname, 'blocks');

const preprocessor = require('./preprocessor.js');
preprocessor(pages, blocks);

let plugins = [new MiniCssExtractPlugin({filename: 'style.css'})];

let templates = [];
fs.readdirSync(pages).forEach(page =>{
  if (page.match(/\.pug$/i)) {
    templates.push(new HtmlWebpackPlugin({
      filename: page.replace(/\.pug$/i, '.html'),
      template: pages + slash + page}))
  }
});

module.exports = {
  mode: 'production',

  devtool: 'source-map',

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },

  entry: pages + slash + 'script.js',
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },

  plugins: templates.concat(plugins),

  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'simple-pug-loader',
        options: {
        }
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
            }
          },

          {
            loader: 'css-loader',
            options: {

            }
          },

          {
            loader: 'resolve-url-loader',
            options: {
            }
          },

          {
            loader: 'sass-loader',
            options: {

            }
          }
        ]
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif|ttf|woff|woff2)$/i,
        type: 'asset/resource',
      },
    ]
  }
};