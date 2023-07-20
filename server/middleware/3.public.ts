/**
OneTab
chrome-extension://hoimpamkkoehapgenciaoajfkfkpgfop/onetab.html

nitro/src/runtime/static.ts at 14670c94d8f11f24525295f55ed427ac616fc643 · unjs/nitro
https://github.com/unjs/nitro/blob/14670c94d8f11f24525295f55ed427ac616fc643/src/runtime/static.ts#L7

nitro/src/rollup/plugins/public-assets.ts at main · unjs/nitro
https://github.com/unjs/nitro/blob/main/src/rollup/plugins/public-assets.ts#L61

Plugins
https://nitro.unjs.io/guide/plugins

Lifecycle Hooks · Nuxt
https://nuxt.com/docs/api/advanced/hooks

Nuxt Configuration Reference · Nuxt
https://nuxt.com/docs/api/configuration/nuxt-config

Configuration · Nitro
https://nitro.unjs.io/config

nuxt/packages/schema/src/types/hooks.ts at main · nuxt/nuxt
https://github.com/nuxt/nuxt/blob/main/packages/schema/src/types/hooks.ts#L53

问题 ·Nuxt/Nuxt
https://github.com/nuxt/nuxt/issues?q=is%3Aissue+public+is%3Aopen

构建后无法提供静态文件 ·问题 #15779 ·Nuxt/Nuxt
https://github.com/nuxt/nuxt/issues/15779

Adding a static file to `/public` folder requires rebuilding the production application · Issue #992 · unjs/nitro
https://github.com/unjs/nitro/issues/992

Unable to serve static files after build · Issue #15779 · nuxt/nuxt
https://github.com/nuxt/nuxt/issues/15779
 */
/**
 * TODO 以上是一些文档，用于解决打包后public新增文件404的问题。https://github.com/nuxt/nuxt/issues/15779
 * 思路：根据nitro/src/runtime/static.ts的思路写一个插件返回public的文件
 */

import {
    decodePath,
    joinURL,
    parseURL,
    withLeadingSlash,
    withoutTrailingSlash,
} from "ufo";
import { resolve } from 'node:path'
import fs from 'fs'
import { promises as fsp } from 'node:fs'

const METHODS = new Set(["HEAD", "GET"]);

export default eventHandler((event) => {
    if (event.node.req.method && !METHODS.has(event.node.req.method)) {
        return;
    }
    let id = decodePath(
        withLeadingSlash(
            withoutTrailingSlash(parseURL(event.node.req.url).pathname)
        )
    );

    const file = resolve("public" + id)
    if (fs.existsSync(file)) {
        logger.debug("获取文件:", file)
        return fsp.readFile(file)
    }
});