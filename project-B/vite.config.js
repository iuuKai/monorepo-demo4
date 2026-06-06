import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '')
	const isBuild = command === 'build'
	if (isBuild && !env.BASE_URL) {
		throw new Error('BASE_URL is required in production mode')
	}
	const baseURL = isBuild ? env.BASE_URL : '/'

	return {
		base: baseURL,
		plugins: [vue()]
	}
})
