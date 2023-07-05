
export default defineEventHandler(async (event) => {
    const prisma = event.context.prisma

    const articles = await prisma.article.findMany({
        where: {
            published: true
        },
        include: {
            author: {
                select: {
                    id: true,
                    nickname: true,
                    avatar: true
                }
            },
        },
    })

    return {
        statusCode: 200,
        data: articles
    }
})