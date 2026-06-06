const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')
require('dotenv').config()
const app = express()

// 添加 CORS 支持，允许所有来源访问
app.use(cors())

// 解析 JSON 请求体
app.use(express.json())

// API 路由，使用 .env 中的 BASE_URL 作为前缀
const baseUrl = process.env.BASE_URL || '/'
app.use(`${baseUrl}api/user`, require('./api/user'))

// 404 处理
app.use((req, res) => {
	res.status(404)
	// 尝试返回 404.html，如果不存在则返回文本
	const notFoundPath = path.join(__dirname, '../public', '404.html')
	if (fs.existsSync(notFoundPath)) {
		res.sendFile(notFoundPath, {
			headers: {
				'Cache-Control': 'no-cache, no-store, must-revalidate',
				Pragma: 'no-cache',
				Expires: '0'
			}
		})
	} else {
		res.send('404 - 请配置 404 页面')
	}
})

// 错误处理
app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).send('500 - 服务器内部错误')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`✅ http://localhost:${PORT}`)
})

module.exports = app
