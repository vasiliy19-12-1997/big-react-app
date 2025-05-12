import webpack, { RuleSetRule } from 'webpack';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';

export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    };

    if (config.resolve) {
        config.resolve.modules = [
            ...(config.resolve.modules || []),
            paths.src,
            'node_modules',
        ];
        config.resolve.extensions = [
            ...(config.resolve.extensions || []),
            '.ts',
            '.tsx',
        ];
    }

    config.module.rules = config.module.rules?.map((rule: RuleSetRule) => {
        if (rule.test instanceof RegExp && rule.test.test('.svg')) {
            return { ...rule, exclude: /\.svg$/i };
        }
        return rule;
    }) || [];

    config.module.rules.push(
        {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        },
        buildCssLoader(true),
    );

    return config;
};
