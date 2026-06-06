import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import { ViteEjsPlugin } from 'vite-plugin-ejs'

export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '')
	const isBuild = command === 'build'
	if (isBuild && !env.BASE_URL) {
		throw new Error('BASE_URL is required in production mode')
	}
	const baseURL = isBuild ? env.BASE_URL : '/'

	return {
		root: 'src',
		base: baseURL,
		plugins: [
			ViteEjsPlugin(
				{ BASE_URL: baseURL, isBuild },
				{
					ejs: {
						views: [resolve(__dirname, 'src')]
					}
				}
			)
		],
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src'),
				'@assets': resolve(__dirname, 'src/assets'),
				'@css': resolve(__dirname, 'src/assets/css'),
				'@js': resolve(__dirname, 'src/assets/js'),
				'@images': resolve(__dirname, 'src/assets/images')
			}
		},
		build: {
			outDir: resolve(__dirname, 'dist'),
			assetsDir: 'assets',
			rollupOptions: {
				input: {
					index: resolve(__dirname, 'src/index.html'),
					home: resolve(__dirname, 'src/pages/home/index.html'),
					about: resolve(__dirname, 'src/pages/about/index.html')
				},
				output: {
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
				}
			}
		},
		server: {
			port: 3000,
			open: '/',
			hot: true
		}
	}
})
