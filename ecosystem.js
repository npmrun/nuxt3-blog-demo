module.export = {
	apps: [
		{
			name: "nuxt3-blog-ssr",
			script: "./.output/server/index.mjs",
			watch: false,
			ignore_watch: ["node_modules", "logs", "./output/public"],
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
			port: "3336",
		},
	],
};
