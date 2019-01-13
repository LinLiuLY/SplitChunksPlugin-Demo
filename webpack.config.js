const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const config = require('config');

/*-------------------------------------------------*/

module.exports = {
    // webpack optimization mode
    mode: (process.env.NODE_ENV ? process.env.NODE_ENV : 'development'),

    // entry file(s)
    entry: './src/index.js',

    // output file(s) and chunks
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        chunkFilename: '[name]-[contenthash].chunk.js',
        filename: '[name]-[contenthash].js'
    },

    // module/loaders configuration
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                // vendor chunk
                vendor: {
                    // sync + async chunks
                    chunks: 'all',
                    name: 'vendor',
                    // import file path containing node_modules
                    test: /node_modules/,
                    // priority
                    priority: 20
                },
                // common chunk
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'async',
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        }),
        // ------------------------------------
        // Long Term Caching
        // ------------------------------------
        // More information https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
        new webpack.NamedChunksPlugin(chunk => {
            if (chunk.name) {
                return chunk.name;
            }

            // eslint-disable-next-line no-underscore-dangle
            return [...chunk._modules]
                .map(m =>
                    path.relative(
                        m.context,
                        m.userRequest.substring(0, m.userRequest.lastIndexOf("."))
                    )
                )
                .join("_");
        }),
        new webpack.HashedModuleIdsPlugin()
    ],

    // development server configuration
    devServer: {

        // must be `true` for SPAs
        historyApiFallback: true,

        // open browser on server start
        open: config.get('open')
    },

    // generate source map
    devtool: ('production' === process.env.NODE_ENV ? 'source-map' : 'cheap-module-eval-source-map'),
};