/**
 * 发布与修改文章
 * @权限 登录用户可发布自己的文章，只能修改自己的文章
 */

import matter from "gray-matter";

export default defineEventHandler(async (event) => {
	const prisma = event.context.prisma;
	const { user } = await requireUserSession(event);
	const body = await readBody(event);

	const { title, content, published, id } = body;

	if (!title || !content) {
		return sendError(
			event,
			createError({ statusCode: 400, statusMessage: "Invalid params" })
		);
	}
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
