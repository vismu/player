var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var postcssSimpleVars = require('postcss-simple-vars');
var postcssImport = require('postcss-import');
var cssnext = require('postcss-cssnext');

module.exports = {
	entry: {
		app: ['./app/index.js']
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
		mainFields: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
		alias: {
			'app': path.resolve('./app'),
		}
	},
	module: {
		rules: [{
			test: /\.js?$/,
			loader: 'babel-loader',
			exclude: /node_modules/
		}, {
			test: /\.css?$/,
			use: [{
				loader: 'style-loader',
			}, {
				loader: 'postcss-loader',
				options: {
					ident: 'postcss',
					plugins: () => [postcssImport, postcssSimpleVars, cssnext]
				}
			}]
		}]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'style.css',
			allChunks: true
		}),
		new HtmlWebpackPlugin({
			template: './app/index.html',
			inject: 'body',
			hash: true,
		}),
	],
};