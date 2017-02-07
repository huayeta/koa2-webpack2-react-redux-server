process.env.NODE_ENV = 'production'

require('babel-register')
var config = require('./platforms/common/config')
var webpack = require('webpack')
var path = require('path')
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var extractStyle = new ExtractTextPlugin('all.min.css')
var rucksack = require('rucksack-css')
var autoprefixer = require('autoprefixer')
var fs = require('fs')
var nodeModules = fs.readdirSync('node_modules')
    .filter(function(i) {
        return ['.bin', '.npminstall'].indexOf(i) === -1
    })
var includes = [
    path.resolve(__dirname, 'app'),
    path.resolve(__dirname, 'platforms')
]

module.exports = [{
    name: 'browser side render',
    devtool: 'cheap-source-map',
    entry: ['./platforms/browser/index.js'],
    output: {
        path: 'public/build',
        filename: '[name].js',
        publicPath: '/build/'
    },
    module: {
        noParse: /\.min\.js/,
        rules: [{
            test: /\.jsx|\.js$/,
            exclude: /node_modules/,
            include: includes,
            use: 'babel-loader'
        }, {
            test: /\.css$/,
            use: extractStyle.extract(['css-loader', 'postcss-loader'])
        }, {
            test: /\.less$/,
            include: includes,
            use: extractStyle.extract(['css-loader', 'less-loader', 'postcss-loader'])
        }, {
            test: /\.woff2?$/,
            use:{
                loader:'url-loader',
                options:{
                    limit:10000,
                    minetype:'application/font-woff'
                }
            }
        }, {
            test: /\.ttf$/,
            use:{
                loader:'url-loader',
                options:{
                    limit:10000,
                    minetype:'application/octet-stream'
                }
            }
        }, {
            test: /\.eot$/,
            use: 'file-loader'
        }, {
            test: /\.svg$/,
            use:{
                loader:'url-loader',
                options:{
                    limit:10000,
                    minetype:'image/svg+xml'
                }
            }
        }, {
            test: /\.(png|jpg|jpeg|gif|webp)$/i,
            use:{
                loader:'url-loader',
                options:{
                    limit:10000
                }
            }
        }, {
            test: /\.html?$/,
            use:{
                loader:'file-loader',
                options:{
                    name:'[name].[ext]'
                }
            }
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        extractStyle,
        new webpack.optimize.CommonsChunkPlugin({name:'common',filename:'common.js'}),
        new UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            __SERVER__: false
        }),
        new webpack.LoaderOptionsPlugin({
            options:{
                postcss: [
                    rucksack(),
                    autoprefixer({
                        browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8']
                    })
                ]
            }
        }),
    ]
}, {
    name: 'server side render',
    devtool: 'cheap-source-map',
    entry: ['./platforms/server/index.js'],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.js',
        publicPath: '/build/',
        libraryTarget: 'commonjs2'
    },
    target: 'node',
    node: {
        fs: 'empty',
        __dirname: true,
        __filename: true
    },
    externals: [
        function(context, request, callback) {
            var pathStart = request.split('/')[0]
            if (pathStart && (pathStart[0] === '!') || nodeModules.indexOf(pathStart) >= 0 && request !== 'webpack/hot/signal.js') {
                return callback(null, 'commonjs ' + request)
            }
            callback()
        }
    ],
    module: {
        noParse: /\.min\.js/,
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            include: includes,
            use:{
                loader:'babel-loader',
                options:{
                    plugins: [
                        ["babel-plugin-transform-require-ignore", {
                            "extensions": [".less", ".css"]
                        }]
                    ]
                }
            }
        }, {
            test: /\.(css|less)$/,
            use: 'null-loader'
        }, {
            test: /\.woff2?$/,
            use: 'null-loader'
        }, {
            test: /\.ttf$/,
            use: 'null-loader'
        }, {
            test: /\.eot$/,
            use: 'null-loader'
        }, {
            test: /\.svg$/,
            use: 'null-loader'
        }, {
            test: /\.(png|jpg|jpeg|gif|webp)$/i,
            use: 'null-loader'
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            __SERVER__: true
        })
    ]
}]
