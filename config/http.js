import http from '@/library/plugins/http'
import CONFIG from '@/config'
import Vue from 'vue'

//设置baseUrl
http.config.baseUrl = CONFIG.host

// 设置请求前拦截器
http.interceptor.request = (config) => {
	// 添加token
	const token = Vue.prototype.$store.state.userInfo.token
	console.log(config, '设置请求前拦截器')
	if (!config.header) {
		config.header = {}
	}
	if (token) {
		config.header.Authorization = `Bearer ${token}`
	}
}

// 设置请求结束后拦截器
http.interceptor.response = (response) => {
	if (response.statusCode >= 200 && response.statusCode <= 299) {
		return response.data
	} 
	else {
		let errorTip
		if (response.statusCode >= 400 && response.statusCode <= 499) {
			errorTip = '请求错误'
		} else if (response.statusCode >= 500 && response.statusCode <= 599) {
			errorTip = '服务器错误'
		} else {
			errorTip = '未知异常'
		}
		uni.showToast({
			icon: 'none',
			title: errorTip
		})
		return (errorTip, response)
	}
}

export default http