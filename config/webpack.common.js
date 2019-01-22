const path = require('./path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: path.appSrc,
    },

    output: {
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[chunkhash].js',
        path: path.appDist,
        publicPath: "/"
    },

    module: {
        rules: [
            {
                test: /(\.js|\.jsx)$/,
                include: path.appSrc,
                loader: 'babel-loader',
            },

            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'images/[name].[hash].[ext]',
                        },
                    },
                ],
            },

            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'fonts/[name].[hash].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.appDist,
            verbose: true,
        }),

        new HtmlWebpackPlugin({
            inject: false,
            favicon: path.appSrc + '/img/favicon.ico',
            template: require('html-webpack-template'),
            title: 'react-template',
            appMountId: 'app',
        }),
    ],
    resolve: {
        alias: {
            '@': path.appSrc
        }
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -20,
                },
            },
        },
    },
};
