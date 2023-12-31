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
const { loggedIn, user } = useUserSession();

async function deleteArticle() {
	if (!route.params.id) return;
	pending.value = true;
	try {
		await $fetch("/api/article/article", {
			method: "DELETE",
			query: {
				id: route.params.id,
			},
		});
		pending.value = false;
		useNuxtApp().$toast.success("删除成功");
		router.back();
	} catch (error) {
		pending.value = false;
		console.error(error);
		useNuxtApp().$toast.success("删除失败");
	}
}

const {
	data: article,
	pending,
	error,
} = useFetch("/api/article/article", {
	method: "GET",
	query: {
		id: route.params.id,
	},
	default() {
		return {
			title: "",
			content: "",
			author: {
				id: undefined,
			},
		};
	},
	transform(input: any) {
		return input?.data;
	},
});
watchEffect(() => {
	useHead({
		title: article.value?.title ?? "文章",
	});
});

const computedContent = computed(() => {
	if (article.value?.content) {
		return article.value.content; // .replace(/\n/g, "<br>");
	}
});

const showRaw = ref(false);
</script>

<template>
	<div class="mx-5 my-2">
		<div class="text-sm breadcrumbs flex">
			<ul>
				<li>
					<NuxtLink :to="getLocalePath('/articles')">文章</NuxtLink>
				</li>
				<li>{{ article.title ?? "加载中" }}</li>
			</ul>
			<div
				class="ml-3 rounded-xl inline-block px-5 py-2 cursor-pointer hover:bg-base-200"
				@click="showRaw = !showRaw"
			>
				{{ showRaw ? "查看文章" : "查看源码" }}
			</div>
			<NuxtLink
				v-if="loggedIn && user.id === article.author.id"
				class="ml-3 rounded-xl inline-block px-5 py-2 cursor-pointer hover:bg-base-200"
				:to="`/back/add?id=${route.params.id}`"
			>
				编辑
			</NuxtLink>
			<div
				v-if="loggedIn && user.id === article.author.id"
				class="ml-3 rounded-xl inline-block px-5 py-2 cursor-pointer hover:bg-base-200"
				@click="deleteArticle"
			>
				删除
			</div>
		</div>
		<div v-loading="pending">
			<template v-if="!!error">
				<div class="text-center mt-5">
					<div class="text-red-500 mb-2">
						{{ error?.data.statusMessage ?? error }}
					</div>
					<button class="btn btn-sm" @click="$router.back()">
						返回
					</button>
				</div>
			</template>
			<Viewer
				v-else-if="!showRaw"
				:plugins="[gfm(), frontmatter(), btybreaks()]"
				:locale="zhHans"
				:value="article.content"
			></Viewer>
			<template v-else-if="showRaw">
				<div
					style="white-space: pre-wrap"
					v-text="computedContent"
				></div>
			</template>
		</div>
		<ClientOnly>
			<div>sadas</div>
		</ClientOnly>
	</div>
</template>
