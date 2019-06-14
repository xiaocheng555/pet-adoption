<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					Vue.prototype.$statusBar = 0
					Vue.prototype.$customBar = 45
					
					// #ifdef MP-WEIXIN
					Vue.prototype.$statusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.$customBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import url("./styles/global.scss");
</style>
