export default eventHandler(async (event) => {
    const endpoints = [
        '/'
    ]

    const isHandledByThisMiddleware = endpoints.some(endopoint => {
        return endopoint.includes(event.path)
    })

    if (!isHandledByThisMiddleware) {
        if(event.path.startsWith("/api")) return
        try {
            await requireUserSession(event)
            return sendRedirect(event, "/")
        } catch (error) {
            return 
        }
    }

    try {
        await requireUserSession(event)
    } catch (error) {
        await clearUserSession(event)
        return sendRedirect(event, "/login")
    }
})