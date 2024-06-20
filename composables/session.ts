import type { UserSession } from "~/server/utils/session";
const useUserSessionState = () =>
	useState<UserSession>("blog-session", () => ({}));

export const useUserSession = () => {
	const sessionState = useUserSessionState();
	return {
		loggedIn: computed(() => Boolean(sessionState.value.user)),
		user: computed(() => sessionState.value.user || null),
		data: sessionState,
		fetch,
		clear,
	};
};

async function fetch() {
	// https://github.com/Atinux/nuxt-auth-utils/issues/21
	useUserSessionState().value = await useRequestFetch()('/api/session', {
		headers: {
			Accept: 'text/json'
		}
	}).catch(() => ({})) as any
}

async function clear() {
	await $fetch("/api/session", { method: "DELETE" });
	useUserSessionState().value = {};
}
