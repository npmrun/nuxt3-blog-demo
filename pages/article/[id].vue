<script setup lang="ts">
import gfm from '@bytemd/plugin-gfm'
import frontmatter from '@bytemd/plugin-frontmatter'
import btybreaks from '@bytemd/plugin-breaks'
import { Viewer } from '@/components/MdEditor'
import zhHans from 'bytemd/locales/zh_Hans.json'
definePageMeta({
    layout: 'main-layout',
})
const route = useRoute()
const router = useRouter()

const { data: res } = useFetch('/api/article/article', {
    method: 'GET',
    query: {
        id: route.params.id,
    },
})

const article = computed(() => {
    return res.value?.data
})
</script>

<template>
    <div class="m-5">
        <p class="cursor-pointer" @click="router.back()">返回</p>
        <Viewer
            :plugins="[gfm(), frontmatter(), btybreaks()]"
            :locale="zhHans"
            :value="article?.content"
        ></Viewer>
    </div>
</template>