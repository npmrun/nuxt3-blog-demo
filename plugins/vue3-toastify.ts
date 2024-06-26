import Vue3Toastify, { toast } from "vue3-toastify";
import Mask from "@/components/Mask";
import "vue3-toastify/dist/index.css";

declare module "#app" {
	interface NuxtApp {
		$toast: typeof toast;
	}
}

declare module "@vue/runtime-core" {
	interface ComponentCustomProperties {
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
	nuxtApp.vueApp.use(Mask);

	return {
		provide: { toast },
	};
});
