缺点：

1. vercel.json 的 builds 是旧版本api，与 ssr 项目的 basePath 冲突，只能并部署普通项目
2. 每个项目都需要配置 vercel.json
3. 部署 vercel 报错：Error: Missing required "vercel-build" script in "project-G/package.json"，需要在项目 package.json 中添加 vercel-build 脚本
