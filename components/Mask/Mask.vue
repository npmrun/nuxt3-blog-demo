<template>
	<div class="loading-comp">
		<div class="loading-comp__mask"></div>
		<div class="loading-comp__wrapper">
			<div class="loading-comp__text">
				<span class="loading mr-3"></span>{{ text }}
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const porps = withDefaults(
	defineProps<{
		text?: string;
	}>(),
	{
		text: "加载中",
	}
);
</script>

<style lang="scss" scoped>
.loading-comp {
	.loading-comp__mask {
		background-color: rgba(255, 255, 255, 0.699);
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
	}
	.loading-comp__wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate3d(-50%, -50%, 0);
		text-align: center;
		.loading-comp__text {
			color: #333;
			display: flex;
			align-items: center;
		}
	}
}
</style>
