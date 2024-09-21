import { resolve } from 'node:path'
import { VueLoaderPlugin } from 'vue-loader'
import TerserPlugin from 'terser-webpack-plugin'
import HtmlPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export default {
    mode: 'development',
    entry: {
        app: resolve(import.meta.dirname, 'src/app.jsx'),
    },
    module: {
        rules: [
            {
                resourceQuery: /^((?!raw).)*$/,
                test: /\.vue$/,
                use: ['vue-loader'],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
            {
                resourceQuery: /^((?!raw).)*$/,
                test: /\.jsx?$/i,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                        ],
                        plugins: [
                            '@vue/babel-plugin-jsx',
                        ],
                    },
                }],
                exclude: /node_modules/,
            },
            {
                resourceQuery: /raw/,
                type: 'asset/source',
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlPlugin({
            template: resolve(import.meta.dirname, 'src/index.html'),
            hash: true,
            minify: false,
        }),
        new CopyPlugin({
            patterns: [
                { from: resolve(import.meta.dirname, 'public'), to: '' },
            ]
        })
    ],
    resolve: {
        alias: {
            '@': resolve(import.meta.dirname, 'src'),
        },
    },
    output: {
        globalObject: 'globalThis',
        library: {
            type: 'umd',
        },
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            })
        ],
    },
    performance: {
        maxEntrypointSize: 2 * 1024 * 1024,
        maxAssetSize: 2 * 1024 * 1024,
    },
}