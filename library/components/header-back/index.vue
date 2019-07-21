<template>
  <view class="header-back" @tap="backPage" :style="style">
		<image class="header-back-icon" src="/static/icons/header__back.svg"></image>
		<text class="header-back-text">返回</text>
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
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  z-index: 10;
  width: 100px;
  padding: 0 16px;
	font-size: 16px;
  color: $A11;
}
.header-back-icon {
	position: relative;
	width: 10px;
	height: 17px;
	margin-right: 6px;
}
.header-back-text {
	text-align: center;
}
</style>