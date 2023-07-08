<script setup lang="ts"></script>

<template>
	<div class="">
		<div class="fixed left-0 top-0 bottom-0 bg-base-200 w-56">
			<h1 class="p-4 text-5xl font-bold">YSir</h1>
			<ul class="menu bg-base-200 w-56 rounded-box">
				<li>
					<NuxtLink to="/"> 返回首页 </NuxtLink>
				</li>
			</ul>
			<ul class="menu bg-base-200 w-56 rounded-box">
				<li>
					<NuxtLink to="/back"> 文章 </NuxtLink>
				</li>
				<li>
					<NuxtLink to="/back/about"> 关于 </NuxtLink>
				</li>
			</ul>
		</div>
		<div class="ml-56">
			<slot></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.router-link-active {
	background-color: hsl(var(--bc) / 0.1);
}
</style>
