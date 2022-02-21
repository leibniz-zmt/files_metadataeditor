module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'prettier',
		'plugin:prettier/recommended',
	],
	globals: {
		_: true,
		t: true,
		OC: true,
		OCA: true,
		describe: true,
		it: true,
		expect: true,
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		'dot-notation': 'off',
		camelcase: 'off',
	},
	root: true,
	settings: {
		react: {
			version: 'detect',
		},
	},
}
