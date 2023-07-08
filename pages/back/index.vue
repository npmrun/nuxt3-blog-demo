<script setup lang="ts">
definePageMeta({
	layout: "admin-layout",
});
const formData = reactive({
	title: "",
	content: "",
	published: false,
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
	const res = await $fetch("/api/article/article", {
		method: "post",
		body: toRaw(formData),
	});
	console.log(res);

	useNuxtApp().$toast.success("新建成功");
}
</script>
<template>
	<div class="m-10">
		<form @submit.prevent="handleSubmit">
			<div class="form-control">
				<input
					v-model="formData.title"
					type="text"
					placeholder="文章标题"
					class="input input-bordered input-primary w-full max-w-xs"
				/>
			</div>
			<div class="mt-2 form-control">
				<MdEditor
					v-model:value="formData.content"
					class="h-[500px]"
					@change="(v: string) => formData.content = v"
				>
				</MdEditor>
			</div>
			<div class="form-control mt-2 w-full max-w-xs">
				<label class="cursor-pointer label">
					<span class="label-text">发布</span>
					<input
						v-model="formData.published"
						type="checkbox"
						class="checkbox checkbox-success"
					/>
				</label>
			</div>
			<div
				class="form-control join join-vertical lg:join-horizontal mt-2 w-full max-w-xs"
			>
				<button type="submit" class="btn w-full join-item">保存</button>
			</div>
		</form>
	</div>
</template>

<style lang="scss" scoped></style>
