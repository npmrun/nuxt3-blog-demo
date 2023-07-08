<script setup lang="ts">
const route = useRoute();
</script>

<template>
	<div class="h-[61px]"></div>
	<div
		id="TopNav"
		class="fixed top-0 bg-white z-30 flex items-center w-full border-b h-[61px]"
	>
		<div
			:class="route.fullPath === '/' ? 'max-w-[1150px]' : ''"
			class="flex items-center justify-between w-full px-6 mx-auto"
		>
			<div
				:class="
					route.fullPath === '/'
						? 'max-w-[80%]'
						: 'lg:w-[20%] w-[70%]'
				"
			>
				<NuxtLink to="/">
					<img width="115" src="@/assets/images/tiktok-logo.png" />
				</NuxtLink>
			</div>

			<div
				class="hidden md:flex items-center bg-[#F1F1F2] p-1 rounded-full max-w-[380px] w-full"
			>
				<input
					type="text"
					class="w-full pl-3 my-2 bg-transparent placeholder-[#838383] text-[15px] focus:outline-none"
					placeholder="Search accounts"
				/>
				<div
					class="px-3 py-1 flex items-center border-l border-l-gray-300"
				>
					<Icon name="ri:search-line" color="#A1A2A7" size="22" />
				</div>
			</div>

			<div
				class="flex items-center justify-end gap-3 min-w-[275px] max-w-[320px] w-full"
			>
				<button
					class="flex items-center border rounded-sm px-3 py-[6px] hover:bg-gray-100"
				>
					<Icon name="mdi:plus" color="#000000" size="22"></Icon>
					<span class="px-2 font-medium text-[15px]">Upload</span>
				</button>
			</div>
			<div v-if="false" class="flex items-center">
				<button
					class="flex items-center bg-[#F02C56] text-white border rounded-md px-3 py-[6px]"
				>
					<span class="mx-4 font-medium text-[15px]">Log in</span>
				</button>
				<Icon name="mdi:dots-vertical" color="#161724" size="25"></Icon>
			</div>
			<div class="flex items-center">
				<Icon
					class="ml-1 mr-4"
					name="carbon:send-alt"
					color="#161724"
					size="30"
				/>
				<Icon
					class="mr-5"
					name="bx:message-detail"
					color="#161724"
					size="27"
				/>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
