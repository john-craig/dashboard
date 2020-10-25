const path = require("path");
const webpack = require('webpack');
const dotenv = require('dotenv').config( {
  path: path.join(__dirname, '.env')
} );

module.exports = {
    mode: 'production',
    entry: {
      index: './src/index.jsx',
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/dist'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                ["@babel/plugin-transform-react-jsx", { "pragma":"h" }]
              ]
            }
          }
        },
        {
          test: /\.scss$/i,
          use: [
            'style-loader',
            'css-loader',
            'resolve-url-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.coffee$/,
          loader: 'coffee-loader',
          options: {
            bare: false,
            transpile: {
              presets: ['@babel/env'],
            },
          },
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    plugins: [
      new webpack.DefinePlugin( {
        "process.env": dotenv.parsed
      } ),
    ]
  };