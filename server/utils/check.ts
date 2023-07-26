import type { H3Event } from "h3";
import { ERole } from "./role";

export async function checkSuperAdmin(event: H3Event) {
	const prisma = event.context.prisma;
	const adminUser = await prisma.user.findFirst({
		where: {
			role: "SUPERADMIN",
		},
	});
	if (adminUser) {
		throw createError({
			statusCode: 400,
			statusMessage: "超级管理员已注册",
		});
	}
}

export async function checkRoute(
	event: H3Event,
	opts: { role?: ERole; auth?: boolean; SUPERADMIN?: boolean },
) {
	if (opts.SUPERADMIN) {
		return await checkSuperAdmin(event);
	}

	if (opts.role) {
		opts.auth = true;
	}

	let user;
	if (opts.auth) {
		user = (await requireUserSession(event))?.user;
	}
	if (opts.role) {
		if (user.role === opts.role) {
			return sendError(
				event,
				createError({
					statusCode: 401,
					statusMessage: "您无此权限",
				}),
			);
		}
	}
}
