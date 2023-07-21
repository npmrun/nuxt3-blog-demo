import { PrismaClient } from "@prisma/client";

console.log("1");

let prisma: PrismaClient;
declare module "h3" {
	interface H3EventContext {
		prisma: PrismaClient;
	}
}

export default eventHandler((event) => {
	if (!prisma) {
		prisma = new PrismaClient();
	}

	event.context.prisma = prisma;
});
