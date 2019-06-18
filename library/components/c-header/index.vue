<template>
	<view :style="{ height: customBar + 'px' }">
		<view class="c-header" :style="style">
			<div class="c-header-inner">
				<view class="c-header-left" v-show="hasBack" @tap="backPage">
					<image class="c-header-back-icon" :src="backIcon"></image>
					<text class="c-header-back-text">返回</text>
				</view>
				<view class="c-header-main c-ellipsis">
					<slot>
						{{ title }}
					</slot>
				</view>
			</div>
		</view>
	</view>
</template>

<script>
	import backIcon from './assets/header__back.svg'
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			hasBack: {
				type: Boolean,
				default: true
			}
		},
		data () {
			return {
				backIcon,
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
	box-sizing: border-box;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
	background-color: #ffffff;
	box-shadow: 0 0.5px 3px #DFE3E6;
}
.c-header-inner {
	position: relative;
	flex: 1;
	align-self: center;
	width: 100%;
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
	color: $A11;
	font-size: 16px;
	text-align: center;
}
.c-header-main {
	padding: 0 80px;
	text-align: center;
	font-size: 18px;
	color: $A11;
}
</style>
