<template>
	<div class="container">
		<div v-if="isBuild" class="sup-nav">
			<a href="/">返回导航</a>
		</div>
		<div class="nav">
			<ul>
				<li class="nav-item" v-for="item in navItems" :key="item.path">
					<button @click="toPage(item.path)">to {{ item.name }}</button>
					<span>{{ item.description }}</span>
				</li>
			</ul>
		</div>
		<router-view :isBuild="isBuild"></router-view>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isBuild = import.meta.env.MODE === 'production'
const router = useRouter()
const navItems = ref([
	{
		name: 'Home',
		path: '/',
		description: '加载图片资源'
	},
	{
		name: 'About',
		path: '/about',
		description: '请求主项目接口'
	},
	{
		name: '404',
		path: `/404/${Date.now()}`,
		description: '404错误页'
	}
])

const toPage = path => {
	router.push(path)
}
</script>

<style scoped>
.container {
	width: 400px;
	margin: 20vh auto 0;
	padding: 20px;
	border-radius: 10px;
	background-color: #fff;
}
.nav-item {
	line-height: 40px;
}
.nav button {
	margin-right: 20px;
}
</style>
