// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        version: '0.0.1',
        session: {
            name: 'nuxt-session',
            password: '',
        },
    },
    modules: [
        'nuxt-icon',
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/color-mode',
        '@nuxtjs/i18n',
    ],
    imports: {
        dirs: ['./stores'],
    },
    pinia: {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
    },
    i18n: {
        strategy: 'prefix_except_default',
        defaultLocale: 'zh',
        dynamicRouteParams: true,
        detectBrowserLanguage: {
            useCookie: true,
        },
        langDir: 'locales',
        locales: [
            {
                code: 'en',
                iso: 'en-US',
                file: 'en.json',
                name: 'English',
            },
            {
                code: 'zh',
                iso: 'zh-EN',
                file: 'zh.json',
                name: 'Chinese',
            },
        ],
    },
    colorMode: {
        preference: 'retro', // default theme
        dataValue: 'theme', // activate data-theme in <html> tag
        classSuffix: '',
    },
    devtools: { enabled: true },
    typescript: {
        shim: false,
        strict: true,
    },
    app: {
        head: {
            // https://github.com/nuxt/nuxt/discussions/16109
            script: [{ children: 'console.log("HELLO NUXT3");' }],
        },
    },
})
