<script setup lang="ts">
definePageMeta({
	layout: "pure-layout",
});

onMounted(async () => {
	// if (inBrowser) {
	const EditorJS = (await import("@editorjs/editorjs")).default;
	console.log(3);
	const editor = new EditorJS({
		holder: "editorjs",
	});
	// }
});
</script>

<template>
	<div class="w-80 bg-base-200 fixed top-0 left-0 bottom-0"></div>
	<div id="editorjs"></div>
	<div class="w-80 bg-base-200 fixed top-0 right-0 bottom-0"></div>
</template>
