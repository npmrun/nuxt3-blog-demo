<script lang="ts" setup>
// @ts-ignore
import { bubbleCursor } from "cursor-effects";

onMounted(() => {
	// eslint-disable-next-line no-new, new-cap
	new bubbleCursor();
});
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
