<script>
	import Vue from 'vue'
	import { mapState, mapMutations } from 'vuex'
	import Ready from 'min-ready'
	const ready = Ready()
	
	export default {
		computed: {
			...mapState([
				'userInfo',
				'loginPopupShow'
			])
		},
		methods: {
			...mapMutations([
				'setUserInfo',
				'changeLoginPopupShow'
			]),
			// 初始化app的ready函数
			// $app.ready(fn): fn函数会在token获取成功后执行
			initAppReady () {
				const app = {}
				app.ready = (func) => {
					ready.queue(func)
				}
				Vue.prototype.$app = app
			},
			// 获取系统信息
			getSystemInfo () {
				Vue.prototype.$statusBar = 0
				Vue.prototype.$customBar = 45
				this.$promisify(uni.getSystemInfo)().then(e => {
					// #ifdef MP-WEIXIN
					Vue.prototype.$statusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.$customBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
				})
			},
			// 登录
			handleLogin () {
				this.$promisify(uni.login)().then(result => {
					// console.log(this.$http, 'this.$http')
					this.getToken(result.code)
				})
			},
			// 获取token
			getToken (code) {
				this.$http.get('/pet/auth/wx', {
					js_code: code
				}).then(res => {
					if (res && res.token) {
						this.setUserInfo({
							token: res.token
						})
						this.getUserInfo()
					} else {
						console.error('token获取失败')
					}
				})
			},
			// 获取用户信息
			getUserInfo () {
				this.$promisify(uni.getUserInfo)({ provider: 'weixin' }).then(result => {
					let userInfo = result.userInfo
					this.setUserInfo({
						nickName: userInfo.nickName,
						avatarUrl: userInfo.avatarUrl
					})
					ready.open()
				}).catch(() => {
					ready.open()
				})
			}
		},
		onLaunch: function() {
			this.initAppReady()
			this.getSystemInfo()
			this.handleLogin()
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import url("./styles/global.scss");
</style>
