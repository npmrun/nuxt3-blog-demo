<script setup lang="ts">
definePageMeta({
	layout: "main-layout",
});
</script>

<template>
	<div class="p-5">
		<!-- <div class="fixed top-[50px] bottom-0 right-0 left-[40%] m-5"> -->
		<h1 class="text-3xl font-bold my-4">书籍</h1>
		<div
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3"
		>
			<AppLink v-for="i in 1" :key="i + ''" to="/books">
				<Card></Card>
			</AppLink>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
