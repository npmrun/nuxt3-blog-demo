
export default defineEventHandler(async (event) => {
    const prisma = event.context.prisma
    const { id } = getQuery(event)
    
    if (!id || isNaN(+id)) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
    }

    const article = await prisma.article.findUnique({
        where: {
            id: +id
        }
    })

    if(!article){
        return sendError(event, createError({ statusCode: 400, statusMessage: '不存在该文章' }))
    }

    return {
        statusCode: 200,
        data: article
    }
})