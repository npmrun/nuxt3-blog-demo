
export default defineEventHandler(async (event) => {
    const prisma = event.context.prisma
    const { user } = await requireUserSession(event);
    const body = await readBody(event);
    if (body.commentId !== void 0) {
        await prisma.replyComment.create({
            data: {
                title: body.title,
                content: body.content,
                status: "NOTADUIT",
                commentId: body.commentId,
                replyCommentId: body.replyCommentId,
                userId: user.id
            }
        })
        return {
            statusCode: 200,
            status: "success"
        };
    }
    await prisma.comment.create({
        data: {
            title: body.title,
            content: body.content,
            articleId: body.articleId,
            status: "NOTADUIT",
            userId: user.id,
        }
    })
    return {
        statusCode: 200,
        status: "success"
    };
})