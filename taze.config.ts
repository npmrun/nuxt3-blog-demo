import { defineConfig } from "taze";

export default defineConfig({
  // ignore packages from bumping
  exclude: ["prettier"],
  // fetch latest package info from registry without cache
  force: true,
  // write to package.json
  write: false,
  // run `npm install` or `yarn install` right after bumping
  install: false,
});
