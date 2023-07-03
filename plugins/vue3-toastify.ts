import Vue3Toastify, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

declare module "nuxt/dist/app/nuxt" {
    interface NuxtApp {
        $toast: typeof toast
    }
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Vue3Toastify, { autoClose: 1000 })

    return {
        provide: { toast },
    }
})
