const path = require('path');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

/** @type {import('@storybook/react-webpack5').StorybookConfig} */
module.exports = {
    stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        {
            name: '@storybook/addon-essentials',
            options: {
                backgrounds: false,
            },
        },
        '@storybook/addon-interactions',
        'storybook-addon-mock',
        'storybook-addon-themes',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    core: {
        builder: 'webpack5',
    },
    server: {
        host: 'localhost',
        port: 6006,
    },

    webpackFinal: async (config) => {
        config.resolve = config.resolve || {};
        config.resolve.plugins = [
            ...(config.resolve.plugins || []),
            new TsconfigPathsPlugin({
                extensions: config.resolve.extensions,
            }),
        ];

        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            '@': path.resolve(__dirname, '../../src'),
            '@app': path.resolve(__dirname, '../../src/app'),
            '@shared': path.resolve(__dirname, '../../src/shared'),
            '@entities': path.resolve(__dirname, '../../src/entities'),
            '@features': path.resolve(__dirname, '../../src/features'),
            '@widgets': path.resolve(__dirname, '../../src/widgets'),
            '@pages': path.resolve(__dirname, '../../src/pages'),
        };

        config.resolve.extensions = [
            ...(config.resolve.extensions || []),
            '.ts',
            '.tsx',
            '.js',
            '.jsx',
        ];

        return config;
    },
};
