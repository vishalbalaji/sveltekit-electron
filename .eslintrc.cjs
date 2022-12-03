module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['svelte3', '@typescript-eslint', '@limegrass/import-alias'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript'),
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	rules: {
		semi: ['warn', 'always'],
		quotes: ['warn', 'single'],
		'comma-dangle': [
			'warn',
			{
				arrays: 'always-multiline',
				exports: 'always-multiline',
				functions: 'never',
				imports: 'always-multiline',
				objects: 'always-multiline',
			},
		],
		'@limegrass/import-alias/import-alias': 'warn',
	},
};
