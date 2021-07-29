const path = require('path')
const MiniExtractCssPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserJS = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: { index: path.resolve(__dirname, 'src', 'index.js') },
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: '/node_modules/', use: ['babel-loader'] },
      {
        test: /\.css$/,
        use: [
          { loader: MiniExtractCssPlugin.loader },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader' },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'template.html'),
    }),
    new MiniExtractCssPlugin(),
  ],

  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserJS()],
  },

  devServer: {
    open: true,
    watchContentBase: true,
  },

  mode: 'production',
}
