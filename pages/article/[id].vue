<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import frontmatter from "@bytemd/plugin-frontmatter";
import btybreaks from "@bytemd/plugin-breaks";
import zhHans from "bytemd/locales/zh_Hans.json";
import { Viewer } from "@/components/MdEditor";
definePageMeta({
	layout: "main-layout",
});
const route = useRoute();
const { loggedIn } = useUserSession();

const { data: article } = useFetch("/api/article/article", {
	method: "GET",
	query: {
		id: route.params.id,
	},
	transform(input: any) {
		return input?.data;
	},
});
</script>

<template>
	<div class="mx-5 my-2">
		<div class="text-sm breadcrumbs">
			<ul>
				<li>
					<NuxtLink :to="getLocalePath('/')">首页</NuxtLink>
				</li>
				<li>{{ article?.title ?? "加载中" }}</li>
			</ul>
		</div>
		<NuxtLink v-if="loggedIn" :to="`/back/add?id=${route.params.id}`">
			<button class="btn">编辑</button>
		</NuxtLink>
		<Viewer
			:plugins="[gfm(), frontmatter(), btybreaks()]"
			:locale="zhHans"
			:value="article?.content"
		></Viewer>
	</div>
</template>
