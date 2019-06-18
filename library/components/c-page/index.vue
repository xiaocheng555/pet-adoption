<template>
	<view class="c-page">
		<c-header v-if="hasHeader" :title="title" :has-back="hasBack">
			<slot slot="header"></slot>
		</c-header>
	  <slot></slot>
		<!-- 登录提示框 -->
		<uni-popup :show="loginModal" position="middle" mode="fixed">
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
			},
			loginModal: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			...mapState([
				'userInfo'
			])
		},
		methods: {
			...mapMutations([
				'setUserInfo'
			]),
			// 登录
			toLogin (result) {
				uni.showToast({
					title: '登录成功',
					icon: 'none'
				})
				let userInfo = result.detail.userInfo
				this.setUserInfo({
					nickName: userInfo.nickName,
					avatarUrl: userInfo.avatarUrl
				})
				this.$emit('login-close')
			},
			// 登录取消按钮
			handleLoginCancel () {
				this.$emit('login-close')
			}
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
	font-size: 16px;
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
	line-height: 35px;
	border-radius: 5px;
	font-size: 14px;
}
.login-button_cancel {
	color: $M10;
}
.login-button_confirm {
	background-color: $A06;
	color: #ffffff;
}
</style>
