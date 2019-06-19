<template>
	<view>
		<uni-swiper-dot 
			:info="petImages"
			:current="currSwiperIndex" 
			:dots-styles="dotsStyles" 
			field="content">
			<swiper class="swiper-box" @change="swiperChange">
				<swiper-item v-for="(item ,index) in petImages" :key="index">
					<view class="swiper-item">
						<image :src="item" mode="aspectFill" lazy-load />
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
	</view>
</template>

<script>
	import uniSwiperDot from '@/library/components/uni-ui/uni-swiper-dot/uni-swiper-dot.vue'

	export default {
		components: {
			uniSwiperDot
		},
		data () {
			return {
				currSwiperIndex: 0,
				dotsStyles: {
					backgroundColor: 'rgba(0, 0, 0, .3)',
					border: '1px rgba(0, 0, 0, .3) solid',
					color: '#fff',
					width: 6,
					height: 6,
					selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
					selectedBorder: '1px rgba(0, 0, 0, .9) solid'
				},
				petImages: [
					'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2247692397,1189743173&fm=5',
					'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3115831678,1524951908&fm=5',
					'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=517735934,3607000238&fm=5'
				]
			}
		},
		methods: {
			swiperChange (e) {
				this.currSwiperIndex = e.detail.current
			}
		}
	}
</script>

<style lang="scss">
.swiper-box {
	height: 220px;
}
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
