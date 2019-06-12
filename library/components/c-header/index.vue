<template>
	<view :style="{ height: customBar + 'px' }">
		<view class="c-header" :style="style">
			<div class="c-header-inner">
				<view class="c-header-left" v-if="hasBack" @tap="backPage">
					<image class="c-header-back-icon" src="/static/icons/header__back.svg"></image>
					<text class="c-header-back-text">返回</text>
				</view>
				<view class="c-header-main">
					<slot>{{ title }}</slot>
				</view>
			</div>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			hasBack: {
				type: Boolean,
				default: true
			},
			isFixed: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				statusBar: this.$statusBar,
				customBar: this.$customBar
			}
		},
		computed: {
			style () {
				console.log(this.statusBar, 'this.statusBar', this.$customBar)
				return `height: ${this.customBar}px; padding-top: ${this.statusBar}px;`
			}
		},
		methods: {
			backPage () {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
.c-header {
	display: flex;
	position: fixed;
	box-sizing: border-box;
	top: 0;
	left: 0;
	right: 0;
	background-color: #ffffff;
	box-shadow: 0 0.5px 3px #DFE3E6;
}
.c-header-inner {
	position: relative;
	flex: 1;
	align-self: center;
	height: 30px;
	line-height: 30px;
}
.c-header-left {
	position: absolute;
	top: 50%;
	left: 0;
	padding: 0 16px;
	transform: translateY(-50%);
}
.c-header-back-icon {
	position: relative;
	top: 2px;
	width: 10px;
	height: 17px;
	margin-right: 6px;
}
.c-header-back-text {
	color: #011829;
	font-size: 16px;
	text-align: center;
}
.c-header-main {
	padding: 0 80px;
	text-align: center;
	font-size: 18px;
	color: #011829;
}
</style>
