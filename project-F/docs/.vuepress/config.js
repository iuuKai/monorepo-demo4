import 'dotenv/config'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'

const isBuild = process.env.NODE_ENV === 'production'
if (isBuild && !process.env.BASE_URL) {
	throw new Error('BASE_URL is required in production mode')
}
const BASE_URL = isBuild ? process.env.BASE_URL : '/'

export default defineUserConfig({
	base: BASE_URL,
	bundler: viteBundler({
		viteOptions: {
			server: { port: 8088 },
			resolve: {
				alias: { '@': './docs/.vuepress' }
			}
		}
	}),
	title: 'VuePress',
	description: 'VuePress文档',
	theme: defaultTheme({
		navbar: [
			{ text: '首页', link: '/' },
			{ text: '关于', link: '/about/' }
		],
		sidebar: {
			'/about/': [
				{
					title: '关于',
					collapsable: false,
					children: ['', 'page1', 'page2']
				}
			]
		}
	})
})
