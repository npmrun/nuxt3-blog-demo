
export default defineEventHandler(async (event) => {
    const prisma = event.context.prisma

    const { pageNum, pageSize, articleId } = getQuery(event) as {
        articleId: number;
        pageSize: number;
        pageNum: number;
    };

    const comments = await prisma.comment.findMany({
        where: {
            articleId: +articleId
        },
        orderBy: {
            updatedAt: "desc",
        },
        include: {
            ReplyComment: {
                include: {
                    childComments: true
                }
            }
        },
        take: +pageSize || undefined,
        skip: ((pageNum && pageNum - 1) ?? 0) * (pageSize ?? 0),
    });
    return {
        statusCode: 200,
        data: comments,
    };
})