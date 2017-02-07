process.env.NODE_ENV = 'development'

var webpack = require('webpack')
var path = require('path')
var rucksack = require('rucksack-css')
var autoprefixer = require('autoprefixer')
var includes = [
    path.resolve(__dirname, 'app'),
    path.resolve(__dirname, 'platforms')
]

module.exports = {
    name: 'backend dev hot middlware',
    entry: [
        // For old browsers
        'eventsource-polyfill',
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './platforms/browser/index.js'
    ],
    output: {
        path: path.join(__dirname, '/public/static'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/build/'
    },
    resolve: {
        extensions: ['.js', '.jsx','.css','.less'],
        modules:['node_modules', path.join(__dirname, '/node_modules')]
    },

    module: {
        noParse: /\.min\.js/,
        rules: [{
            test: /\.jsx|\.js$/,
            exclude: /node_modules/,
            include: includes,
            use:{
                loader:'babel-loader',
                options: {
                    presets: ['react-hmre'],
                    plugins: [
                        ["inline-replace-variables", {
                            "__SERVER__": false
                        }]
                    ]
                }
            }
        }, {
            test: /\.css$/,
            use:['style-loader','css-loader','postcss-loader']
        }, {
            test: /\.less$/,
            include: includes,
            use:['style-loader','css-loader','less-loader','postcss-loader']
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
            test: /\.(png|jpg|jpeg|gif)$/i,
            use: {
                loader:'url-loader',
                options:{
                    limit:10000,
                    name:'[name].[ext]'
                }
            }
        }, {
            test: /\.html?$/,
            use:{
                loader:'file-loader',
                options:{
                    name:'[name].[ext]',
                }
            }
        }]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name:'common',filename:'common.js'}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
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
}
