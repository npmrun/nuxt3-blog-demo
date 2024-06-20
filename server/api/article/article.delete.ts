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

	const { user } = await requireUserSession(event);

	try {
		await prisma.$transaction([
			// 删除评论，可能还需要删除评论回复
			prisma.comment.deleteMany({
				where: {
					articleId: id,
				},
			}),
			// 删除文章
			prisma.article.delete({
				where: {
					id: +id,
					authorId: user.id,
				},
			})
		]);
	} catch (error) {
		logger.debug(error)
		sendError(
			event,
			createError({ statusCode: 400, statusMessage: "删除失败" }),
		);
	}

	return {
		statusCode: 200,
	};
});
