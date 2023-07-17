import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function execa(command, argu, callback, cwd) {
	const myProcess = spawn(command, argu, {
		shell: true,
		stdio: "pipe",
		cwd,
	});
	myProcess.stdout.on("data", (data) => {
		callback && callback(null, `${data}`);
	});
	myProcess.on("error", (err) => {
		// eslint-disable-next-line n/no-callback-literal
		callback && callback(`${err}`);
	});
	myProcess.stderr.on("data", (data) => {
		// eslint-disable-next-line n/no-callback-literal
		callback && callback(`${data}`);
	});

	myProcess.on("close", (code) => {
		callback && callback(null, `${code}`, true);
	});
	return myProcess;
}
execa(
	"npx",
	"prisma migrate deploy --schema node_modules/.prisma/client/schema.prisma".split(
		" ",
	),
	(err, data, isComplete) => {
		if (isComplete) {
			console.log("\n任务完成");
			return;
		}
		if (err) {
			process.stdout.write(err);
		} else {
			process.stdout.write(data);
		}
	},
	path.resolve(__dirname, "./server"),
);
// node -r dotenv/config server/index.mjs dotenv_config_path=./server/.env
