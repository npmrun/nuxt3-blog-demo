export const useTo = (toast: string, path?: string) => {
	const router = useRouter();
	const localePath = useLocalePath();
	if (path) {
		router.replace(localePath(path));
	}
	useNuxtApp().$toast.success(toast);
};
export const getLocalePath = (path: string) => {
	const localePath = useLocalePath();
	return localePath(path)
};
export const naivigatePush = (path: string) => {
	const router = useRouter();
	const localePath = useLocalePath();
	router.push(localePath(path));
};

export const naivigateReplace = (path: string) => {
	const router = useRouter();
	const localePath = useLocalePath();
	router.replace(localePath(path));
};
