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
						<NuxtLink :to="localePath('/')">
							<button class="btn btn-sm">首页</button>
						</NuxtLink>
						<NuxtLink :to="localePath('/back')">
							<button class="btn btn-sm">进入后台</button>
						</NuxtLink>
						<NuxtLink :to="localePath('/about')">
							<button class="btn btn-sm">关于</button>
						</NuxtLink>
						<button class="btn btn-sm" @click="handleQuit">
							退出
						</button>
					</template>
					<template v-else>
						<NuxtLink :to="localePath('/')">
							<button class="btn btn-sm">首页</button>
						</NuxtLink>
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
		<slot />
	</main>
</template>

<style lang="scss" scoped></style>
