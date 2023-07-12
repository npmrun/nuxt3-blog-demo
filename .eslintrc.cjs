// https://dev.to/tao/adding-eslint-and-prettier-to-nuxt-3-2023-5bg
// https://juejin.cn/post/7201335136192364604#heading-19

module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parser: "vue-eslint-parser",
	parserOptions: {
		parser: "@typescript-eslint/parser",
	},
	extends: [
		"@nuxtjs/eslint-config-typescript",
		"plugin:prettier/recommended",
	],
	plugins: [],
	rules: {
		"prettier/prettier": [
			"error",
			{
				tabWidth: 4,
				useTabs: true,
				endOfLine: "auto",
			},
		],
		"no-console": "off",
		"vue/multi-word-component-names": "off",
		"vue/no-multiple-template-root": "off",
		"@typescript-eslint/no-unused-vars": "off",
	},
};
