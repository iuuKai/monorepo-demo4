<template>
	<div class="vue-page">
		<header class="hero">
			<h1>Vue 3 SPA 子应用</h1>
			<p class="subtitle">
				通过
				<code>@vercel/microfrontends</code>
				路由到
				<code>/vue/*</code>
				，使用
				<code>packages/shared-vue</code>
				的共享组件。
			</p>
		</header>

		<nav class="apps">
			<a href="/" class="app-card">
				<div class="app-badge">默认应用</div>
				<h3>Nuxt 4</h3>
				<p>
					SSR / 默认路由
					<code>/</code>
				</p>
			</a>
			<a href="/vue/" class="app-card app-card-active">
				<div class="app-badge">子应用</div>
				<h3>Vue 3 SPA</h3>
				<p>
					独立部署
					<code>/vue/*</code>
				</p>
			</a>
		</nav>

		<section class="demo">
			<h2>共享组件示例（Vue 版）</h2>
			<p class="demo-desc">
				这是
				<code>Vue 3 SPA</code>
				的内容，和 Nuxt 主应用使用同一套
				<code>MfCard</code>
				/
				<code>MfImage</code>
				/
				<code>MfButton</code>
				组件。
			</p>
			<MfCard title="Vue 卡片" desc="和 Nuxt 主应用共用组件代码，样式完全一致">
				<template #banner>
					<MfImage alt="卡片 banner" width="100%" :height="400" radius="lg" />
				</template>
				<template #button>
					<MfButton text="Vue 子应用按钮" type="primary" @click="handleClick" />
				</template>
			</MfCard>
		</section>
	</div>
</template>

<script setup lang="ts">
import { MfButton, MfCard, MfImage } from '@mf/shared-vue'

const handleClick = () => {
	alert('Vue3 子应用按钮点击！')
}
</script>

<style>
.vue-page {
	padding: 48px 24px;
	max-width: 800px;
	margin: 0 auto;
	font-family:
		system-ui,
		-apple-system,
		sans-serif;
}
.hero h1 {
	font-size: 32px;
	margin: 0 0 12px;
	color: #1a73e8;
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
	border-color: #1a73e8;
	background: #e8f0fe;
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
	background: #1a73e8;
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
@keyframes pulse {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0.5;
	}
}
</style>
