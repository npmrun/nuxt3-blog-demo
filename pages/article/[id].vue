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
const router = useRouter();

const { data: res } = useFetch("/api/article/article", {
	method: "GET",
	query: {
		id: route.params.id,
	},
});

const article = computed(() => {
	return res.value?.data;
});
</script>

<template>
	<div class="m-5">
		<div class="text-sm breadcrumbs">
			<ul>
				<li>
					<NuxtLink :to="getLocalePath('/')">首页</NuxtLink>
				</li>
				<li>{{ article?.title ?? "加载中" }}</li>
			</ul>
		</div>
		<Viewer :plugins="[gfm(), frontmatter(), btybreaks()]" :locale="zhHans" :value="article?.content"></Viewer>
	</div>
</template>
