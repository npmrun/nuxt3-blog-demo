<script setup lang="ts">
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
    <div class="fixed top-0 left-0 bottom-0 w-[40%] flex justify-center bg-base-200">
        <div class="text-center pt-[30%]">
            <div class="avatar mb-4">
                <div class="w-24 mask mask-hexagon">
                    <img src="https://xieyaxin.top/me.jpeg" />
                </div>
            </div>
            <h1 class="text-5xl font-bold">YSir</h1>
            <p class="mt-2">不知明天是否安在，想要一场美丽的邂逅</p>
            <div>
                <ul class="mt-4 justify-center inline-grid grid-cols-2 gap-2">
                    <li title="github" class="p-1 rounded-lg cursor-pointer">
                        <a href="https://github.com/npmrun" target="_blank">
                            <Icon name="carbon:logo-github" class="text-slate-600" size="25"></Icon>
                        </a>
                    </li>
                    <li title="blog" class="p-1 rounded-lg cursor-pointer">
                        <a href="https://blog.xieyaxin.top" target="_blank">
                            <Icon name="carbon:book" class="text-slate-600" size="25"></Icon>
                        </a>
                    </li>
                </ul>
            </div>
            <div>
                <ul class="mt-4 justify-center inline-grid grid-flow-row gap-1">
                    <NuxtLink v-if="!loggedIn" :to="localePath('/login')">
                        <button class="btn btn-sm text-primary">登陆</button>
                    </NuxtLink>
                    <template v-else>
                        <NuxtLink :to="localePath('/login')">
                            <button class="btn btn-sm text-primary" @click="handleQuit">退出</button>
                        </NuxtLink>
                        <button class="btn btn-sm text-primary">个人信息</button>
                        <button class="btn btn-sm text-primary">新建文章</button>
                    </template>
                </ul>
            </div>
        </div>
        <canvas id="snow"
            class="absolute filter brightness-[.8] w-full h-full overflow-hidden pointer-events-none"></canvas>
    </div>
    <main class="ml-[40%]">
        <slot />
    </main>
</template>

<style lang="scss" scoped></style>
