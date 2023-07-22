<script lang="ts" setup>
useHead({
	title: "啊哦，出错了啊",
});

const props = defineProps<{
	error: any;
}>();
console.log(props.error);

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
	<div class="pt-[50px] text-center">
		<div class="font-bold text-[50px] text-center">
			{{ error.statusCode }}
		</div>
		<div
			class="p-5 bg-slate-200 max-w-lg min-h-[200px] items-center justify-center flex mx-auto my-5 rounded-md"
		>
			{{ error.message }}
		</div>
		<button class="btn" @click="handleError">回到首页</button>
	</div>
</template>
