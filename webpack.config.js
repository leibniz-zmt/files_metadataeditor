const path = require('path')
const webpack = require('webpack')

const buildMode = process.env.NODE_ENV
const isDev = buildMode === 'development'
const appName = process.env.npm_package_name
const appVersion = process.env.npm_package_version

console.info('Building', buildMode, appName, appVersion, '\n')

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './js'),
    filename: 'bundle.js',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    static: {
      directory: path.join(__dirname, 'js'),
    },
    hot: true,
  },
  devtool: 'source-map',
  optimization: {
    minimize: !isDev,
  },
}
