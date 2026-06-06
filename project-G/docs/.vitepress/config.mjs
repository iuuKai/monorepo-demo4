import { defineConfig, loadEnv } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '')
	const isBuild = command === 'build'
	if (isBuild && !env.BASE_URL) {
		throw new Error('BASE_URL is required in production mode')
	}
	const baseURL = isBuild ? env.BASE_URL : '/'

	return {
		base: baseURL,
		title: 'VitePress',
		description: 'VitePress文档',
		themeConfig: {
			nav: [
				{ text: '首页', link: '/' },
				{ text: '关于', link: '/about/' }
			],
			sidebar: {
				'/about/': [
					{
						text: '',
						items: [
							{ text: '关于', link: '/about/' },
							{ text: '测试', link: '/about/page1' },
							{ text: '自定义渲染示例', link: '/about/page2' }
						]
					}
				]
			}
		}
	}
})
