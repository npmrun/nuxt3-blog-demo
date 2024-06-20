// https://stackoverflow.com/questions/74054152/nuxt-3-file-upload-and-store-in-locally-in-the-project
// https://github.com/prisma/prisma/discussions/11795
import * as fs from "fs";
import * as path from "path";
import { readFiles } from "h3-formidable";

export default defineEventHandler(async (event) => {
	await requireUserSession(event);
	const BaseUrl = await getConfigByKey(event, ESiteConfig.BaseUrl);
	const {
		// @ts-ignore
		file: [{ filepath, mimetype, originalFilename }],
	} = await readFiles(event, {
		// @ts-ignore
		includeFields: false,
	});

	const imageName =
		dateTimeFormat(new Date(), "yyyy_MM_dd") +
		"_" +
		String(Date.now()) +
		"_" +
		String(Math.round(Math.random() * 10000000)) +
		"_" +
		originalFilename.split(".").slice(0, -1).join("");

	const newPath = `${encodeURIComponent(path.join("public", "uploads", imageName))}.${
		mimetype.split("/")[1]
	}`;

	logger.debug(newPath);

	fs.copyFileSync(filepath, newPath);
	try {
		fs.unlinkSync(filepath);
	} catch (error) {
		logger.error("当前文件临时为:" + filepath);
		logger.error("删除失败，请知悉错误：");
		logger.error(error);
	}
	const base = BaseUrl?.value ?? event.node.req.headers.origin;
	return {
		success: true,
		url: `${base}${newPath.replace(/^public/, "").replace(/\\/g, "/")}`,
	};
});
