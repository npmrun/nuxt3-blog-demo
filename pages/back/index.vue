<script setup lang="ts">
definePageMeta({
	layout: "admin-layout",
});

const { data: articles } = useFetch("/api/article/articles", {
	transform(input) {
		return input?.data ?? [];
	},
}) as any;

const router = useRouter()
function handleEdit(data: any) {
	router.push('/back/add?id=' + data.id)
}
</script>
<template>
	<div class="m-10">
		<div>
			<button class="btn" @click="$router.push('/back/add')">新建文章</button>
			<ArticleItem v-for="(article, index) in articles" :key="index" :article="article" @click-detail="handleEdit">
			</ArticleItem>
		</div>

	</div>
</template>

<style lang="scss" scoped></style>
