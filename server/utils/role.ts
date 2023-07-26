import type { H3Event } from "h3";

export const enum ERole {
	USER = "USER",
	SUPERADMIN = "SUPERADMIN",
}

export async function checkRole(event: H3Event, role: ERole) {
	const { user } = await requireUserSession(event);
	if (user.role === role) {
		return sendError(
			event,
			createError({
				statusCode: 401,
				statusMessage: "您无此权限",
			}),
		);
	}
}
