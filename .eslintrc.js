module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['prettier'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react', 'react-hooks'],
    rules: {
        // suppress errors for missing 'import React' in files
        'react/react-in-jsx-scope': 'off',
        // allow jsx syntax in js files (for next.js project)
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'react-hooks/rules-of-hooks': 'error'
        // 'react-hooks/exhaustive-deps': 'warn'
    }
}
