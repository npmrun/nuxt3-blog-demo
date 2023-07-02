<script setup lang="ts">
definePageMeta({
    layout: "main-layout"
})

const { data } = await useFetch("/api/healthz")

</script>

<template>
    <div>
        <!-- {{data}} -->
        <h1>登陆</h1>
        <form action="/api/auth/login" method="post">
            <input type="email" name="email">
            <input type="password" name="password">
            <button type="submit">提交</button>
        </form>
        <h1>注册</h1>
        <form action="/api/auth/register" method="post">
            <input type="text" name="username">
            <input type="email" name="email">
            <input type="password" name="password">
            <input type="repeatPassword" name="repeatPassword">
            <button type="submit">提交</button>
        </form>
    </div>
</template>

<style lang="scss" scoped></style>