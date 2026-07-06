<template>
	<button class="mf-btn" :class="`mf-btn-${type}`" @click="$emit('click')">
		{{ text }}
	</button>
</template>

<script setup lang="ts">
import type { ButtonProps } from '@mf/shared-utils'
const props = defineProps<ButtonProps>()
defineEmits<{
	click: []
}>()
</script>

<style>
@import '@mf/shared-utils/src/theme.css';

.mf-btn {
	padding: var(--spacing-sm) var(--spacing-md);
	border-radius: var(--radius-md);
	border: 1px solid var(--color-border);
	cursor: pointer;
	font-size: 14px;
	transition: all 0.2s;
}
.mf-btn-primary {
	background: var(--color-primary);
	color: white;
	border-color: var(--color-primary);
}
.mf-btn-success {
	background: var(--color-success);
	color: white;
	border-color: var(--color-success);
}
.mf-btn:hover {
	opacity: 0.9;
}
</style>
