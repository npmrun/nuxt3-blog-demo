<script setup lang="ts">
const { loggedIn, user } = useUserSession();
const router = useRouter();
const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();

watch(
	() => locale.value,
	() => {
		if (locale.value) {
			router.replace(switchLocalePath(locale.value));
		}
	}
);

const emit = defineEmits(["success"])
// nextTick(() => {
//     if (process.client) {
//         useNuxtApp().$toast('notify after nextTick')
//     }
// })

// const notify = () => {
//     useNuxtApp().$toast.info('toastify success')
// }

const formData = reactive({
	email: "",
	password: "",
});
async function login() {
	try {
		if (!formData.email) {
			useNuxtApp().$toast.error("请输入邮箱");
			return;
		}
		if (!formData.password) {
			useNuxtApp().$toast.error("请输入密码");
			return;
		}
		await $fetch("/api/auth/login", {
			method: "post",
			body: toRaw(formData),
		});
		await useUserSession().fetch(); // 登录 session
		useTo(`欢迎您, ${user.value.nickname}`);
        emit("success")
	} catch (error: any) {
		useNuxtApp().$toast.error(error.data.statusMessage);
	}
}
</script>

<template>
	<div
		class="font-sans bg-cover bg-landscape relative"
	>
		<!-- <Bg></Bg> -->
		<div
			class="container flex items-center justify-center flex-1 h-full mx-auto"
		>
			<div class="w-full max-w-lg">
				<div class="leading-loose">
					<!-- <button @click="notify">notify by click</button> -->
					<!-- @submit.prevent -->
					<form
						class="max-w-sm p-3 m-auto"
						@submit.prevent="login"
					>
						<p class="mb-8 text-2xl font-light text-center">
							{{ $t("login.title") }}
						</p>
						<div class="mb-2">
							<div class="relative">
								<input
									id="login-with-bg-email"
									v-model="formData.email"
									type="text"
									name="email"
									class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
									:placeholder="$t('login.email')"
								/>
							</div>
						</div>
						<div class="mb-2">
							<div class="relative">
								<input
									id="login-with-bg-password"
									v-model="formData.password"
									type="text"
									name="password"
									class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
									:placeholder="$t('login.password')"
								/>
							</div>
						</div>
						<div class="flex items-center justify-between mt-4">
							<button
								type="submit"
								class="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
							>
								{{ $t("login.validate") }}
							</button>
						</div>
						<div class="text-center">
							<NuxtLink
								:to="localePath('/register')"
								class="right-0 inline-block text-sm font-light align-baseline text-500 hover:text-gray-800"
							>
								{{ $t("login.register") }}
							</NuxtLink>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
