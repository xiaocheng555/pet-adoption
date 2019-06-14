<template>
	<view class="c-inline-loading" :class="[align === 'center' ? 'c-inline-loading_middle' : '']">
		<image class="loading-icon" :src="loadingIcon"></image>
		<text class="loading-text" v-if="text">{{ text }}</text>
	</view>
</template>

<script>
import loadingIcon from './assets/loading.svg'

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
	},
	data () {
		return {
			loadingIcon
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
	width: 25px;
	height: 25px;
	animation: 1.3s rotate linear infinite;
}
.loading-text {
	margin-left: 5px;
	font-size: 15px;
	color: $M08;
}

@keyframes rotate {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
