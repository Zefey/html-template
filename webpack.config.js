/**
 * @Author: zefey
 * @Date:   2018-03-01T15:07:20+08:00
 * @Last modified by:
 * @Last modified time: 2018-03-26T10:51:00+08:00
 */
var path = require('path')
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.WEBPACK_ENV === 'development';

// 获取 html-webpack-plugin 参数的方法
var getHtmlConfig = function (name, title){
	return {
		template:__dirname + '/src/view/'+ name +'.html',
		filename:'view/'+ name +'.html',
        title:title,
		inject:true,
		hash:true,
		chunks:['common', name]
	};
}


var config = {
	entry: {
		'common':[__dirname + '/src/page/common/index.js'],
        'index': [__dirname + '/src/page/index/index.js'],
        'detail': [__dirname + '/src/page/detail/index.js'],
        'list': [__dirname + '/src/page/list/index.js']
	},
	output: {
		path: __dirname + '/dist',
		publicPath:'/dist',
		filename: 'js/[name].js'
	},
	externals:{
		'jquery':'window.jQuery'
	},
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                use: [{
                    loader: 'url-loader',
                    options: {limit: 100,name: '/resource/[name].[ext]'}
                }]
            },
            {
                test: /\.string$/,
                use:[{loader: 'html-loader'}]
            }
        ]
   },
	resolve:{
		alias:{
			util: __dirname + '/src/util',
			page: __dirname + '/src/page',
			service: __dirname + '/src/service',
			image: __dirname + '/src/image',
			node_modules: __dirname + '/node_modules'
		}
	},
	plugins:[
        new webpack.DefinePlugin({
		   'process.env': {
			   WEBPACK_ENV: isDev ? '"development"' : '"production"'
		   }
	   }),
		// 通用模块
		new webpack.optimize.CommonsChunkPlugin({
			name : 'common',
			filename : 'js/base.js'
		}),
		// 独立打包css
		new ExtractTextPlugin('css/[name].css'),
		// html模版处理
        new HtmlWebpackPlugin(getHtmlConfig('index','首页 - Zefey')),
        new HtmlWebpackPlugin(getHtmlConfig('detail','详情 - Zefey')),
        new HtmlWebpackPlugin(getHtmlConfig('list','列表 - Zefey'))
	]
};


if(isDev){
    config.devServer = {
        port: '8000',
        host: '0.0.0.0',
        disableHostCheck: true,
        overlay: {
            errors:true,
        },
    }
}

module.exports = config;
