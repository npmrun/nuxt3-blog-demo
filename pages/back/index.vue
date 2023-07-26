<script setup lang="ts">
definePageMeta({
	layout: "admin-layout",
});

const pageQuery = ref({
	pageNum: 1,
	pageSize: 10,
});

const { data: articlesData } = useFetch("/api/article/articles_all", {
	query: pageQuery,
	default() {
		return {
			total: 0,
			list: [],
		};
	},
	transform(input: any) {
		return {
			total: input?.total ?? 0,
			list: input?.data ?? [],
		};
	},
}) as any;

const router = useRouter();
function handleEdit(data: any) {
	router.push("/back/add?id=" + data.id);
}

const allCount = computed(() => {
	return Math.ceil(articlesData.value.total / pageQuery.value.pageSize);
});
</script>
<template>
	<div class="m-10">
		<div>
			<button class="btn" @click="$router.push('/back/add')">
				新建文章
			</button>
			<ArticleItem v-for="(article, index) in articlesData.list" :key="index" :article="article"
				@click-detail="handleEdit">
			</ArticleItem>
			<div class="pt-5 text-center" v-if="articlesData.list.length == 0">
				空空如也~
			</div>
			<div v-if="!!allCount" class="flex justify-center mt-6 mb-6">
				<div class="join">
					<button v-for="item in allCount" :key="item" class="join-item btn" :class="[
						pageQuery.pageNum === item ? 'btn-active' : '',
					]" @click="pageQuery.pageNum = item">
						{{ item }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
