import $ from 'jquery'
// js 里引入别名样式资源演示
import '@css/common.css'

$('.nav-item button').on('click', function () {
	const path = $(this).closest('.nav-item').data('path')
	if (path === location.pathname) return
	window.location.href = path
})
