import { PrismaClient } from "@prisma/client";
// if(!import.meta.dev) {
// 	// @ts-ignore
// 	import("prisma") // 让nuxt打包prisma依赖，可以使用prisma migrate 命令
// }

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
