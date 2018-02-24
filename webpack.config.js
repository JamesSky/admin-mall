const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path              = require('path');
const webpack           = require('webpack');

module.exports = {
	entry: './src/index.jsx',
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
		filename: 'js/app.js'
	},
	module: {
		rules: [
			// jsx处理
			{
				test: /\.jsx$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'react']
					}
				}
			},
			// css处理
		    {
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
		          	fallback: "style-loader",
		          	use: "css-loader"
		        })
			},
			// scss处理
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},
			// 图片的配置
			{
				test: /\.(png|jpg|gif)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: 'resource/[name].[ext]'
					}
				}]
			},
			// 字体图片的配置
			{
				test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: 'resource/[name].[ext]'
					}
				}]
			}

		]
	},
	plugins: [
		// 处理html文件
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		// 独立css文件
		new ExtractTextPlugin("css/[name].css"),
		// 提取公共模块
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'js/base.js'
		})
	],
	devServer: {
		port: 8086
	},
};




