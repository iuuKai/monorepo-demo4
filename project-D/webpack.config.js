const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const fs = require('fs')
const ejs = require('ejs')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
require('dotenv').config()

const isBuild = process.env.NODE_ENV === 'production'
if (isBuild && !process.env.BASE_URL) {
	throw new Error('BASE_URL is required in production mode')
}
const BASE_URL = isBuild ? process.env.BASE_URL : '/'

// 自定义插件：监听 EJS 文件变化
class EjsWatchPlugin {
	apply(compiler) {
		compiler.hooks.emit.tap('EjsWatchPlugin', compilation => {
			const ejsFiles = []
			const scanDir = dir => {
				const files = fs.readdirSync(dir, { withFileTypes: true })
				for (const file of files) {
					const fullPath = path.join(dir, file.name)
					if (file.isDirectory()) {
						scanDir(fullPath)
					} else if (file.name.endsWith('.ejs')) {
						ejsFiles.push(fullPath)
					}
				}
			}
			scanDir(path.resolve(__dirname, 'src'))

			ejsFiles.forEach(file => {
				compilation.fileDependencies.add(file)
			})
		})
	}
}

function getPages() {
	const pagesDir = path.resolve(__dirname, 'src/pages')
	const pageDirs = fs
		.readdirSync(pagesDir, { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name)

	const entries = {}
	const htmlPlugins = []
	const SRC_DIR = path.resolve(__dirname, 'src')

	pageDirs.forEach(pageName => {
		const pagePath = path.resolve(pagesDir, pageName)
		const templatePath = path.resolve(pagePath, 'index.ejs')
		entries[pageName] = path.resolve(pagePath, 'index.js')

		htmlPlugins.push(
			new HtmlWebpackPlugin({
				filename: `${pageName}.html`,
				templateContent: () => {
					const createInclude = currentTemplatePath => {
						return (file, data) => {
							let includePath
							if (file.startsWith('@/')) {
								includePath = path.resolve(SRC_DIR, file.slice(2))
							} else {
								includePath = path.resolve(path.dirname(currentTemplatePath), file)
							}
							const includeContent = fs.readFileSync(includePath, 'utf8')
							return ejs.render(includeContent, {
								...data,
								include: createInclude(includePath),
								BASE_URL: BASE_URL,
								isBuild: isBuild
							})
						}
					}
					const templateContent = fs.readFileSync(templatePath, 'utf8')
					const include = createInclude(templatePath)
					return ejs.render(templateContent, {
						include,
						BASE_URL: BASE_URL,
						isBuild: isBuild
					})
				},
				chunks: [pageName],
				inject: 'body',
				cache: false
			})
		)
	})

	return { entries, htmlPlugins }
}

const { entries, htmlPlugins } = getPages()

module.exports = {
	mode: 'development',
	entry: entries,
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].[contenthash].js',
		publicPath: BASE_URL,
		clean: true
	},
	devServer: {
		static: { directory: path.join(__dirname, 'dist') },
		port: 3000,
		open: true,
		hot: false,
		liveReload: true,
		client: { overlay: true },
		watchFiles: {
			paths: ['src/**/*'],
			options: {
				ignored: /node_modules/,
				aggregateTimeout: 200,
				poll: 500
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [isBuild ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader']
			},
			// 图片、字体等资源
			{
				test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
				type: 'asset/resource',
				generator: {
					filename: 'assets/images/[name].[contenthash:8][ext]'
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[name].[contenthash:8][ext]'
				}
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash].css',
			chunkFilename: 'css/[id].[contenthash].css'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/assets'),
					to: path.resolve(__dirname, 'dist/assets'),
					noErrorOnMissing: true
				}
			]
		}),
		new webpack.ProvidePlugin({
			// $: ['jquery', 'default'],
			// jQuery: ['jquery', 'default'],
			// 'window.$': ['jquery', 'default'],
			// 'window.jQuery': ['jquery', 'default'],
		}),
		new EjsWatchPlugin(),
		...htmlPlugins
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		},
		extensions: ['.js', '.ejs']
	}
}
