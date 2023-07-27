import path from "node:path";
import fs from "node:fs";
import { readFiles } from "h3-formidable";

export default eventHandler(async (event) => {
	const prisma = event.context.prisma;
	const {
		user: { id },
	} = await requireUserSession(event);
	const { files, fields } = await readFiles(event, {
		includeFields: true,
	});
	const result: any = {};
	const user = await event.context.prisma.user.findUnique({
		where: {
			id,
		},
	});
	if (!user) {
		return;
	}
	if (
		fields.username &&
		fields.username[0] &&
		user.username !== fields.username[0]
	) {
		result.username = fields.username[0];
	}
	if (fields.tel && fields.tel[0] && user.tel !== fields.tel[0]) {
		result.tel = fields.tel[0];
	}
	if (
		fields.nickname &&
		fields.nickname[0] &&
		user.nickname !== fields.nickname[0]
	) {
		result.nickname = fields.nickname[0];
	}
	if (fields.email && fields.email[0] && user.email !== fields.email[0]) {
		result.email = fields.email[0];
	}
	if (files && Object.keys(files).length) {
		const {
			file: [{ filepath, mimetype, originalFilename }],
		} = files;
		if (
			originalFilename.endsWith(".png") ||
			originalFilename.endsWith(".jpg") ||
			originalFilename.endsWith(".jpeg")
		) {
			const imageName =
				dateTimeFormat(new Date(), "yyyy_MM_dd") +
				"_" +
				String(Date.now()) +
				"_" +
				String(Math.round(Math.random() * 10000000)) +
				"_" +
				originalFilename.split(".").slice(0, -1).join("");

			let newPath = `${path.join("public", "uploads", imageName)}.`; // ${mimetype.split("/")[1]}
			if (originalFilename.endsWith(".png")) {
				newPath += "png";
			}
			if (originalFilename.endsWith(".jpg")) {
				newPath += "jpg";
			}
			if (originalFilename.endsWith(".jpeg")) {
				newPath += "jpeg";
			}
			fs.copyFileSync(filepath, newPath);
			try {
				fs.unlinkSync(filepath);
			} catch (error) {
				console.error("当前文件临时为:" + filepath);
				console.error("删除失败，请知悉错误：");
				console.error(error);
			}
			const p = newPath.replace(/^public/, "").replace(/\\/g, "/");
			result.avatar = p;
		}
	}
	try {
		console.log(result);

		await prisma.user.update({
			where: {
				id,
			},
			data: result,
		});
	} catch (error) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: "修改失败",
			}),
		);
	}
	const newUser = await event.context.prisma.user.findUnique({
		where: {
			id,
		},
	});
	if (newUser) {
		await setUserSession(event, {
			user: {
				id: newUser.id,
				email: newUser.email,
				username: newUser.username,
				nickname: newUser.nickname,
			},
		});
	}

	return "success";
});
