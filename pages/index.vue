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
</script>

<template>
	<!-- <div class="fixed top-[50px] bottom-0 right-0 left-[40%] m-5"> -->
	<div class="m-5">
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
		<div
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3"
		>
			<div
				v-for="i in 1"
				:key="i + ''"
				class="bg-base-200 relative pb-[130%] w-[100%] rounded-xl overflow-hidden cursor-pointer shadow-xl group transform hover:-translate-y-2 transition-transform"
			>
				<div
					class="absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] transform"
				>
					<Icon
						name="icon-park-outline:loading-two"
						class="text-base-300"
						size="32"
					></Icon>
				</div>
				<img
					class="w-full h-full left-0 right-0 absolute object-cover filter group-hover:grayscale transform group-hover:scale-125 group-hover:rotate-6 transition-all"
					src="https://web-abin.github.io/abinWeb/static/home.332c003f.jpg"
					alt=""
				/>
				<div
					class="absolute bottom-0 text-base-100 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-2 py-1 text-center text-sm opacity-80 line-clamp-1"
				>
					梦中好杀人
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
