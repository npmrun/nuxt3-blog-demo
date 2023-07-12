export default defineEventHandler(async (event) => {
	return await requireUserSession(event);
});
