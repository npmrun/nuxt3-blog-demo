import { createResolver, defineNuxtModule, addServerHandler, addServerScanDir } from 'nuxt/kit'

export default defineNuxtModule({
    meta: {
        name: 'demo'
    },
    setup() {
        const resolver = createResolver(import.meta.url)
        addServerScanDir(resolver.resolve('./runtime/server'))

        // // Add an API route
        // addServerHandler({
        //     route: '/api/demo/pic',
        //     handler: resolve('./runtime/pic')
        // })
    }
})