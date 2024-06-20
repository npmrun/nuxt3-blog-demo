import { defineConfig } from "taze";

export default defineConfig({
	// ignore packages from bumping
	exclude: ["prettier", "vitest", "cypress", "eslint", "eslint-config-prettier", "@nuxtjs/eslint-config-typescript", "eslint-plugin-prettier", "eslint-plugin-vue"],
	// fetch latest package info from registry without cache
	force: true,
	// write to package.json
	write: false,
	// run `npm install` or `yarn install` right after bumping
	install: false,
});
