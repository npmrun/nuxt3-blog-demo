import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
	const prisma = event.context.prisma;

	const node = await getConfigByKey(event, ESiteConfig.CanRegister);

	// 生产环境中没有设置canRegister配置的不能注册
	// canRegister为OFF的不能注册
	if ((!node && !isDev) || (node && node.value === "OFF")) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: "管理员未开启注册功能",
			}),
		);
	}

	const body = await readBody(event);

	const { username, email, password, repeatPassword } = body;

	if (!username || !email || !password || !repeatPassword) {
		return sendError(
			event,
			createError({ statusCode: 400, statusMessage: "Invalid params" }),
		);
	}
	if (password.length < 6 || password.length > 20) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: "密码不应超过20位，不应小于6位",
			}),
		);
	}
	if (password !== repeatPassword) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: "Passwords do not match",
			}),
		);
	}

	const userData = {
		username,
		email,
		password: bcrypt.hashSync(password, 10),
		nickname: username,
		avatar: "https://picsum.photos/200/200",
	};
	// https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#or
	const check = await prisma.user.findFirst({
		where: {
			OR: [
				{
					username: {
						equals: userData.username,
					},
				},
				{
					email: {
						equals: userData.email,
					},
				},
			],
		},
	});
	if (check) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: "邮箱或用户名重复",
			}),
		);
	}

	const user = await prisma.user.create({
		data: userData,
	});

	return {
		body: user,
	};
});
