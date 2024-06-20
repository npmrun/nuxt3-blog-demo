import bcrypt from "bcryptjs";
import { z } from "zod";

const schema = z.object({
	username: z.string({
		required_error: '用户名必须填写',
		invalid_type_error: "username字段无效类型",
	}),
	email: z.string().email({ message: "邮箱格式不正确" }),
	password: z.string().min(6, { message: "密码不应小于6位" }).max(20, { message: "密码不应超过20位" }),
	repeatPassword: z.string(),
})


export default defineEventHandler(async (event) => {

	const result = await readValidatedBody(event, (data) => schema.safeParse(data))
	if (!result.success) {
		throw sendError(event, createError({
			statusCode: 500,
			data: result.error.issues,
			statusMessage: result.error.issues.map(v => v.message).join(",")
		}))
	}

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

	const { username, email, password, repeatPassword } = result.data;

	if (password !== repeatPassword) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: "密码与重复密码不匹配",
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
