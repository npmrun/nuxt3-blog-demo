<script setup lang="ts">
const { locale } = useI18n();
const { user, loggedIn } = useUserSession();
const localePath = useLocalePath();

async function handleQuit() {
	const { clear } = useUserSession();
	await clear();
	useTo("退出成功");
}


</script>

<template>
	<div class="fixed top-0 left-0 bottom-0 w-[40%] justify-center bg-base-200 hidden sm:flex">
		<div class="text-center pt-[30%]">
			<div class="avatar mb-4">
				<div class="w-24 mask mask-hexagon">
					<img src="https://xieyaxin.top/me.jpeg" />
				</div>
			</div>
			<h1 class="text-5xl font-bold">YSir</h1>
			<p class="mt-2">生活都在过去，现在与未来只需静心</p>
			<div>
				<ul class="mt-4 justify-center inline-grid grid-cols-2 gap-2">
					<li title="github" class="p-1 rounded-lg cursor-pointer">
						<a href="https://github.com/npmrun" target="_blank">
							<Icon name="carbon:logo-github" size="25"></Icon>
						</a>
					</li>
					<li title="blog" class="p-1 rounded-lg cursor-pointer">
						<a href="https://blog.xieyaxin.top" target="_blank">
							<Icon name="carbon:book" size="25"></Icon>
						</a>
					</li>
				</ul>
			</div>
			<div class="mt-2 inline-grid grid-cols-2 gap-4">
				<ChangeTheme></ChangeTheme>
				<ChangeLanguage></ChangeLanguage>
			</div>
			<div>
				<ul class="mt-4 justify-center flex">
					<template v-if="loggedIn">
						<NuxtLink :to="localePath('/back')">
							<button class="btn btn-sm">进入后台</button>
						</NuxtLink>
						<button class="btn btn-sm" @click="handleQuit">
							退出
						</button>
					</template>
					<template v-else>
						<NuxtLink v-if="!loggedIn" :to="localePath('/login')">
							<button class="btn btn-sm">登陆</button>
						</NuxtLink>
					</template>
				</ul>
			</div>
		</div>
		<!-- <Bg></Bg> -->
		<canvas id="snow"
			class="absolute filter brightness-[.8] w-full h-full overflow-hidden pointer-events-none"></canvas>
	</div>
	<main class="ml-[40%] wrap-outer">
		<div class="h-[50px] border-b flex items-center px-[35px] text-sm font-bold sticky top-0 bg-base-100 shadow-sm z-10">
			<NuxtLink to="/" class="rounded-xl inline-block px-5 py-2 cursor-pointer hover:bg-base-200">
				首页
			</NuxtLink>
			<NuxtLink to="/about" class="rounded-xl inline-block px-5 py-2 cursor-pointer hover:bg-base-200">
				关于
			</NuxtLink>
		</div>
		<slot />
	</main>
</template>

<style lang="scss" scoped>
.router-link-active {
	@apply bg-base-200;
}
</style>
