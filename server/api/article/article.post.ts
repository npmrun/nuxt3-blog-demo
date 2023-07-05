import * as bcrypt from "bcrypt"

export default defineEventHandler(async (event) => {
    const prisma = event.context.prisma
    const { user } = await requireUserSession(event)
    const body = await readBody(event)

    const { title, content, published } = body

    if (!title || !content) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
    }

    const articleData = {
        title,
        content,
        published,
        authorId: user.id
    }

    const articles = await prisma.article.create({
        data: articleData
    })

    return {
        statusCode: 200,
        data: articles
    }
})