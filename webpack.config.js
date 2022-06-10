const path = require('path');
const fs = require('fs');

const slash = '\\';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const pages = path.resolve(__dirname, 'pages');
const blocks = path.resolve(__dirname, 'blocks');
const dist = path.resolve(__dirname, 'dist');
const favicons = path.resolve(__dirname, 'assets/favicons');

const preprocessor = require('./preprocessor');

preprocessor(pages, blocks);

const plugins = [new MiniCssExtractPlugin({ filename: '[name].css' })];

const templates = [];
const entries = {};

fs.readdirSync(pages).forEach((page) => {
  const templateDir = `${pages}/${page}`;

  if (fs.lstatSync(templateDir).isDirectory()) {
    const template = `${templateDir}/${page}.pug`;

    if (fs.existsSync(template)) {
      const chunks = [page, 'jquery'];
      templates.push(new HtmlWebpackPlugin({
        template,
        chunks,
        filename: `${page}.html`,
        inject: 'body',
      }));

      entries[page] = {
        import: `${pages}${slash}${page}${slash}${page}.js`,
        dependOn: 'jquery',
      };
    }
  }
});

entries.jquery = 'jquery';

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
      directory: dist,
    },
    watchFiles: {
      paths: [pages, blocks],
      options: {
        depth: 99,
      },
    },
    compress: true,
    port: 9000,
  },

  entry: entries,
  output: {
    filename: '[name].js',
    path: dist,
    assetModuleFilename: 'assets/[name][ext]',
    clean: true,
  },

  plugins: templates.concat(plugins),

  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'simple-pug-loader',
        options: {
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
            },
          },
          {
            loader: 'css-loader',
            options: {
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    // eslint-disable-next-line global-require
                    require('autoprefixer'),
                  ],
                ],
              },
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
            },
          },
          {
            loader: 'sass-loader',
            options: {
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        exclude: favicons,
        generator: {
          filename: 'assets/img/[name][ext]',
        },
      },
      {
        test: /fonts.*\.(ttf|svg|woff)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
