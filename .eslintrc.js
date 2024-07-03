module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    // linebreakStyle: ["error", "windows"],
    // "prettier/prettier": [
    //   "error",
    //   {
    //     "singleQuote": true,
    //     "parser": "flow"
    //   }
    // ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: [
        '.eslintrc.js',
        'mysql-migrations/*',
        'postgres-migrations/*',
        'migrations/*',
        'my_logs/*',
        'node_modules/*',
    ],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/ban-ts-comment': ['warn'],
        'newline-before-return': 'warn',
        'lines-between-class-members': ['error', 'always'],
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: '*', next: 'break' },
            { blankLine: 'always', prev: '*', next: 'break' },
        ],
        'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 1 }],
        'max-len': [
            'error',
            {
                code: 125,
                ignoreUrls: true,
                ignoreTrailingComments: true,
                ignoreComments: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true,
            },
        ],
        curly: ['error'],
        'no-empty': ['warn', { allowEmptyCatch: true }],
        'no-console': ['warn', { allow: ['debug', 'table', 'time', 'timeEnd'] }],
    },
};
