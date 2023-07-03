<script setup lang="ts">
definePageMeta({
    layout: 'main-layout',
})
const { locale } = useI18n()
const { user } = useUserSession()
const { data } = await useFetch('/api/healthz')
const router = useRouter()
const localePath = useLocalePath()

async function handleQuit() {
    const { clear } = useUserSession()
    await clear()
    useTo("退出成功", '/login')
}
</script>

<template>
    <div class="">
        {{ data }}
        <h1>登陆-{{ locale }}- {{ user }}</h1>
        <form action="/api/auth/login" method="post">
            <input type="email" name="email" />
            <input type="password" name="password" />
            <button type="submit">提交</button>
        </form>
        <h1>注册</h1>
        <form action="/api/auth/register" method="post">
            <input type="text" name="username" />
            <input type="email" name="email" />
            <input type="password" name="password" />
            <input type="repeatPassword" name="repeatPassword" />
            <button type="submit">提交</button>
        </form>
        <button class="btn">Hello daisyUI</button>
        <button class="btn" data-set-theme="light" data-act-class="ACTIVECLASS">
            light
        </button>
        <button class="btn" data-set-theme="dark" data-act-class="ACTIVECLASS">
            dark
        </button>
        <button class="btn" data-set-theme="cupcake" data-act-class="ACTIVECLASS">
            cupcake
        </button>
        <button class="btn" @click="handleQuit">
            退出
        </button>
    </div>
</template>

<style lang="scss" scoped></style>
