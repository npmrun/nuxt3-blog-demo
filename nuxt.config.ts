// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		version: "0.0.1",
		session: {
			name: "nuxt-session",
			password: "",
			// cookie:{ 
			// 	// https://57code.gitee.io/nuxt3-docs-zh/usage/cookies.html#httponly
			// 	secure: false
			// }
		},
	},
	modules: [
		"nuxt-icon",
		"@pinia/nuxt",
		"@nuxtjs/tailwindcss",
		"@nuxtjs/color-mode",
		"@nuxtjs/i18n",
	],
	imports: {
		dirs: ["./stores"],
	},
	// 做成静态站点需要将动态路由静态化
	// https://nuxt.com/docs/api/configuration/nuxt-config#generate
	nitro: {
		prerender: {
			routes: ["/article/20"],
		},
	},
	experimental: {
		payloadExtraction: false,
	},
	css: ["~/assets/css/main.css"],
	pinia: {
		autoImports: ["defineStore", "acceptHMRUpdate"],
	},
	i18n: {
		strategy: "prefix_except_default",
		defaultLocale: "zh",
		dynamicRouteParams: true,
		detectBrowserLanguage: {
			useCookie: true,
		},
		lazy: true,
		compilation: {
			strictMessage: false,
			escapeHtml: true,
		},
		langDir: "locales",
		locales: [
			{
				code: "en",
				iso: "en-US",
				file: "en.json",
				name: "English",
			},
			{
				code: "zh",
				iso: "zh-EN",
				file: "zh.json",
				name: "Chinese",
			},
		],
	},
	colorMode: {
		preference: "winter", // default theme
		dataValue: "theme", // activate data-theme in <html> tag
		classSuffix: "",
	},
	devtools: { enabled: true },
	typescript: {
		shim: false,
		strict: true,
	},
	app: {
		buildAssetsDir: "static",
		head: {
			// https://github.com/nuxt/nuxt/discussions/16109
			script: [{ children: 'console.log("HELLO NUXT3");' }],
		},
	},
});
