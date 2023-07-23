export default eventHandler(async (event) => {
	const prisma = event.context.prisma;
	const { user: { id } } = await requireUserSession(event);
	const newUser = await prisma.user.findUnique({
		where: {
			id: id
		}
	}) as any
	if(newUser){
		delete newUser.password
	}
	return {
		user: newUser
	};
});
