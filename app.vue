<script lang="ts" setup>
// @ts-ignore
import { bubbleCursor } from "cursor-effects";

onMounted(()=>{
	new bubbleCursor();
})

// watch(loggedIn, () => {
//   if (!loggedIn.value) {
//     navigateTo('/')
//   }
// })
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
