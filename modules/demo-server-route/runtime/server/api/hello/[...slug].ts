import { createRouter, defineEventHandler, useBase } from 'h3'

const router = createRouter()

router.get('/test', defineEventHandler({
    onRequest: defineRequestMiddleware(() => {
        // Do anything you want here like authentication, rate limiting, etc.
        console.log("onRequest");
        // Never return anything from onRequest to avoid to close the connection
    }),
    onBeforeResponse: defineResponseMiddleware(() => {
        // Do anything you want here like logging, collecting metrics, or output compression, etc.
        console.log("onResponse");
        // Never return anything from onResponse to avoid to close the connection
    }),
    handler: defineEventHandler(async (event) => {
        return "GET: hello world";
    }),
}))

export default useBase('/api/hello', router.handler)