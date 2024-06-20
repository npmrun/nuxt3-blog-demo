import fs from "fs-extra"
import path from "path"

interface IOpts {
    base?: string,
    include?: RegExp,
    ignore?: RegExp,
    exculeFolder?: string[]
}
interface IOutput {
    absoultePath: string,
    relativePath: string
    baseRelativePath: string
    isFile: boolean
    isDirectory: boolean
}
export function walkDir(dir: string = ".", cb?: (output: IOutput) => void, opts: IOpts = {
    include: undefined,
    ignore: undefined,
    exculeFolder: undefined
}) {
    if (!dir) return;
    function _walk(dir: string) {
        const files = fs.readdirSync(dir);
        const len = files.length
        for (var i = 0; i < len; i++) {
            const file = files[i]
            const pathname = path.resolve(dir, file); // 绝对路径
            const filename = path.join(dir, file); // 相对路径
            var stat = fs.lstatSync(pathname);
            const isFile = stat.isFile()
            const isDirectory = stat.isDirectory()
            if (isDirectory && (opts.exculeFolder ?? ["node_modules", ".git"]).includes(file)) {
                continue;
            }
            if (opts.ignore && opts.ignore.test(pathname)) {
                continue;
            }
            const callback = () => cb && cb({
                absoultePath: pathname,
                relativePath: filename,
                baseRelativePath: opts.base ? path.relative(opts.base, filename) : filename,
                isDirectory,
                isFile
            })
            if (isFile && opts.include && opts.include.test(pathname)) {
                callback()
            } else if (!opts.include) {
                callback()
            }
            if (stat.isDirectory()) {
                _walk(filename)
            }
        }
    }
    _walk(dir)
}