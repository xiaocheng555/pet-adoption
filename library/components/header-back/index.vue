<template>
  <view class="header-back" @tap="backPage" :style="style">
		<view class="header-back-circle">
		<image class="header-back-icon" src="/static/icons/header__back_white.svg"></image>
		</view>
		<!-- <text class="header-back-text">返回</text> -->
	</view>
</template>

<script>
export default {
  data () {
		return {
			statusBar: this.$statusBar,
			customBar: this.$customBar
		}
	},
  computed: {
		style () {
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

<style lang='scss'>
.header-back {
  position: absolute;
  top: 9px;
  z-index: 10;
  padding: 0 16px;
	font-size: 16px;
  color: $A11;
}
.header-back-circle {
	position: relative;
	width: 30px;
	height: 30px;
	border-radius: 100%;
	background: rgba(0, 0, 0, .35);
	
}
.header-back-icon {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 10px;
	height: 17px;
	transform: translate(-55%, -50%);
}
.header-back-text {
	text-align: center;
}
</style>