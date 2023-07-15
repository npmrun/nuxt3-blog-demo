import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationsDir = path.resolve(__dirname, "../prisma/migrations");
const migrationsDesc = path.resolve(__dirname, "../.output/prisma/migrations");

fs.copyFileSync(
	path.resolve(__dirname, "../deployTemp/ecosystem.js"),
	".output/ecosystem.js",
);

copy(migrationsDir, migrationsDesc);

let srcPkg = fs.readFileSync(path.resolve(__dirname, "../package.json"));
let tempPkg = fs.readFileSync(
	path.resolve(__dirname, "../deployTemp/package.json"),
);
if (srcPkg) srcPkg = JSON.parse(srcPkg);
if (tempPkg) tempPkg = JSON.parse(tempPkg);

tempPkg.dependencies.prisma = srcPkg.devDependencies.prisma;
fs.copyFileSync("./.env", ".output/.env");
fs.copyFileSync("prisma/schema.prisma", ".output/prisma/schema.prisma");
fs.writeFileSync(".output/package.json", JSON.stringify(tempPkg, null, 4));

function copy(sd, td) {
	// 读取目录下的文件，返回文件名及文件类型{name: 'xxx.txt, [Symbol(type)]: 1 }
	const sourceFile = fs.readdirSync(sd, { withFileTypes: true });
	for (const file of sourceFile) {
		// 源文件 地址+文件名
		const srcFile = path.resolve(sd, file.name);
		// 目标文件
		const tagFile = path.resolve(td, file.name);
		// 文件是目录且未创建
		if (file.isDirectory() && !fs.existsSync(tagFile)) {
			console.log(tagFile);
			fs.mkdirSync(tagFile, { recursive: true });
			copy(srcFile, tagFile);
		} else if (file.isDirectory() && fs.existsSync(tagFile)) {
			// 文件时目录且已存在
			copy(srcFile, tagFile);
		}
		!file.isDirectory() &&
			fs.copyFileSync(srcFile, tagFile, fs.constants.COPYFILE_FICLONE);
	}
}
