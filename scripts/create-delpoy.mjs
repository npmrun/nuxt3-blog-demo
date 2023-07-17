import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fs.copyFileSync(
	path.resolve(__dirname, "../deployTemp/ecosystem.js"),
	".output/ecosystem.js",
);
fs.copyFileSync(
	path.resolve(__dirname, "../deployTemp/pm2-start.sh"),
	".output/pm2-start.sh",
);
fs.copyFileSync(
	path.resolve(__dirname, "../deployTemp/init.mjs"),
	".output/init.mjs",
);

if (
	!fs.existsSync(
		path.resolve(__dirname, "../.output/server/node_modules/.bin"),
	)
) {
	fs.mkdirSync(
		path.resolve(__dirname, "../.output/server/node_modules/.bin"),
	);
}
fs.copyFileSync(
	path.resolve(__dirname, "../node_modules/.bin/prisma"),
	".output/server/node_modules/.bin/prisma",
);
fs.copyFileSync(
	path.resolve(__dirname, "../node_modules/.bin/prisma.CMD"),
	".output/server/node_modules/.bin/prisma.CMD",
);
fs.copyFileSync(
	path.resolve(__dirname, "../node_modules/.bin/prisma.ps1"),
	".output/server/node_modules/.bin/prisma.ps1",
);

copy(
	path.resolve(__dirname, "../prisma/migrations"),
	path.resolve(
		__dirname,
		"../.output/server/node_modules/.prisma/client/migrations",
	),
);

copy(
	path.resolve(__dirname, "../node_modules/prisma"),
	path.resolve(__dirname, "../.output/server/node_modules/prisma"),
);
if (
	!fs.existsSync(
		path.resolve(
			__dirname,
			"../.output/server/node_modules/@prisma/engines",
		),
	)
) {
	fs.mkdirSync(
		path.resolve(
			__dirname,
			"../.output/server/node_modules/@prisma/engines",
		),
	);
}
if (
	!fs.existsSync(
		path.resolve(
			__dirname,
			"../.output/server/node_modules/@prisma/engines-version",
		),
	)
) {
	fs.mkdirSync(
		path.resolve(
			__dirname,
			"../.output/server/node_modules/@prisma/engines-version",
		),
	);
}

copy(
	path.resolve(__dirname, "../node_modules/@prisma/engines"),
	path.resolve(__dirname, "../.output/server/node_modules/@prisma/engines"),
);
copy(
	path.resolve(__dirname, "../node_modules/@prisma/engines-version"),
	path.resolve(
		__dirname,
		"../.output/server/node_modules/@prisma/engines-version",
	),
);
if (!fs.existsSync(path.resolve(__dirname, "../.output/node_modules"))) {
	fs.mkdirSync(path.resolve(__dirname, "../.output/node_modules"));
}
if (!fs.existsSync(path.resolve(__dirname, "../.output/node_modules/dotenv"))) {
	fs.mkdirSync(path.resolve(__dirname, "../.output/node_modules/dotenv"));
}
copy(
	path.resolve(__dirname, "../node_modules/dotenv"),
	path.resolve(__dirname, "../.output/node_modules/dotenv"),
);

fs.copyFileSync("./.env", ".output/server/.env");
fs.copyFileSync(
	"prisma/schema.prisma",
	".output/server/node_modules/.prisma/client/schema.prisma",
);

// npx prisma migrate deploy --schema server/node_modules/.prisma/client/schema.prisma
// exec("")

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
			// console.log(tagFile);
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
