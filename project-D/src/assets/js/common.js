import $ from 'jquery'

$('.nav ul').on('click', 'button', function () {
	const path = $(this).closest('.nav-item').data('path')
	if (path === location.pathname) return
	window.location.href = path
})
