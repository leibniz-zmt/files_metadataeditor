const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

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
				test: /\.(sa|sc|c)ss$/i,
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					// 'postcss-loader',
					'sass-loader',
				],
			},
		],
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.scss', '.css'],
	},
	output: {
		path: path.resolve(__dirname, './js'),
		filename: 'bundle.js',
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			filename: isDev ? '../css/[name].css' : '../css/[name].css',
			chunkFilename: isDev ? '../css/[id].css' : '../css/[id].css',
		}),
		new ESLintPlugin({
			extensions: ['js', 'jsx'],
			files: 'src',
			failOnError: !isDev,
		}),
	],
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
