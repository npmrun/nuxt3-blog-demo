// pm2 start --node-args='-r dotenv/config' ecosystem.js -- dotenv_config_path=./server/.env

module.export = {
	apps: [
		{
			name: "nuxt3-blog-ssr",
			interpreter_args: "-r dotenv/config",
			args: "dotenv_config_path=./server/.env",
			cwd: "./",
			script: "./server/index.mjs",
			watch: false,
			ignore_watch: ["node_modules", "logs", "./public"],
			exec_mode: "fork",
			instances: 1,
			max_memory_restart: "1G",
			error_file: "./logs/app-err.log",
			merge_logs: true,
			log_date_format: "YYYY-MM-DD HH:mm:ss",
			min_uptime: "60s",
			max_restarts: 10,
			autorestart: true,
			restart_delay: 60,
		},
	],
};
