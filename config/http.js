import http from '@/library/plugins/http'
import CONFIG from '@/config'
import Vue from 'vue'

//设置baseUrl
http.config.baseUrl = CONFIG.host

// 设置请求前拦截器
http.interceptor.request = (config) => {
	// 添加token
	const token = Vue.prototype.$store.state.userInfo.token
	config.header = {}
	if (token) {
		config.header.Authorization = `Bearer ${token}`
	}
}

// 设置请求结束后拦截器
http.interceptor.response = (response) => {
	if (response.statusCode === 200) {
		return response.data
	} else {
		uni.showToast({
			title: '请求失败了'
		})
		return response.data
	}
}

export default http