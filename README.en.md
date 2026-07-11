# Monorepo + @vercel/microfrontends Template

A production-ready monorepo template for building microfrontends using **@vercel/microfrontends** and **pnpm workspace**. Deploy multiple applications under a single domain on Vercel.

## Features

- **Microfrontends**: Built on `@vercel/microfrontends` v2.3.6, using path-based routing
- **Monorepo**: Managed with pnpm workspace, shared packages across applications
- **Unified Domain**: All apps accessible under one domain (e.g., `https://your-app.vercel.app/` and `https://your-app.vercel.app/vue/`)
- **Shared Components**: Reusable Vue components in `packages/shared-vue`
- **TypeScript**: Full TypeScript support across all packages

## Architecture

```
monorepo-demo4/
├── apps/
│   ├── nuxt-app/          # Default app (Nuxt 4, handles /)
│   └── vue-app/           # Sub-app (Vue 3 SPA, handles /vue/*)
├── packages/
│   ├── shared-vue/        # Shared Vue components (MfCard, MfImage, MfButton)
│   └── shared-utils/      # Shared utilities & types
├── pnpm-workspace.yaml
└── package.json
```

### How It Works

1. **Local Development**: Uses `microfrontends proxy` to route requests to locally running apps
2. **Production**: Vercel CDN routes requests based on `microfrontends.json` configuration
3. **Default App**: `nuxt-app` handles all unmatched routes (`/`)
4. **Sub-apps**: `vue-app` handles `/vue/*` paths

## Quick Start

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9

### Install Dependencies

```bash
pnpm install
```

### Development

```bash
# Start all apps + proxy (recommended)
pnpm dev
```

This starts:
- Nuxt app on port `3001`
- Vue app on port `3002`
- Microfrontends proxy on port `3000` (unified entry)

**Access:**
- `http://localhost:3000/` - Nuxt main application
- `http://localhost:3000/vue/` - Vue sub-application

### Build

```bash
# Build all apps
pnpm build
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps with proxy (unified entry at port 3000) |
| `pnpm build` | Build all apps |
| `pnpm lint` | Lint all apps |
| `pnpm clean` | Clean build artifacts |

## Shared Packages

### `@mf/shared-vue`

Reusable Vue 3 components used by both Nuxt and Vue apps:

- **MfCard**: Card component with banner, body, and footer slots
- **MfImage**: Image component with rounded corners and responsive sizing
- **MfButton**: Button component with primary/success variants

### `@mf/shared-utils`

Shared utilities and TypeScript types.

## Deployment to Vercel

### Important Notes

- **Vercel Hobby Plan**: Supports **1 Microfrontends Group + 2 applications**
- This template contains exactly 2 apps (nuxt-app + vue-app) to fit the free plan

### Step 1: Push to GitHub

```bash
git init
git add -A
git commit -m "init: microfrontends monorepo"
git remote add origin https://github.com/<your-username>/monorepo-demo4.git
git push -u origin main
```

### Step 2: Create Vercel Projects

Go to [vercel.com/new](https://vercel.com/new) and import the repository **twice** with these settings:

#### Project 1: nuxt-app (Default App)

| Setting | Value |
|---------|-------|
| Project Name | `monorepo-demo4-nuxt-app` |
| Root Directory | `apps/nuxt-app` |
| Framework | Nuxt (auto-detected) |

#### Project 2: vue-app (Sub-app)

| Setting | Value |
|---------|-------|
| Project Name | `monorepo-demo4-vue-app` |
| Root Directory | `apps/vue-app` |
| Framework | Vite (auto-detected) |

### Step 3: Create Microfrontends Group

1. Go to your Vercel Team Settings → **Microfrontends**
2. Click **Create Group**
3. Name your group (e.g., `vercel-microfrontends`)
4. Select both projects (`monorepo-demo4-nuxt-app`, `monorepo-demo4-vue-app`)
5. Choose `monorepo-demo4-nuxt-app` as the **Default App**
6. Review and create

### Step 4: Configure Routing

The routing is defined in `apps/nuxt-app/microfrontends.json`:

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

- `monorepo-demo4-nuxt-app`: Default app, handles `/`
- `monorepo-demo4-vue-app`: Handles `/vue/*`

### Step 5: Access Your Deployment

After deployment, your group will have a unified domain like:

- `https://<group-name>.vercel.app/` - Nuxt main app
- `https://<group-name>.vercel.app/vue/` - Vue sub-app

## Key Configuration Files

| File | Purpose |
|------|---------|
| `apps/nuxt-app/microfrontends.json` | Central routing config (required by Vercel) |
| `pnpm-workspace.yaml` | Defines workspace packages (`apps/*`, `packages/*`) |
| `apps/nuxt-app/nuxt.config.ts` | Nuxt app config with `app.baseURL` |
| `apps/vue-app/vite.config.ts` | Vue app config with microfrontends plugin |

## Adding a New Sub-app

To add more sub-apps:

1. Create a new app in `apps/` directory
2. Add `@vercel/microfrontends` dependency
3. Configure Vite/Nuxt with the microfrontends plugin
4. Update `microfrontends.json` with routing paths
5. Create a new Vercel project for the app
6. Add to the Microfrontends Group

> **Note**: Vercel Hobby Plan limits microfrontends groups to 2 applications. Upgrade to Pro ($20/month) for more.

## Troubleshooting

### Local Development Issues

**Port conflicts**: Kill existing processes and restart:
```bash
lsof -ti:3000,3001,3002 | xargs kill -9
pnpm dev
```

**Proxy not starting**: Ensure all apps are running before proxy starts:
```bash
pnpm --filter @mf/nuxt-app dev &
pnpm --filter @mf/vue-app dev &
# Wait for both to start, then:
pnpm dev:proxy
```

### Deployment Issues

**Multiple microfrontends.json error**: Ensure only one `microfrontends.json` exists in the repository (in `apps/nuxt-app/`).

**Build failed**: Check that all shared packages are properly exported and dependencies are correct.

## License

MIT
