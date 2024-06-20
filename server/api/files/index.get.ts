import type { H3Event } from "h3";

const handler = eventHandler(async (event: H3Event) => {
    let data = null
    try {
        if (process.env.NUXT_HOME_FOLDER) {
            let folder = process.env.NUXT_HOME_FOLDER.replace(/\$CWD/g, process.cwd())
            const allFiles: string[] = []
            walkDir(folder, function ({ baseRelativePath, isFile }) {
                allFiles.push(baseRelativePath)
            }, {
                base: folder,
                include: /\.md$/,
                ignore: /(CHANGELOG)\.md/,
                exculeFolder: ["node_modules", ".git", "dist"]
            })
            data = allFiles
        }
    } catch (error) {
        throw createError({
            statusCode: 400,
            message: "读取文件失败",
        });
    }
    return data
});

export default handler;
