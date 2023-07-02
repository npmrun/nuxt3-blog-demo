import * as bcrypt from "bcrypt"

export default defineEventHandler(async (event) => {
    const prisma = event.context.prisma
    const body = await readBody(event)

    const { username, email, password, repeatPassword, name } = body

    if (!username || !email || !password || !repeatPassword) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
    }

    if (password !== repeatPassword) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Passwords do not match' }))
    }

    const userData = {
        username,
        email,
        password: bcrypt.hashSync(password, 10),
        nickname: username,
        avatar: 'https://picsum.photos/200/200'
    }

    const user = await prisma.user.create({
        data: userData
    })

    return {
        body: user
    }
})