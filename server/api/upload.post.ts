// https://stackoverflow.com/questions/74054152/nuxt-3-file-upload-and-store-in-locally-in-the-project
// https://github.com/prisma/prisma/discussions/11795
import * as fs from "fs";
import * as path from "path";
import { readFiles } from "h3-formidable";

export default defineEventHandler(async (event) => {
	const {
		files: {
			photo: [{ filepath, mimetype }],
		},
		fields,
	} = await readFiles(event, {
		includeFields: true,
	});
	console.log(filepath);

	const imageName =
		String(Date.now()) + String(Math.round(Math.random() * 10000000));
	const newPath = `${path.join("public", "uploads", imageName)}.${mimetype.split("/")[1]
		}`;
	fs.copyFileSync(filepath, newPath);
	// TODO 会产生临时文件，记得处理删除
	try {
		fs.unlinkSync(filepath)
	} catch (error) {
		console.error("临时文件删除失败，请知悉错误：");
		console.error(error);
	}
	return { success: true, url: newPath.replace(/^public/, "") };
});
