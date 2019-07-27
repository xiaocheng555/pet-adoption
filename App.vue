<script>
	import Vue from 'vue'
	import { mapActions } from 'vuex'
	import Ready from 'min-ready'
	import CONFIG from '@/config'
	const ready = Ready()
	
	export default {
		methods: {
			...mapActions([
				'handleAuth',
				'getUserInfo',
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
			}
		},
		onLaunch: function(option) {
			console.log(option, 'option')
			this.initAppReady()
			this.getSystemInfo()
			this.handleAuth().then(() => {
				// 执行app.ready内的函数
				ready.open()
				this.getUserInfo()
			})
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import url("./styles/global.scss");
</style>
