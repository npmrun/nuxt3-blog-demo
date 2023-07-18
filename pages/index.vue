<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import frontmatter from "@bytemd/plugin-frontmatter";
import btybreaks from "@bytemd/plugin-breaks";
import zhHans from "bytemd/locales/zh_Hans.json";
import indexMD from "./index.md?raw";
import { Viewer } from "@/components/MdEditor";

definePageMeta({
	layout: "main-layout",
});

const content = ref(indexMD);

const { $toast: toast } = useNuxtApp();
</script>

<template>
	<!-- <div class="fixed top-[50px] bottom-0 right-0 left-[40%] m-5"> -->
	<div class="p-5">
		<!-- <Viewer
			:plugins="[gfm(), frontmatter(), btybreaks()]"
			:locale="zhHans"
			:value="content"
		></Viewer> -->
		<!-- <picture>
			<source
				src="https://web-abin.github.io/abinWeb/static/home.332c003f.jpg"
			/>
			<img
				style="
					transform: rotateY(180deg);
					height: 100vh;
					object-fit: cover;
				"
				src="https://web-abin.github.io/abinWeb/static/home.332c003f.jpg"
				alt=""
			/>
		</picture> -->
		<!-- <iframe
			class="h-full w-full"
			src="http://www.cross-code.com/en/start"
			frameborder="0"
		></iframe> -->
		<h1 class="text-3xl font-bold my-4">书籍</h1>
		<div
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3"
		>
			<Card
				v-for="i in 12"
				:key="i + ''"
				@click="toast.warn('暂未实现')"
			></Card>
		</div>
		<h1 class="text-3xl font-bold my-4">游戏</h1>
		<div
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3"
		>
			<a href="http://www.cross-code.com/en/start" target="_blank">
				<Card></Card>
			</a>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
