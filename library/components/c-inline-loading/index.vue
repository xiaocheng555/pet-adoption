<template>
	<view class="c-inline-loading" :class="[align === 'center' ? 'c-inline-loading_middle' : '']">
		<image class="loading-icon" src="/static/icons/loading.svg"></image>
		<text class="loading-text" v-if="text">{{ text }}</text>
	</view>
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			default: '加载中...'
		},
		align: {
			type: String,
			default: 'top'
		}
	}
}
</script>

<style lang="scss" scoped>
.c-inline-loading {
	display: flex;
	box-sizing: border-box;
	justify-content: center;
	align-items: center;
	padding: 40px 0;
	pointer-events: none;
}
.c-inline-loading_middle {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99;
}
.loading-icon {
	width: 23px;
	height: 23px;
}
.loading-text {
	margin-left: 5px;
	font-size: 15px;
	color: $M08;
}
</style>
