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
        <div class="text-sm">
            {{ article.author?.nickname ?? "佚名" }}
        </div>
        <div class="line-clamp-2 leading-4 mt-3 cursor-pointer" @click="() => emit('clickDetail', article)">
            {{ article.desc }}
        </div>
    </div>
</template>

<style lang="scss" scoped></style>