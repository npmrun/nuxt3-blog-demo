<script setup lang="ts">
definePageMeta({
	layout: "admin-layout",
});

const route = useRoute();
const router = useRouter();

const isEdit = ref(false);
async function fetchData() {
	if (route.query.id) {
		try {
			const res = await $fetch("/api/article/article", {
				method: "GET",
				query: {
					id: route.query.id,
				},
			});
			if (res && res.data) {
				Object.assign(formData, res.data);
				isEdit.value = true;
			}
		} catch (error) {
			console.error(error);
			isEdit.value = false;
		}
	}
}

onBeforeMount(function () {
	fetchData();
});

const formData = reactive({
	id: undefined,
	title: "",
	content: "",
	published: true,
});

async function handleSubmit() {
	if (!formData.title) {
		useNuxtApp().$toast.error("标题不能为空");
		return;
	}
	if (!formData.content) {
		useNuxtApp().$toast.error("文章不能为空");
		return;
	}
	try {
		const res = await $fetch("/api/article/article", {
			method: "post",
			body: toRaw(formData),
		});
		console.log(res);
		if (isEdit.value) {
			useNuxtApp().$toast.success("编辑成功");
		} else useNuxtApp().$toast.success("新建成功");
	} catch (error: any) {
		if (error?.data?.statusMessage) {
			useNuxtApp().$toast.error(error.data.statusMessage);
		} else {
			useNuxtApp().$toast.error(error.message);
		}
	}
}

function toArticle() {
	router.push("/article/" + route.query.id);
	// window.open("/article/"+route.query.id)
}

async function handleUploadImages(files: File[]) {
	const formData = new FormData();
	files.forEach(file => {
		formData.append("file", file);
	})
	const res = await $fetch("/api/upload", {
		method: "POST",
		body: formData,
	})
	if (res && res.url) {
		return [
			{
				url: res.url
			},
		];
	}

}
</script>

<template>
	<div class="h-screen p-10 flex flex-col">
		<button class="btn mb-5" @click="$router.back()">返回</button>
		<button v-if="!!isEdit" class="btn mb-5" @click="toArticle()">
			查看文章
		</button>
		<form class="flex-1 h-0 flex flex-col" @submit.prevent="handleSubmit">
			<div class="form-control">
				<input v-model="formData.title" type="text" placeholder="文章标题"
					class="input input-bordered input-primary w-full max-w-xs" />
			</div>
			<MdEditorBaseMdEditor v-model:value="formData.content" class="mt-2 flex-1 h-0"
				:upload-images="handleUploadImages" @change="(v: string) => (formData.content = v)">
			</MdEditorBaseMdEditor>
			<div class="form-control mt-2 w-full max-w-xs">
				<label class="cursor-pointer label">
					<span class="label-text">发布</span>
					<input v-model="formData.published" type="checkbox" class="checkbox checkbox-success" />
				</label>
			</div>
			<div class="form-control join join-vertical lg:join-horizontal mt-2 w-full max-w-xs">
				<button type="submit" class="btn w-full join-item">保存</button>
			</div>
		</form>
	</div>
</template>

<style lang="scss" scoped></style>
