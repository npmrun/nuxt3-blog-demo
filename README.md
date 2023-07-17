> nuxt3 + prisma + ssr 示例

## 部署

为了部署写了一个脚本，主要是将环境跟运行脚本一起写进去

pnpm build

会生成.output文件夹，其中init.mjs用于迁移数据库用。

运行该项目，环境变量是从`.env`复制到`.output/server/.env`中，打包前可以在`.env`修改，打包后可以在`.output/server/.env`修改，或者重新打包：

```
node -r dotenv/config server/index.mjs dotenv_config_path=./server/.env
```

或者用pm2:
```
pm2 start pm2-start.sh --name nuxt3-demo
# 暂时没有ecosystem.js，因为没有启动起来
```