module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:i18next/recommended',
        'plugin:storybook/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'i18next', 'react-hooks', 'big-react-app-plugin', 'unused-imports'],
    rules: {
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
        'react-hooks/exhaustive-deps': [
            'error',
            {
                additionalHooks: '(useInitialEffect)',
            },
        ],

        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'off',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'warn',
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'arrow-body-style': 'off',
        'big-react-app-plugin/path-checker': [
            'error',
            {
                alias: '@',
            },
        ],
        'big-react-app-plugin/public-api-imports': [
            'error',
            {
                alias: '@',
                testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx'],
            },
        ],
        'big-react-app-plugin/layer-imports': [
            'error',
            {
                alias: '@',
                ignoreImportPatterns: ['**/testing', '**/StoreProvider'],
            },
        ],

        'linebreak-style': 'off',
        'i18next/no-literal-string': [
            'error',
            {
                markupOnly: true,
                ignoreAttribute: [
                    'data-testid',
                    'to',
                    'target',
                    'justify',
                    'align',
                    'direction',
                    'gap',
                    'role',
                    'as',
                    'alt',
                    'name',
                    'color',
                    'variant',
                    'border',
                    'size',
                ],
            },
        ],
        'max-len': ['error', { ignoreComments: true, code: 200 }],
        'react-hooks/rules-of-hooks': 'error',
        'no-param-reassign': 'off',
        'no-undef': 'off',
        'react/no-array-index-key': 'off',
        'unused-imports/no-unused-imports': 'error',
        'react/jsx-max-props-per-line': ['error', { maximum: 4, when: 'always' }],
        'react/no-unstable-nested-components': 'warn',
    },
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true,
    },
    overrides: [
        {
            files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
                'max-len': 'off',
            },
        },
    ],
};
