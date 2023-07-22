import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
	const prisma = event.context.prisma;
	const body = await readBody(event);

	const { email, password } = body;

	if (!email || !password) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: "Ivalid params",
			}),
		);
	}

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (!user) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: "Email or password is invalid",
			}),
		);
	}

	const doesThePasswordMatch = await bcrypt.compare(password, user.password);

	if (!doesThePasswordMatch) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: "Username or password is invalid",
			}),
		);
	}

	await setUserSession(event, {
		user: {
			id: user.id,
			role: user.role,
			email: user.email,
			username: user.username,
			nickname: user.nickname,
		},
	});
	return {
		statusCode: 200,
		user,
	};
});
