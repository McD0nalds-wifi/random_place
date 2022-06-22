import path from 'path'
import { Configuration as WebpackConfiguration } from 'webpack'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import CopyWebpackPlugin from 'copy-webpack-plugin'

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration
}

const filename = (ext: string) => `${ext === 'css' ? 'css' : 'js'}/[name].[fullhash].${ext}`

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: '../public/index.html',
            minify: {
                collapseWhitespace: false,
            },
            favicon: '../public/favicon.ico',
        }),
        new ForkTsCheckerWebpackPlugin({
            async: false,
            typescript: {
                configFile: '../tsconfig.json',
            },
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public/favicon.ico'),
                    to: path.resolve(__dirname, 'build'),
                },
            ],
        }),
        new MiniCssExtractPlugin(),
        new ESLintPlugin({ extensions: ['js', 'jsx', 'ts', 'tsx'] }),
        // new BundleAnalyzerPlugin(), // TODO
    ]

    return base
}

const cssLoaders = (isScss: boolean, isModule: boolean) => {
    const loaders: any = [
        {
            loader: MiniCssExtractPlugin.loader,
        },
        isModule
            ? {
                  loader: 'css-loader',
                  options: {
                      modules: {
                          mode: 'local',
                          localIdentName: '[name]__[local]--[hash:base64:5]',
                      },
                  },
              }
            : 'css-loader',
    ]

    if (isScss) {
        loaders.push({
            loader: 'sass-loader',
            options: {
                implementation: require('sass'),
            },
        })
        loaders.push({
            loader: 'sass-resources-loader',
            options: {
                resources: [path.resolve(__dirname, 'src/styles/index.scss')],
            },
        })
    }

    return loaders
}

const config: Configuration = {
    context: path.resolve(__dirname, 'src'),
    mode: 'production',
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
    },
    entry: './index.tsx',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            'components-ui': path.resolve(__dirname, 'src/components-ui'),
            'components-view': path.resolve(__dirname, 'src/components-view'),
            types: path.resolve(__dirname, 'src/types'),
        },
    },
    plugins: plugins(),
    devtool: 'inline-source-map',
    // devtool: IS_DEV ? 'source-map' : false,
    devServer: {
        static: path.join(__dirname, 'build'), // ?
        historyApiFallback: true,
        port: 7001,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                exclude: /\.module\.css$/i,
                use: cssLoaders(false, false),
            },
            {
                test: /\.s[ac]ss$/i,
                use: cssLoaders(true, true),
            },
            {
                test: /\.(png|jpg|svg|gif|mp4)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'img',
                    },
                },
            },
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                    },
                },
            },
        ],
    },
}

export default config
