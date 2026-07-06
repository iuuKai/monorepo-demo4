import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { microfrontends } from '@vercel/microfrontends/experimental/vite'

export default defineConfig({
	plugins: [vue(), microfrontends({ basePath: '/vue' })],
	server: {
		port: 3002
	}
})
