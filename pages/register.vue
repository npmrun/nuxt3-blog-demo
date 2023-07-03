<script setup lang="ts">
definePageMeta({
    layout: 'pure-layout',
})

const { loggedIn, user } = useUserSession()
const router = useRouter()
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()

watch(
    () => locale.value,
    () => {
        if (locale.value) {
            router.replace(switchLocalePath(locale.value))
        }
    }
)

const colorMode = useColorMode()
const themes = [
    'system',
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
]

const formData = reactive({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
})
async function login() {
    try {
        if (!formData.username) {
            useNuxtApp().$toast.error('请输入用户名')
            return
        }
        if (!formData.email) {
            useNuxtApp().$toast.error('请输入邮箱')
            return
        }
        if (!formData.password) {
            useNuxtApp().$toast.error('请输入密码')
            return
        }
        if (!formData.repeatPassword) {
            useNuxtApp().$toast.error('请输入重复密码')
            return
        }
        await $fetch('/api/auth/register', {
            method: 'post',
            body: toRaw(formData),
        })
        useTo(`注册成功`, '/login')
    } catch (error: any) {
        if(error?.data?.statusMessage){
            useNuxtApp().$toast.error(error.data.statusMessage)
        }else{
            useNuxtApp().$toast.error(error.message)
        }
        
    }
}
</script>

<template>
    <div class="w-full h-screen font-sans bg-cover bg-landscape">
        <div
            class="container flex items-center justify-center flex-1 h-full mx-auto"
        >
            <div class="w-full max-w-lg">
                <div class="leading-loose">
                    <!-- <button @click="notify">notify by click</button> -->
                    <!-- @submit.prevent -->
                    <form
                        @submit.prevent="login"
                        class="max-w-sm p-10 m-auto rounded shadow-xl bg-white/25"
                    >
                        <p class="mb-8 text-2xl font-light text-center">
                            注册
                        </p>
                        <div class="mb-2">
                            <div class="relative">
                                <input
                                    type="text"
                                    id="login-with-bg-username"
                                    v-model="formData.username"
                                    name="username"
                                    class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="用户名"
                                />
                            </div>
                        </div>
                        <div class="mb-2">
                            <div class="relative">
                                <input
                                    type="text"
                                    id="login-with-bg-email"
                                    v-model="formData.email"
                                    name="email"
                                    class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    :placeholder="$t('login.email')"
                                />
                            </div>
                        </div>
                        <div class="mb-2">
                            <div class="relative">
                                <input
                                    type="text"
                                    id="login-with-bg-password"
                                    name="password"
                                    v-model="formData.password"
                                    class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    :placeholder="$t('login.password')"
                                />
                            </div>
                        </div>
                        <div class="mb-2">
                            <div class="relative">
                                <input
                                    type="text"
                                    id="login-with-bg-repeatPassword"
                                    name="repeatPassword"
                                    v-model="formData.repeatPassword"
                                    class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="再次输入密码"
                                />
                            </div>
                        </div>
                        <div class="flex items-center justify-between mt-4">
                            <button
                                type="submit"
                                class="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                            >
                                {{ $t('login.validate') }}
                            </button>
                        </div>
                        <div class="text-center">
                            <a
                                :href="localePath('/login')"
                                class="right-0 inline-block text-sm font-light align-baseline text-500 hover:text-gray-800"
                            >
                                {{ $t('login.toLogin') }}
                            </a>
                        </div>
                        <div class="text-right mt-2">
                            <select
                                id="language"
                                class="select max-w-xs select-sm"
                                v-model="locale"
                            >
                                <option value="zh">
                                    {{ $t('language.chinese') }}
                                </option>
                                <option value="en">
                                    {{ $t('language.english') }}
                                </option>
                            </select>
                        </div>
                        <div class="text-right mt-2">
                            <select
                                id="theme"
                                class="select max-w-xs select-sm"
                                v-model="colorMode.preference"
                            >
                                <option disabled selected>Theme</option>
                                <option v-for="theme of themes" :key="theme">
                                    {{ theme }}
                                </option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
