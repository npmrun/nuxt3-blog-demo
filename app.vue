<script lang="ts" setup>
// @ts-ignore
// import { emojiCursor  } from "cursor-effects";

// onMounted(() => {
// 	// eslint-disable-next-line no-new, new-cap
// 	emojiCursor({ emoji: ["🔥", "🐬", "🦆"] });
// });

// useHead({
// 	title: "YYSir's home",
// 	meta: [
// 		{ name: 'keywords', content: '11前端, keywords' },
// 		{ name: 'description', content: '博客' }
// 	],
// });
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>