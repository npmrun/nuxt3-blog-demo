
export const useTo = (toast: string, path: string) => {

    const router = useRouter()
    const localePath = useLocalePath()

    router.replace(localePath(path))
    useNuxtApp().$toast.success(toast)
}
