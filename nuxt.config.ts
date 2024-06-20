// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		version: "0.0.1",
		session: {
			name: "blog-session",
			password: "",
			// cookie:{ 
			// 	// https://57code.gitee.io/nuxt3-docs-zh/usage/cookies.html#httponly
			// 	secure: false
			// }
		},
	},
	// typescript: {
	// 	shim: false
	// },
	modules: [
		"nuxt-icon",
		"@pinia/nuxt",
		'@pinia-plugin-persistedstate/nuxt',
		"@nuxtjs/tailwindcss",
		"@nuxtjs/color-mode",
		"@nuxtjs/i18n",
	],
	imports: {
		dirs: ["./stores"],
	},
	// 做成静态站点需要将动态路由静态化
	// https://nuxt.com/docs/api/configuration/nuxt-config#generate
	// nitro: {
	// 	prerender: {
	// 		routes: ["/article/20"],
	// 	},
	// },
	experimental: {
		payloadExtraction: false,
	},
	css: ["~/assets/css/main.css", "skeleton-elements/css"],
	i18n: {
		strategy: "prefix_except_default",
		defaultLocale: "zh",
		dynamicRouteParams: true,
		detectBrowserLanguage: {
			useCookie: true,
		},
		// lazy: true,
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
		pageTransition: { name: 'page', mode: 'out-in' },
		layoutTransition: { name: 'layout', mode: 'out-in' },
		rootId: "__blog",
		buildAssetsDir: "static",
		head: {
			meta: [
				{ name: 'keywords', content: '前端, keywords' },
				{ name: 'description', content: '博客' }
			],
			title: "棉木之屋",
			// https://github.com/nuxt/nuxt/discussions/16109
			script: [{ children: 'console.log("HELLO NUXT3");' }],
		},
	},
	nitro: {
		storage: {
			data: {
				driver: 'fs',
				base: './.data/kv'
			}
		}
	}
});
