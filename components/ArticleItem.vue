<script setup lang="ts">
const props = defineProps<{
	article: any;
}>();
const emit = defineEmits<{
	(ev: "clickDetail", article: any): void;
}>();
</script>

<template>
	<div class="border-b pt-2 pb-4 px-10 mt-2">
		<div
			class="text-2xl line-clamp-1 cursor-pointer"
			@click="() => emit('clickDetail', article)"
		>
			{{ article.title }}
			<span class="text-sm text-red-400">{{
				article.published ? "" : "未发布"
			}}</span>
		</div>
		<div v-if="article.createdAt" class="text-sm mt-2">
			<span> 创建于：{{ dateTimeFormat(article.createdAt) }} </span>
			<span v-if="article.updatedAt" class="ml-5">
				更新于：{{ dateTimeFormat(article.updatedAt) }}
			</span>
		</div>
		<div class="text-sm mt-2 px-2 py-1 bg-base-300 inline-block rounded-xl">
			
			<span> 作者：<img class="w-[35px] h-[35px] rounded-full object-cover inline-block" :src="article.author?.avatar" alt=""> {{ article.author?.nickname ?? "佚名" }} </span>
		</div>
		<div
			class="line-clamp-2 leading-4 mt-3 cursor-pointer text-[#8895a6]"
			@click="() => emit('clickDetail', article)"
		>
			{{ article.desc }}
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
