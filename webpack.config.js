const path = require('path');
const fs = require('fs');

const slash = '\\';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const pages = path.resolve(__dirname, 'pages');
const blocks = path.resolve(__dirname, 'blocks');

const preprocessor = require('./preprocessor');

preprocessor(pages, blocks);

console.log(__dirname);

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
  target: 'web',

  mode: 'development',

  devtool: 'source-map',

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },

  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    watchFiles: {
      paths: [path.join(__dirname, 'pages'), path.join(__dirname, 'blocks')],
      options: {
        depth: 99,
      }
    },
    compress: true,
    port: 9000,
  },

  entry: pages + slash + 'script.js',
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/fonts/[name][ext]',
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
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        exclude: [
          path.resolve(__dirname, 'favicons'),
          path.resolve(__dirname, 'fonts'),
        ],
        generator: {
          filename: 'assets/images/[name][ext]'
        }
        // loader: 'file-loader',
        // include: path.resolve(__dirname, 'blocks'),
        // exclude: path.resolve(__dirname, 'favicons'),
      },
      // {
      //   test: /fonts.*\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'assets/zalupa/[name][ext]'
      //   }
      // }
    ]
  }
};