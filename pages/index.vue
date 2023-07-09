<script setup lang="ts">
definePageMeta({
	layout: "main-layout",
});
const { locale } = useI18n();
const { user, loggedIn } = useUserSession();
const localePath = useLocalePath();
const router = useRouter();

async function handleQuit() {
	const { clear } = useUserSession();
	await clear();
	useTo("退出成功", "/");
}

const { data: articles } = useFetch("/api/article/articles", {
	transform(input) {
		return input?.data ?? [];
	},
}) as any;
console.log(inBrowser);


function toDetail(record: any) {
	router.push(localePath("/article/" + record.id));
}
</script>

<template>
	<div class="min-h-screen overflow-hidden">
		<ArticleItem v-for="(article, index) in articles" :key="index" :article="article" @click-detail="toDetail">
		</ArticleItem>
		<!-- <picture>
			<source src="https://web-abin.github.io/abinWeb/static/home.332c003f.jpg">
			<img style="transform: rotateY(180deg);height: 100vh;object-fit: cover;" src="https://web-abin.github.io/abinWeb/static/home.332c003f.jpg"
				alt="">
		</picture> -->
		<!-- <iframe class="h-screen w-full" src="http://www.cross-code.com/en/start" frameborder="0"></iframe> -->
	</div>
</template>

<style lang="scss" scoped></style>
