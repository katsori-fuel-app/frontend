import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.config({
        extends: [
            'next/core-web-vitals',
            'plugin:@typescript-eslint/recommended',
            'plugin:prettier/recommended',
            // 'plugin:react-hooks/recommended', // установить нужно по идее npm install eslint-plugin-react-hooks --save-dev
        ],
        settings: {
            next: {
                rootDir: '.',
            },
        },
        rules: {
            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'auto',
                    trailingComma: 'es5',
                    semi: true,
                    singleQuote: true,
                    printWidth: 100,
                },
            ],
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            'react/react-in-jsx-scope': 'off',
        },
    }),
    {
        ignores: ['node_modules', 'dist', '.next'],
    },
];

export default eslintConfig;
