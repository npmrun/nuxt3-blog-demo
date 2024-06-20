console.log("plugin: 1.error-handler");

declare module "http" {
    interface IncomingMessage {
        $beginTime: number;
    }
}

// https://nuxt.com/docs/api/advanced/hooks#nitro-app-hooks-runtime-server-side
// https://nuxt.com/docs/guide/going-further/hooks#server-hooks-runtime
export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('request', async (event) => {
        event.node.req.$beginTime = new Date().getTime()
    })
    nitroApp.hooks.hook('afterResponse', async (event) => {
        let curTime = new Date().getTime()
        let offsetTime = curTime - event.node.req.$beginTime
        console.log(event.path,'-',event.method, "花费了", offsetTime, "ms");
    })
    nitroApp.hooks.hook('error', async (error, { event }) => {
        logger.error(error)
    })
})
 