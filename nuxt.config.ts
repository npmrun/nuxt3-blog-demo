// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    version: '0.0.1',
    session: {
      name: 'nuxt-session',
      password: ''
    }
  },
  modules: [
    'nuxt-icon',
    '@nuxtjs/tailwindcss'
  ],
  devtools: { enabled: true },
  typescript: {
    shim: false,
    strict: true
  }
})
