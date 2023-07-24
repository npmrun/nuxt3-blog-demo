<script setup lang="ts">
import type EditorJS from "@editorjs/editorjs"

definePageMeta({
	layout: "pure-layout",
});

let EditorJSInstance: EditorJS

onMounted(async () => {
	const EditorJS = (await import("@editorjs/editorjs")).default;
	// @ts-ignore
	const Header = (await import("@editorjs/header")).default;
	// @ts-ignore
	const List = (await import("@editorjs/list")).default;

	EditorJSInstance = new EditorJS({
		holder: "editorjs",
		placeholder: '这里是个编辑器，请尽情发挥你的创作欲望吧！！！',
		tools: {
			header: {
				class: Header,
				inlineToolbar: ['link']
			},
			list: {
				class: List,
				inlineToolbar: true
			}
		},
	})
});
</script>

<template>
	<div class="w-[300px] bg-base-200 fixed top-0 left-0 bottom-0">
		这里是编辑器，开发中。。。
	</div>
	<div class="prose">
		<div id="editorjs"></div>
	</div>
	<div class="w-[300px] bg-base-200 fixed top-0 right-0 bottom-0"></div>
</template>
<style lang="scss" scoped>
// #editorjs {
// 	width: calc(100% - 600px);
// 	margin-left: 300px;
// 	padding: 0 60px;
// }
.prose {
	max-width: 100%;
	width: calc(100% - 600px) !important;
	margin-left: 300px;
	padding: 0 60px;
}
</style>