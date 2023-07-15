/**
 * 查询文章详情
 * @权限 任意用户可查，未登录可查
 */

export default defineEventHandler(async (event) => {
	const prisma = event.context.prisma;
	const { id } = getQuery(event);
	const { user } = await requireUserSession(event);

	if (!id || isNaN(+id)) {
		return sendError(
			event,
			createError({ statusCode: 400, statusMessage: "Invalid params" }),
		);
	}

	const article = await prisma.article.delete({
		where: {
			id: +id,
			authorId: user.id,
		},
	});

	if (!article) {
		return sendError(
			event,
			createError({ statusCode: 400, statusMessage: "删除失败" }),
		);
	}

	return {
		statusCode: 200,
	};
});
