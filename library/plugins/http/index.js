// 验证http配置的正确性
function checkHttpConfig(httpConfig) {

}

// 获取http配置
function getHttpOptions(httpConfig, name) {
	let options
	httpConfig.some(item => {
		if (item.name === name) {
			options = item.config
			return true
		}
	})
	return options || null
}

// 封装http的Vue插件
function install(Vue, globalOptions) {
	const httpConfig = globalOptions.config || []
	const baseUrl = globalOptions.baseUrl || ''
	checkHttpConfig(httpConfig)
	delete globalOptions.config
	delete globalOptions.baseUrl

	Vue.prototype.$http = function(requestName, requestOptions) {
		const httpOptions = getHttpOptions(httpConfig, requestName)
		if (!httpOptions) {
			console.error(`[http error]: ${requestName} 请求名未配置`)
			return
		}
		// 获取统一的uni请求配置
		const uniRequestOptions = Object.assign({}, globalOptions, httpOptions, requestOptions)

		// 将相对路径变为绝对路径
		if (uniRequestOptions.url && uniRequestOptions.url.slice(0, 1) === '/') {
			uniRequestOptions.url = baseUrl + uniRequestOptions.url
		}

		// 将methods的值转为大写
		if (typeof uniRequestOptions.method === 'string') {
			uniRequestOptions.method = uniRequestOptions.method.toLocaleUpperCase()
		}

		// 增加loading配置
		if (uniRequestOptions.loading) {
			uni.showLoading({
				title: '加载中'
			})
		}

		// 用户定义的请求事件
		const userCompleteEvent = uniRequestOptions.complete
		const userSuccessEvent = uniRequestOptions.success
		const userFailEvent = uniRequestOptions.fail

		// 对uni请求的complete事件做处理
		uniRequestOptions.complete = (data) => {
			userCompleteEvent && userCompleteEvent(res.data)
		}
		
		// 对uni请求的success事件做处理
		uniRequestOptions.success = (res) => {
			let errorTip
			let resData = res.data
			if (res.statusCode === 200) {
				if (resData.code !== 0) {
					errorTip = resData && resData.msg || '请求失败了~'
				}
				userSuccessEvent && userSuccessEvent(resData)
			} else {
				errorTip = '请求失败了~'
			}
			// 增加是否使用toast显示错误提示
			if (uniRequestOptions.errorTip !== false && errorTip) {
				uni.showToast({
					title: errorTip,
					icon: 'none'
				})
			} else {
				// 隐藏loading
				if (uniRequestOptions.loading) {
					uni.hideLoading()
				}
			}
		}
		
		// 对uni请求的error事件做处理
		uniRequestOptions.fail = (error) => {
			uni.showToast({
				title: '网络连接失败，请稍后重试',
				icon: 'none'
			})
			userFailEvent && userFailEvent(error)
		}

		return uni.request(uniRequestOptions)
	}
}

export default install
