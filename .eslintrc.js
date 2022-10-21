module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'react-app',
        'eslint:recommended',
        'plugin:react/recommended',
        'airbnb-base',
        'airbnb-typescript',
        'prettier',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json']
    },
    plugins: ['react', 'react-hooks', 'unused-imports', '@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    rules: {
        // suppress errors for missing 'import React' in files
        'react/react-in-jsx-scope': 'off',
        // allow jsx syntax in js files (for next.js project)
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'no-unused-vars': 'warn',
        'unused-imports/no-unused-imports': 'error',
        'no-const-assign': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'import/no-unresolved': 'error',
        'class-methods-use-this': 'off',
        'import/no-cycle': 'off',
        'no-await-in-loop': 'error',
        '@typescript-eslint/no-explicit-any': 'off', // TODO: switch rule on
        'no-console': 'warn'
    },
    settings: {
        'import/resolver': {
            node: {
                moduleDirectory: ['node_modules', 'src/']
            }
        },
        react: {
            version: 'detect'
        }
    }
}
