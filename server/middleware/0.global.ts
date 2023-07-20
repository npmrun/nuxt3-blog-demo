import path from "path";
// eslint-disable-next-line import/default
import log4js from "log4js";
import type { Logger } from "log4js";

// eslint-disable-next-line import/no-named-as-default-member
const { getLogger, configure } = log4js;

const log4jsConfig = function () {
	return {
		appenders: {
			file: {
				type: "file",
				filename: path.resolve("./logs", "./Site.log"),
			},
			console: {
				type: "console",
			},
		},
		categories: {
			default: {
				appenders: ["console"],
				level: "all",
			},
			GLOBAL: {
				appenders: ["file", "console"],
				level: "debug",
			},
		},
	};
};

configure(log4jsConfig());
const logger = getLogger("GLOBAL");

// @ts-ignore
global.logger = logger;

declare global {
	let logger: Logger;
}

export default eventHandler((event) => {});
