import type { H3Event } from "h3";

declare module "h3" {
	interface H3EventContext {
		$config: Awaited<ReturnType<typeof fetchConfig>>;
	}
}

let config: Awaited<ReturnType<typeof fetchConfig>> | undefined;

async function fetchConfig(event: H3Event) {
	const prisma = event.context.prisma;
	const allConfig = await prisma.siteConfig.findMany();
	return allConfig;
}

export const enum ESiteConfig {
	/**
	 * 是否可以注册
	 */
	CanRegister = "canRegister",
}

export async function getConfig(event: H3Event) {
	if (!config) {
		config = await fetchConfig(event);
	}
	return config;
}

export async function getConfigByKey(event: H3Event, key?: ESiteConfig) {
	const config = await getConfig(event);
	const node = config.find((node) => node.key === key);
	return node;
}

export async function updateConfig(event: H3Event) {
	config = await fetchConfig(event);
}
