<template>
	<div class="home">
		<header class="hero">
			<h1>Vercel Microfrontends + Monorepo</h1>
			<p class="subtitle">
				基于 <code>@vercel/microfrontends</code> 的微前端示例，Nuxt 4 为主应用，Vue3 为子应用，
				<code>pnpm workspace</code> 管理共享组件包。
			</p>
		</header>

		<nav class="apps">
			<a href="/" class="app-card app-card-active">
				<div class="app-badge">默认应用</div>
				<h3>Nuxt 4</h3>
				<p>SSR / 默认路由 <code>/</code></p>
			</a>
			<a href="/vue/" class="app-card">
				<div class="app-badge">子应用</div>
				<h3>Vue 3 SPA</h3>
				<p>独立部署 <code>/vue/*</code></p>
			</a>
		</nav>

		<section class="demo">
			<h2>共享组件示例</h2>
			<p class="demo-desc">
				<code>MfCard</code> / <code>MfImage</code> / <code>MfButton</code>
				来自 <code>packages/shared-vue</code>，Nuxt 和 Vue3 共用同一套代码。
			</p>
			<MfCard title="统一卡片组件" desc="Nuxt 主应用和 Vue 子应用都用它，样式完全一致">
				<template #banner>
					<MfImage alt="卡片 banner" width="100%" :height="200" radius="lg" />
				</template>
				<template #button>
					<MfButton text="主应用按钮" type="primary" @click="handleClick" />
				</template>
			</MfCard>
		</section>
	</div>
</template>

<script setup lang="ts">
import { MfButton, MfCard, MfImage } from '@mf/shared-vue'

const handleClick = () => {
	alert('Nuxt 主应用按钮点击')
}
</script>

<style>
.home {
	padding: 48px 24px;
	max-width: 800px;
	margin: 0 auto;
	font-family: system-ui, -apple-system, sans-serif;
}
.hero h1 {
	font-size: 32px;
	margin: 0 0 12px;
}
.subtitle {
	color: #666;
	font-size: 15px;
	line-height: 1.6;
	margin: 0 0 32px;
}
.subtitle code {
	background: #f5f5f5;
	padding: 2px 6px;
	border-radius: 4px;
	font-size: 13px;
}
.apps {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 16px;
	margin-bottom: 48px;
}
.app-card {
	display: block;
	padding: 20px;
	border: 1px solid #e5e7eb;
	border-radius: 12px;
	text-decoration: none;
	color: inherit;
	transition: all 0.2s;
	background: #fff;
}
.app-card:hover {
	border-color: #3b82f6;
	transform: translateY(-2px);
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}
.app-card-active {
	border-color: #3b82f6;
	background: #eff6ff;
}
.app-badge {
	display: inline-block;
	font-size: 12px;
	padding: 2px 8px;
	border-radius: 10px;
	background: #e5e7eb;
	color: #4b5563;
	margin-bottom: 8px;
}
.app-card-active .app-badge {
	background: #3b82f6;
	color: #fff;
}
.app-card h3 {
	margin: 0 0 4px;
	font-size: 18px;
}
.app-card p {
	margin: 0;
	color: #6b7280;
	font-size: 14px;
}
.app-card code {
	background: #f3f4f6;
	padding: 1px 5px;
	border-radius: 4px;
	font-size: 12px;
}
.demo h2 {
	font-size: 22px;
	margin: 0 0 8px;
}
.demo-desc {
	color: #666;
	font-size: 14px;
	margin: 0 0 20px;
}
.demo-desc code {
	background: #f5f5f5;
	padding: 2px 6px;
	border-radius: 4px;
	font-size: 13px;
}
</style>
