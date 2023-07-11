/**
 * 获取文章列表
 * @权限 所有用户可查，未登录可查
 */

export default defineEventHandler(async (event) => {
	const prisma = event.context.prisma;

	const { pageNum, pageSize } = getQuery(event) as { pageSize: number, pageNum: number };

	const articles = await prisma.article.findMany({
		where: {
			published: true,
		},
		orderBy: {
			updatedAt: "desc"
		},
		take: +pageSize || undefined,
		skip: ((pageNum && (pageNum - 1)) ?? 0) * (pageSize ?? 0),
		include: {
			author: {
				select: {
					id: true,
					nickname: true,
					avatar: true,
				},
			},
		},
	});

	const total = await prisma.article.count({
		where: {
			published: true,
		}
	})

	return {
		statusCode: 200,
		total: total,
		data: articles,
	};
});
