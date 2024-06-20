/**
 * 发布与修改文章
 * @权限 登录用户可发布自己的文章，只能修改自己的文章
 */

import matter from "gray-matter";
import { z } from "zod";

const schema = z.object({
	id: z.coerce.number({
		required_error: 'id必须填写',
		invalid_type_error: "id字段无效类型",
	}).optional(),
	title: z.string(),
	content: z.string(),
	published: z.boolean(),
})

export default defineEventHandler(async (event) => {

	const result = await readValidatedBody(event, (data) => schema.safeParse(data))
	if (!result.success) {
		throw sendError(event, createError({
			statusCode: 500,
			data: result.error.issues,
			statusMessage: result.error.issues.map(v => v.message).join(",")
		}))
	}

	const { title, content, published, id } = result.data;

	const prisma = event.context.prisma;
	const { user } = await requireUserSession(event);

	const parseMD = matter(content);
	const desc =
		parseMD.data.desc ??
		getMarkdownDescription(parseMD.content) ??
		undefined;

	const articleData = {
		title,
		content,
		published,
		desc: desc ?? undefined,
		authorId: user.id,
	};
	let article: any;
	if (!id) {
		article = await prisma.article.create({
			data: articleData,
		});
	} else {
		try {
			article = await prisma.article.update({
				where: {
					id,
					authorId: user.id,
				},
				data: articleData,
			});
		} catch (error) {
			return sendError(
				event,
				createError({
					statusCode: 400,
					statusMessage: "修改失败",
				})
			);
		}
	}

	return {
		statusCode: 200,
		data: article,
	};
});
