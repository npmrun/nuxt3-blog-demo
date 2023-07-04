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
        asda
        <button v-if="loggedIn" class="btn" @click="handleQuit">退出</button>
    </div>
</template>

<style lang="scss" scoped></style>
