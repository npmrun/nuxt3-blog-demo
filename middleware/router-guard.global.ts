/**
 * 该中间件分两部分，一个是在服务器端，即浏览器刚进入该网址时判断，后续的跳转由客户端接管
 *
 * abortNavigation会在浏览器刚进入页面时出现错误界面
 */

export default defineNuxtRouteMiddleware((to, from) => {
	if (to.path === "/_tailwind") {
		return true;
	}

	const { loggedIn } = useUserSession();
	const AuthPages = ["/login", "/register", "/en/login", "/en/register"];

	if (loggedIn.value && AuthPages.includes(to.path)) {
		return navigateTo("/");
	}

	if (!loggedIn.value && to.path.startsWith("/back")) {
		return navigateTo("/");
	}

	// if (to.fullPath === '/infors') {
	//     // 重定向
	//     return navigateTo('/applyCode')
	// }
	// if (to.fullPath === '/login') {
	//     // 停止当前导航
	//     return abortNavigation('禁止进入页面')
	//     return abortNavigation()
	// }
	// if (to.fullPath === '/comePay/comePay') {
	//     // 拒绝当前导航并出现错误
	//     return abortNavigation('禁止进入页面')
	// }
});
