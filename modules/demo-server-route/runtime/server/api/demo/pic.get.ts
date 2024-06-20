import path from "path"
import fs from "fs"

export default defineEventHandler((event) => {
    console.log(useRuntimeConfig(event));
    const avatarPath = path.resolve(process.cwd(), "public", "avatar.jpg")
    setHeader(event, 'Content-Type', 'image/jpeg')
    return sendStream(event, fs.createReadStream(avatarPath))
})