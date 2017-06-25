var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
	entry: {
		app: ['app/index.js']
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
			'test': path.resolve('./test'),
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
					plugins: () => [autoprefixer]
				}
			}, {
				loader: 'sass-loader',
			}]
		}]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'style.css',
			allChunks: true
		}),
		new HtmlWebpackPlugin({
			template: 'app/index.html',
			inject: 'body',
			hash: true,
		}),
		new CopyWebpackPlugin([
			{from: 'app/img', to: 'img'},
			{from: 'test/__mocks__/playerInfo.json', to: 'player_info.json'},
		]),
	],
};
