
const path = require('path')
//вписывает в индекс.хтмл джс-файлы
const htmlWebpackPlugin = require('html-webpack-plugin')
// очищает дист
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// для минимизации css
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV == 'development'
const isProd = !isDev


module.exports={

    context: path.resolve(__dirname, 'src'),
    mode: "development",
    // указываем несвязанные точки входа
    entry: {
        main: ['@babel/polyfill', './index.jsx'],
        analytics: './analytics.ts'
    },
    // если есть несколько точек входа, то каждый собираемый файл должен иметь уникальное имя
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, 'dist')
    },
    // добавлять расширения для файлов без расширений
    resolve: {
        extensions: ['.js'],
        // alias: {}
    },
    // вытащит библиотеки в отдельный файл
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [new TerserPlugin({}), new OptimizeCssAssetsPlugin({})],
    },
    devServer: {
        port: 4200,
        hot: isDev
    },
    // показывает исходный код в режиме разработчика
    devtool: isDev ? 'source-map' : '',

    plugins: [
        // вставляет в html разные ресурсы
        new htmlWebpackPlugin({
            template: './index.html',
            minify: isProd
        }),
        // очищает дист перед компиляцией
        new CleanWebpackPlugin(),
        // создает файл CSS для каждого файла JS, который содержит CSS.
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: '[id].css'
        })
    ],

//    лоадеры нужны джля работы с не .js файлами
    module: {
        rules: [
            { test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        '@babel/preset-env'
                    ]
                }
            },
            { test: /\.ts$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-typescript'
                    ]
                }
            },
            { test: /\.jsx$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ]
                }
            },
            { test: /\.css$/,
                // вебпак идет справа налево при применении лоадеров
                use:    [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // горячая перезагрузка
                        options: {
                            hmr: isDev
                            }
                    },
                    // интерпретирует @import и url ()
                    'css-loader'
                        ]
            },
            { test: /\.less$/,
                use:    [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev
                        }
                    },
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(jpeg|jpg)$/,
                // Загрузчик файлов преобразует import / require () для файла в URL-адрес и отправляет файл в выходной каталог.
                use: ['file-loader']
            },
            {
                test: /\.ttf$/,
                use: ['file-loader']
            }
        ]
    }

}

