<script setup lang="ts">
const props = defineProps<{
    article: any
}>()
const emit = defineEmits<{
    (ev: "clickDetail", article: any): void
}>()
</script>

<template>
    <div class="border-b pt-2 pb-4 px-10 mt-2">
        <div class="text-2xl line-clamp-1 cursor-pointer" @click="() => emit('clickDetail', article)">
            {{ article.title }}
        </div>
        <div class="text-sm mt-2" v-if="article.createdAt">
            <span>
                创建于：{{ dateTimeFormat(article.createdAt) }}
            </span>
            <span class="ml-5" v-if="article.updatedAt">
                更新于：{{ dateTimeFormat(article.updatedAt) }}
            </span>
        </div>
        <div class="text-sm mt-2 px-2 py-1 bg-base-300 inline-block rounded-xl">
            <span>
                作者：{{ article.author?.nickname ?? "佚名" }}
            </span>
        </div>
        <div class="line-clamp-2 leading-4 mt-3 cursor-pointer opacity-60" @click="() => emit('clickDetail', article)">
            {{ article.desc }}
        </div>
    </div>
</template>

<style lang="scss" scoped></style>