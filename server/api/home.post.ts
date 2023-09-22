import type { H3Event } from "h3";
import fs from "fs/promises"
import path from "path"

const handler = eventHandler(async (event: H3Event) => {
    await checkRoute(event, { auth: true });
    const body = await readBody(event);
    const { articleContent } = body
    try {
        if (process.env.NUXT_HOME_FOLDER) {
            let folder = process.env.NUXT_HOME_FOLDER.replace(/\$CWD/g, process.cwd())
            const storePath = path.resolve(folder, process.env.NUXT_HOME_FILE ?? 'README.md')
            await fs.writeFile(storePath, articleContent, { encoding: "utf8" })
        }
    } catch (error) {
        throw createError({
            statusCode: 400,
            message: "读取文件失败",
        });
    }
    
    return 
});

export type HealthCheckData = Awaited<ReturnType<typeof handler>>;
export default handler;
