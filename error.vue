<script lang="ts" setup>
useHead({
	title: "啊哦，出错了啊",
});

defineProps<{
	error: any;
}>();

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
	<div>
		<div v-if="error.statusCode === 404">404</div>
		{{ error }}
		<button class="btn" @click="handleError">Clear errors</button>
	</div>
</template>
