/**
 * 查询文章详情
 * @权限 任意用户可查，未登录可查
 */

import { z } from "zod";

const querySchema = z.object({
	id: z.coerce.number({
		required_error: 'id必须填写',
		invalid_type_error: "id字段无效类型",
	}).min(1, { message: "id不能为空" })
})

export default defineEventHandler(async (event) => {
	const prisma = event.context.prisma;
	const result = await getValidatedQuery(event, (data) => querySchema.safeParse(data))
	if (!result.success) {
		throw sendError(event, createError({
			statusCode: 500,
			data: result.error.issues,
			statusMessage: result.error.issues.map(v => v.message).join(",")
		}))
	}
	const id = result.data.id

	const article = await prisma.article.findUnique({
		where: {
			id: +id,
		},
		select: {
			id: true,
			content: true,
			title: true,
			desc: true,
			published: true,
			author: {
				select: {
					id: true,
				},
			},
		},
	});

	if (!article) {
		return sendError(
			event,
			createError({ statusCode: 400, statusMessage: "不存在该文章" }),
		);
	}

	return {
		statusCode: 200,
		data: article,
	};
});
