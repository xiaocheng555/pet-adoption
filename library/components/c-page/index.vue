<template>
	<view class="c-page">
		<c-header v-if="hasHeader" :title="title" :has-back="hasBack">
			<slot slot="header"></slot>
		</c-header>
	  <slot></slot>
		<!-- 登录提示框 -->
		<uni-popup :show="loginPopupShow" position="middle" mode="fixed">
			<view class="login-box">
				<view class="login-title">您未登录，请先登录</view>
				<view class="login-footer">
					<view class="login-box-action">
						<button class="login-button login-button_cancel" @tap="handleLoginCancel">取消</button>
					</view>
					<view class="login-box-action login-confirm">
						<button 
							class="login-button login-button_confirm" 
							open-type="getUserInfo" 
							@getuserinfo="toLogin">登录</button>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/library/components/uni-ui/uni-popup/uni-popup.vue'
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		components: {
			uniPopup
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			hasBack: {
				type: Boolean,
				default: true
			},
			hasHeader: {
				type: Boolean,
				default: true
			}
		},
		data () {
			return {
				// loginPopupShow: false
			}
		},
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
			// 登录取消按钮
			handleLoginCancel () {
				// this.loginPopupShow = false
				this.changeLoginPopupShow(false)
			},
			// 登录
			toLogin (result) {
				let userInfo = result.detail.userInfo
				this.setUserInfo({
					nickName: userInfo.nickName,
					avatarUrl: userInfo.avatarUrl,
					signature: userInfo.signature
				})
				this.changeLoginPopupShow(false)
				// this.loginPopupShow = false
			},
			// 获取用户数据
			getUserInfo () {
				uni.getUserInfo({
					provider: 'weixin',
					success: (result) => {
						let userInfo = result.userInfo
						this.setUserInfo({
							nickName: userInfo.nickName,
							avatarUrl: userInfo.avatarUrl,
							signature: result.signature
						})
					},
					fail: (error) => {
						// this.loginPopupShow = true
						this.changeLoginPopupShow(true)
						console.log(error)
					}
				})
			}
		},
		created () {
			// if (this.userInfo) {
			// 	this.getUserInfo()
			// }
		}
	}
</script>

<style lang="scss">
.login-box {
	width: 70vw;
}
.login-title {
	margin-top: 30px;
	margin-bottom: 30px;
	font-size: 18px;
	text-align: center;
	color: #000000;
}
.login-footer {
	display: flex;
}
.login-box-action {
	flex: 1;
	padding: 10px 10px;
}
.login-button {
	line-height: 40px;
	border-radius: 5px;
	font-size: 15px;
}
.login-button_cancel {
	border: 1px solid $M04;
	color: $M10;
}
.login-button_confirm {
	background-color: $A06;
	color: #ffffff;
}
</style>
