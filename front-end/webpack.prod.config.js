var path = require('path')
var webpack = require('webpack')
var WebpackMd5Hash = require('webpack-md5-hash');

var SRC_PATH = path.join(__dirname, 'src')
var FONT_PATH = path.join(__dirname, 'font')

module.exports = {
    entry: {
        app: './src/index.jsx',
        // 添加要打包在 libs 里面的库
        libs: [
            'react', 'react-router',
            'immutable', 'redux', 'react-redux', 'redux-immutablejs','react-router-redux',
            'isomorphic-fetch', './lib/lodash.core.js','dompurify'
        ]
    },
    output: {
        path: '../node/app/static/js',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new WebpackMd5Hash(),
        // 把入口文件里面的数组打包成 libs.js
        new webpack.optimize.CommonsChunkPlugin('libs', 'libs.[hash].[id].js')
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', ]
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loaders: [ 'babel'],
            exclude: /node_modules/,
            include: SRC_PATH
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=10000',
            exclude: /node_modules/,
            include: SRC_PATH
        },
        {
            test: /\.(ttf|svg|woff|png|eot)/,
            loader : 'url?limit=10000',
            exclude: /node_modules/,
            include: FONT_PATH
        }
    ]}
}
