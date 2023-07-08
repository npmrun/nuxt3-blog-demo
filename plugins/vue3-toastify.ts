import Vue3Toastify, { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

declare module "nuxt/dist/app/nuxt" {
  interface NuxtApp {
    $toast: typeof toast;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  // @ts-ignore
  nuxtApp.vueApp.use(Vue3Toastify.default || Vue3Toastify, {
    autoClose: 1000,
    hideProgressBar: true,
    clearOnUrlChange: false,
  });

  return {
    provide: { toast },
  };
});
