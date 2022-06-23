const path = require('path')
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin')

module.exports = {
    // webpackFinal: (config) => {
    //     config.resolve.alias = {
    //         ...config.resolve.alias,
    //         'components-ui': path.resolve(__dirname, '../src/components-ui/index'),
    //         'components-view': path.resolve(__dirname, '../src/components-view/index'),
    //         types: path.resolve(__dirname, '../src/types/index'),
    //     }
    // },
    webpackFinal: async (config) => {
        // ;[].push.apply(config.resolve.plugins, [new TsconfigPathsPlugin({ extensions: config.resolve.extensions })])

        // return config
        config.resolve.plugins = [
            ...(config.resolve.plugins || []),
            new TsconfigPathsPlugin({
                extensions: config.resolve.extensions,
            }),
        ]
        return config
    },
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        {
            name: '@storybook/preset-scss',
            options: {
                cssLoaderOptions: {
                    modules: { localIdentName: '[name]__[local]--[hash:base64:5]' },
                },
            },
        },
    ],
    framework: '@storybook/react',
    core: {
        builder: '@storybook/builder-webpack5',
    },
}
