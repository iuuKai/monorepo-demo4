<template>
	<div class="mf-card">
		<div v-if="$slots.banner" class="mf-card-banner">
			<slot name="banner" />
		</div>
		<div class="mf-card-body">
			<h3 class="mf-card-title">{{ title }}</h3>
			<p v-if="desc" class="mf-card-desc">{{ desc }}</p>
		</div>
		<div v-if="$slots.button" class="mf-card-footer">
			<slot name="button" />
		</div>
	</div>
</template>

<script setup lang="ts">
import type { CardProps } from '@mf/shared-utils'
const props = defineProps<CardProps>()
</script>

<style>
@import '@mf/shared-utils/src/theme.css';

.mf-card {
	border: 1px solid var(--color-border);
	border-radius: var(--radius-lg);
	background: var(--color-bg);
	box-shadow:
		0 4px 12px rgba(0, 0, 0, 0.1),
		0 1px 3px rgba(0, 0, 0, 0.06);
	overflow: hidden;
}
.mf-card-banner {
	padding: var(--spacing-md) var(--spacing-md) 0;
}
.mf-card-banner img {
	display: block;
	width: 100%;
}
.mf-card-body {
	padding: var(--spacing-md);
}
.mf-card-footer {
	padding: 0 var(--spacing-md) var(--spacing-md);
}
.mf-card-title {
	color: var(--color-text);
	margin: 0 0 var(--spacing-sm);
	font-size: 18px;
	font-weight: 600;
}
.mf-card-desc {
	color: var(--color-text-light);
	margin: 0;
	font-size: 14px;
	line-height: 1.5;
}
</style>
