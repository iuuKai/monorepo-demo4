<template>
	<img
		class="mf-img"
		:class="`mf-img-radius-${radius}`"
		:style="{ width: formatSize(width), height: formatSize(height), objectFit: fit }"
		:src="src || demoImg"
		:alt="alt"
	/>
</template>

<script setup lang="ts">
import type { ImageProps } from '@mf/shared-utils'
import { DEMO_IMAGE_URL } from '@mf/shared-utils'

const props = withDefaults(defineProps<ImageProps>(), {
	width: 300,
	height: 200,
	radius: 'md',
	fit: 'cover'
})

const demoImg = DEMO_IMAGE_URL

const formatSize = (val: string | number) => (typeof val === 'number' ? `${val}px` : val)
</script>

<style>
@import '@mf/shared-utils/src/theme.css';

.mf-img {
	display: block;
	border: 1px solid var(--color-border);
}
.mf-img-radius-sm {
	border-radius: var(--radius-sm);
}
.mf-img-radius-md {
	border-radius: var(--radius-md);
}
.mf-img-radius-lg {
	border-radius: var(--radius-lg);
}
</style>
