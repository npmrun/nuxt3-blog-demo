<script setup lang="ts">
definePageMeta({
    layout: 'main-layout',
})
const { locale } = useI18n()
const { user, loggedIn } = useUserSession()
const localePath = useLocalePath()

async function handleQuit() {
    const { clear } = useUserSession()
    await clear()
    useTo('退出成功', '/')
}
</script>

<template>
    <div class="">
        <h1>登陆-{{ locale }}- {{ user }}</h1>
        <NuxtLink v-if="!loggedIn" :to="localePath('/login')">
            <button class="btn">登录</button>
        </NuxtLink>
        <button v-if="loggedIn" class="btn" @click="handleQuit">退出</button>
    </div>
</template>

<style lang="scss" scoped></style>
