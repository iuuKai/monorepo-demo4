import $ from 'jquery'
import '@js/common.js'
import './index.css'

const isBuild = import.meta.env.MODE === 'production'
const $userList = $('.user-list')

// 显示加载状态
function showLoading() {
	$userList.empty().append(
		`<div class="loading">
			${isBuild ? '<span>加载中...</span>' : '<span>请运行 vercel dev 或者部署到 vercel 上查看</span>'}
		</div>`
	)
}

// 渲染用户列表
function renderUserList(users) {
	if (users.length > 0) {
		const $list = $('<ul></ul>').append(users.map(user => `<li>${user.name} - ${user.email}</li>`))
		$userList.empty().append($list)
	} else {
		$userList.empty().append('<div class="empty">暂无用户</div>')
	}
}

// 初始化
function init() {
	showLoading()

	if (isBuild) {
		fetch('/api/user/all')
			.then(res => res.json())
			.then(res => {
				const userList = res.data || []
				renderUserList(userList)
			})
			.catch(err => {
				console.error('加载用户列表失败:', err)
				$userList.empty().append('<div class="empty">加载失败，请重试</div>')
			})
	}
}

// 页面加载完成后初始化
$(function () {
	init()
})
