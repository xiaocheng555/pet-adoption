<template>
	<view>
		<image-swiper :list="petImages"></image-swiper>
		<view class="feed-detail-main">
			<!-- 宠物信息 -->
			<view class="pet-info">
				<view class="pet-info-title">
					朵朵
					<view class="pet-info-desc">
						<text class="pet-info-desc-item">女孩</text>
						<text class="pet-info-desc-item">3岁</text>
					</view>
				</view>
				<view class="pet-info-body">
					<view class="pet-info-item">
						<image class="pet-info-item-icon" src="/static/icons/pet__variety.svg"></image>
						中华田园猫
					</view>
					<!-- <view class="pet-info-item">
						<image class="pet-info-item-icon" src="/static/icons/pet__classify.svg"></image>
						中华田园猫
					</view> -->
					<view class="pet-info-item">
						<image class="pet-info-item-icon" src="/static/icons/pet__sterilization.svg"></image>
						未绝育
					</view>
					<view class="pet-info-item">
						<image class="pet-info-item-icon" src="/static/icons/pet__needle.svg"></image>
						未疫苗
					</view>
					<view class="pet-info-item">
						<image class="pet-info-item-icon" src="/static/icons/pet__pay.svg"></image>
						免费
					</view>
					<view class="pet-info-item pet-info-item_row">
						<image class="pet-info-item-icon" src="/static/icons/location-grey.svg"></image> 广东省佛山市顺德区
					</view>
				</view>
			</view>
			<!-- 宠物详情 -->
			<view class="c-card">
				<view class="c-card-header">
					宠物详情
				</view>
				<view class="c-card-body">
					猫，属于猫科动物，分家猫、野猫，是全世界家庭中较为广泛的宠物。家猫的祖先据推测是起源于古埃及的沙漠猫，波斯的波斯猫，已经被人类驯化了3500年
				</view>
			</view>
			<!-- 领养要求 -->
			<view class="c-card">
				<view class="c-card-header">
					领养要求
				</view>
				<view class="c-card-body">
					猫，属于猫科动物，分家猫、野猫，是全世界家庭中较为广泛的宠物。家猫的祖先据推测是起源于古埃及的沙漠猫，波斯的波斯猫，已经被人类驯化了3500年
				</view>
			</view>
		</view>
		<!-- 底部功能菜单 -->
		<view class="footer-menu">
			<view class="footer-menu-aside">
				<view class="footer-menu-back-home" @tap="backHomePage">
					<image class="footer-menu-icon" src="/static/icons/home.svg"></image> 
					返回首页
				</view>
			</view>
			<view class="footer-menu-main">
				<button class="footer-menu-button" @tap="gotoApplyPage">申请领养</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSwiperDot from '@/library/components/uni-ui/uni-swiper-dot/uni-swiper-dot.vue'
	import ImageSwiper from '@/library/components/image-swiper'
	
	export default {
		components: {
			ImageSwiper
		},
		data () {
			return {
				petImages: [
					'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2247692397,1189743173&fm=5',
					'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3115831678,1524951908&fm=5',
					'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=517735934,3607000238&fm=5'
				]
			}
		},
		methods: {
			backHomePage () {
				uni.switchTab({
					url: '/pages/home/index'
				})
			},
			gotoApplyPage () {
				uni.navigateTo({
					url: '/pages/feed/apply/index'
				})
			}
		}
	}
</script>

<style lang="scss">
.feed-detail-main {
	padding-bottom: 70px;
	background-color: #ffffff;
}
.pet-info {
	position: relative;
	z-index: 1;
	top: -20px;
	margin-left: 16px;
	margin-right: 16px;
	padding: 16px;
	border-radius: 8px;
	background-color: #ffffff;
	box-shadow: 3px 3px 4px rgba(26, 26, 26, 0.2);
}

.pet-info-title {
	font-size: 22px;
	line-height: 30px;
	font-weight: 600;
}
.pet-info-desc {
	display: inline-block;
	font-size: 14px;
	color: $M08;
}
.pet-info-body {
	margin-top: 2px;
}
.pet-info-desc-item {
	display: inline-block;
	margin-left: 10px;
}
.pet-info-item {
	box-sizing: border-box;
	display: inline-block;
	position: relative;
	width: 50%;
	margin-top: 12px;
	padding-right: 10px;
	padding-left: 25px;
	font-size: 14px;
	vertical-align: top;
	color: $M10;
}
.pet-info-item_row {
	width: 100%;
}
.pet-info-item-icon {
	position: absolute;
	top: 2px;
	left: 0;
	width: 16px;
	height: 16px;
}
.footer-menu {
	display: flex;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 52px;
	align-items: center;
	padding: 0 16px;
	background-color: #ffffff;
	border-top: 1px solid $M04;
}
.footer-menu-aside {
	width: 120px;
}
.footer-menu-main {
	flex: 1;
}
.footer-menu-back-home {
	display: flex;
	align-items: center;
	color: $M10;
	font-size: 14px;
	line-height: 14px;
}
.footer-menu-icon {
	display: inline-block;
	margin-right: 5px;
	width: 22px;
	height: 22px;
}
.footer-menu-button {
	height: 32px;
	border-radius: 6px;
	font-size: 14px;
	line-height: 32px;
	color: #ffffff;
	background-color: #1897F2;
}
</style>
