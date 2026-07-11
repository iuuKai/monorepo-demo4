# Monorepo + @vercel/microfrontends 微前端模板

一个基于 **@vercel/microfrontends** 和 **pnpm workspace** 的生产级 Monorepo 微前端模板。支持在 Vercel 上用单域名部署多个应用。

## 特性

- **微前端**: 基于 `@vercel/microfrontends` v2.3.6，采用路径路由方案
- **Monorepo**: 使用 pnpm workspace 管理，支持跨应用共享代码
- **统一域名**: 所有应用通过单一域名访问（如 `https://your-app.vercel.app/` 和 `https://your-app.vercel.app/vue/`）
- **共享组件**: `packages/shared-vue` 中的可复用 Vue 组件
- **TypeScript**: 全栈 TypeScript 支持

## 架构

```
monorepo-demo4/
├── apps/
│   ├── nuxt-app/          # 默认应用（Nuxt 4，处理 /）
│   └── vue-app/           # 子应用（Vue 3 SPA，处理 /vue/*）
├── packages/
│   ├── shared-vue/        # 共享 Vue 组件（MfCard, MfImage, MfButton）
│   └── shared-utils/      # 共享工具和类型定义
├── pnpm-workspace.yaml
└── package.json
```

### 工作原理

1. **本地开发**: 使用 `microfrontends proxy` 将请求路由到本地运行的各个应用
2. **生产环境**: Vercel CDN 根据 `microfrontends.json` 配置进行路由分发
3. **默认应用**: `nuxt-app` 处理所有未匹配的路由（`/`）
4. **子应用**: `vue-app` 处理 `/vue/*` 路径

## 快速开始

### 环境要求

- Node.js ≥ 20
- pnpm ≥ 9

### 安装依赖

```bash
pnpm install
```

### 开发

```bash
# 启动所有应用 + 代理（推荐）
pnpm dev
```

这会启动：

- Nuxt 应用在端口 `3001`
- Vue 应用在端口 `3002`
- 微前端代理在端口 `3000`（统一入口）

**访问地址:**

- `http://localhost:3000/` - Nuxt 主应用
- `http://localhost:3000/vue/` - Vue 子应用

### 构建

```bash
# 构建所有应用
pnpm build
```

## 脚本命令

| 命令         | 说明                                       |
| ------------ | ------------------------------------------ |
| `pnpm dev`   | 启动所有应用和代理（统一入口在 3000 端口） |
| `pnpm build` | 构建所有应用                               |
| `pnpm lint`  | 代码检查                                   |
| `pnpm clean` | 清理构建产物                               |

## 共享包

### `@mf/shared-vue`

Nuxt 和 Vue 应用共用的 Vue 3 组件：

- **MfCard**: 卡片组件，支持 banner、body、footer 插槽
- **MfImage**: 图片组件，支持圆角和响应式尺寸
- **MfButton**: 按钮组件，支持 primary/success 样式

### `@mf/shared-utils`

共享工具函数和 TypeScript 类型定义。

## 部署到 Vercel

### 重要说明

- **Vercel 免费版（Hobby Plan）**: 支持 **1 个微前端组 + 2 个应用**
- 本模板正好包含 2 个应用（nuxt-app + vue-app），符合免费版限制

### 步骤 1: 推送到 GitHub

```bash
git init
git add -A
git commit -m "init: microfrontends monorepo"
git remote add origin https://github.com/<你的用户名>/monorepo-demo4.git
git push -u origin main
```

### 步骤 2: 创建 Vercel 项目

前往 [vercel.com/new](https://vercel.com/new)，**两次**导入同一个仓库，配置如下：

#### 项目 1: nuxt-app（默认应用）

| 设置     | 值                        |
| -------- | ------------------------- |
| 项目名称 | `monorepo-demo4-nuxt-app` |
| 根目录   | `apps/nuxt-app`           |
| 框架     | Nuxt（自动检测）          |

#### 项目 2: vue-app（子应用）

| 设置     | 值                       |
| -------- | ------------------------ |
| 项目名称 | `monorepo-demo4-vue-app` |
| 根目录   | `apps/vue-app`           |
| 框架     | Vite（自动检测）         |

### 步骤 3: 创建微前端组（Microfrontends Group）

1. 进入 Vercel 团队设置 → **Microfrontends**
2. 点击 **Create Group**
3. 命名你的组（如 `vercel-microfrontends`）
4. 选择两个项目（`monorepo-demo4-nuxt-app`、`monorepo-demo4-vue-app`）
5. 将 `monorepo-demo4-nuxt-app` 设为**默认应用**
6. 确认并创建

### 步骤 4: 配置路由

路由配置在 `apps/nuxt-app/microfrontends.json` 中：

```json
{
	"applications": {
		"monorepo-demo4-nuxt-app": {
			"development": {
				"local": 3001,
				"fallback": "https://monorepo-demo4-nuxt-app.vercel.app"
			}
		},
		"monorepo-demo4-vue-app": {
			"routing": [{ "paths": ["/vue/:path*"] }],
			"development": { "local": 3002 }
		}
	}
}
```

- `monorepo-demo4-nuxt-app`: 默认应用，处理 `/`
- `monorepo-demo4-vue-app`: 处理 `/vue/*`

### 步骤 5: 访问部署

部署完成后，你的微前端组会有一个统一域名：

- `https://<group-name>.vercel.app/` - Nuxt 主应用
- `https://<group-name>.vercel.app/vue/` - Vue 子应用

## 关键配置文件

| 文件                                | 作用                                   |
| ----------------------------------- | -------------------------------------- |
| `apps/nuxt-app/microfrontends.json` | 路由配置中心（Vercel 必需）            |
| `pnpm-workspace.yaml`               | 定义工作区包（`apps/*`, `packages/*`） |
| `apps/nuxt-app/nuxt.config.ts`      | Nuxt 应用配置，含 `app.baseURL`        |
| `apps/vue-app/vite.config.ts`       | Vue 应用配置，含 microfrontends 插件   |

## 添加新子应用

要添加更多子应用：

1. 在 `apps/` 目录创建新应用
2. 添加 `@vercel/microfrontends` 依赖
3. 使用 microfrontends 插件配置 Vite/Nuxt
4. 更新 `microfrontends.json` 添加路由路径
5. 在 Vercel 为新应用创建项目
6. 将新应用添加到微前端组

> **注意**: Vercel 免费版限制微前端组最多 2 个应用。升级到 Pro 版（$20/月）可添加更多。

## 常见问题

### 本地开发问题

**端口冲突**: 杀掉占用端口的进程后重启：

```bash
lsof -ti:3000,3001,3002 | xargs kill -9
pnpm dev
```

**代理无法启动**: 确保所有应用启动后再启动代理：

```bash
pnpm --filter @mf/nuxt-app dev &
pnpm --filter @mf/vue-app dev &
# 等待两个应用启动后执行：
pnpm dev:proxy
```

### 部署问题

**多个 microfrontends.json 错误**: 确保仓库中只有一个 `microfrontends.json`（位于 `apps/nuxt-app/`）。

**构建失败**: 检查共享包是否正确导出，依赖是否配置正确。

## License

MIT
