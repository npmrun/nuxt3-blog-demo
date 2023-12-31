> nuxt3 + prisma + ssr 示例

## 部署

为了部署写了一个脚本，主要是将环境跟运行脚本一起写进去

pnpm build

会生成.output文件夹，其中migrate.mjs用于迁移数据库用, 主要是这一点。

同时提供一个reset.mjs文件以供重置数据库(数据会丢失),因为修改了字段之后，deploy可能会失败，导致数据跟字段不一致，就会报错，数据没关系的话可以执行reset

还要注意`.output\public\uploads`中上传的文件别删除了，这点需要修改一下。

运行该项目，环境变量是从`.env`复制到`.output/server/.env`中，打包前可以在`.env`修改，打包后可以在`.output/server/.env`修改，或者重新打包：

```
node -r dotenv/config server/index.mjs dotenv_config_path=./server/.env
```

或者用pm2:
```
pm2 start pm2-start.sh --name nuxt3-demo
# 暂时没有ecosystem.js，因为没有启动起来
```

## 注意

在以下两个文件中用到了path.resolve,所以其目录是相对于工作目录来的。

- server/middleware/0.global.ts
- server/middleware/3.public.ts

开发运行时以根目录为工作目录，生产是应一.output文件夹为工作目录，如此才是符合预期的工作