console.log("2");

export default eventHandler(async (event) => {
	// 接口不需要处理
	// if (event.path.startsWith("/api")) return;
	// TODO 接口需要权限的如果没有携带权限即全部报403
	// const prisma = event.context.prisma;
	// const adminUser = await prisma.user.findFirst({
	// 	where: {
	// 		role: "SUPERADMIN",
	// 	},
	// });
	// if (!adminUser && !event.path.startsWith("/adminRegister")) {
	// 	return sendRedirect(event, "/adminRegister");
	// }
	// if (adminUser && event.path.startsWith("/adminRegister")) {
	// 	return sendError(
	// 		event,
	// 		createError({ statusCode: 400, statusMessage: "不允许进入该页面" }),
	// 	);
	// }
	// const endpoints = [
	//     '/'
	// ]
	// const isHandledByThisMiddleware = endpoints.some(endopoint => {
	//     return endopoint.includes(event.path)
	// })
	// // 不属于endpoints中的路径时，检查是否登录，已登录就跳转首页，未登录就不处理
	// if (!isHandledByThisMiddleware) {
	//     try {
	//         await requireUserSession(event)
	//         return sendRedirect(event, "/")
	//     } catch (error) {
	//         return
	//     }
	// }
	// // 检查是否登录，未登录跳转login，已登录不处理
	// try {
	//     await requireUserSession(event)
	// } catch (error) {
	//     await clearUserSession(event)
	//     return sendRedirect(event, "/login")
	// }
});
