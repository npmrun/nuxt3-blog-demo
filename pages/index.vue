<script setup lang="ts">
definePageMeta({
	layout: "main-layout",
});
const { locale } = useI18n();
const { user, loggedIn } = useUserSession();
const localePath = useLocalePath();
const route = useRoute();
const router = useRouter();

async function handleQuit() {
	const { clear } = useUserSession();
	await clear();
	useTo("退出成功", "/");
}

const pageQuery = ref({
	pageNum: 1,
	pageSize: 10,
})
watchEffect(() => {
	if (route.query.page) {
		pageQuery.value.pageNum = +route.query.page ?? 1
	}
})
watch(() => pageQuery.value.pageNum, () => {
	router.replace({ query: { page: pageQuery.value.pageNum } })
})

const { data: articleData } = useFetch("/api/article/articles", {
	query: pageQuery,
	default() {
		return {
			total: 0,
			list: [],
		}
	},
	transform(input: any) {
		return {
			total: input?.total ?? 0,
			list: input?.data ?? []
		};
	}
}) as any;

function toDetail(record: any) {
	router.push(localePath("/article/" + record.id));
}

const allCount = computed(() => {
	return Math.ceil(articleData.value.total / pageQuery.value.pageSize)
})
</script>

<template>
	<div class="min-h-screen overflow-hidden">
		<ArticleItem v-for="(article, index) in articleData.list" :key="index" :article="article" @click-detail="toDetail">
		</ArticleItem>
		<div class="flex justify-center mt-6 mb-6">
			<div class="join">
				<button v-for="item in allCount" class="join-item btn" :class="[pageQuery.pageNum === item ? 'btn-active' : '']"
					@click="pageQuery.pageNum = item">{{ item }}</button>
			</div>
		</div>
		<!-- <picture>
			<source src="https://web-abin.github.io/abinWeb/static/home.332c003f.jpg">
			<img style="transform: rotateY(180deg);height: 100vh;object-fit: cover;" src="https://web-abin.github.io/abinWeb/static/home.332c003f.jpg"
				alt="">
		</picture> -->
		<!-- <iframe class="h-screen w-full" src="http://www.cross-code.com/en/start" frameborder="0"></iframe> -->
	</div>
</template>

<style lang="scss" scoped></style>
