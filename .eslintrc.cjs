module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	extends: [
		'eslint:recommended',
		// 'plugin:react/recommended', // => Issues with three fiber properties
		'plugin:@typescript-eslint/recommended',
		'eslint-config-prettier',
	],
	parser: '@typescript-eslint/parser',
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', 'react-hooks', '@typescript-eslint'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'no-duplicate-imports': 'error',
	},
};
