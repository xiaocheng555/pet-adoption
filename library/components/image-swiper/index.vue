<template>
	<swiper :style="{ height: height }" @change="swiperChange">
		<swiper-item v-for="(item ,index) in list" :key="index">
			<view class="swiper-item" @tap="previewImage(index)">
				<image :src="item" mode="aspectFill" lazy-load />
			</view>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
			},
			height: {
				type: String,
				default: '250px'
			}
		},
		data () {
			return {
				currSwiperIndex: 0
			}
		},
		methods: {
			swiperChange (e) {
				this.currSwiperIndex = e.detail.current
			},
			// 预览图片
			previewImage (index) {
				uni.previewImage({
					current: index || 0,
					urls: this.list
				})
			}
		}
	}
</script>

<style lang="scss">
.swiper-item {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	background: #eee;
	color: #fff;
}
.swiper-item image {
	width: 100%;
	height: 100%;
}
</style>
