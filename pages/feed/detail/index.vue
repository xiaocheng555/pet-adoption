<template>
	<view>
		<image-swiper :list="currFeedData.petImages || []"></image-swiper>
		<view class="feed-detail-main">
			<!-- 宠物信息 -->
			<view class="pet-info">
				<view class="pet-info-title">
					{{ currFeedData.petName }}
					<view class="pet-info-desc">
						<text class="pet-info-desc-item">{{ currFeedData.petSex }}</text>
						<text class="pet-info-desc-item">{{ currFeedData.petAge }}</text>
					</view>
				</view>
				<view class="pet-info-body">
					<view class="pet-info-item">
						<image class="pet-info-item-icon" src="/static/icons/pet__variety.svg"></image>
						{{ currFeedData.petVariety }}
					</view>
					<view class="pet-info-item">
						<image class="pet-info-item-icon" src="/static/icons/pet__sterilization.svg"></image>
						{{ currFeedData.petSterilization }}
					</view>
					<view class="pet-info-item">
						<image class="pet-info-item-icon" src="/static/icons/pet__needle.svg"></image>
						{{ currFeedData.petVaccine }}
					</view>
					<view class="pet-info-item">
						<image class="pet-info-item-icon" src="/static/icons/pet__pay.svg"></image>
						{{ currFeedData.petFree }}
					</view>
					<view class="pet-info-item pet-info-item_row">
						<image class="pet-info-item-icon" src="/static/icons/location-grey.svg"></image> {{ currFeedData.address }}
					</view>
				</view>
			</view>
			<!-- 宠物详情 -->
			<view class="c-card">
				<view class="c-card-header">
					宠物详情
				</view>
				<view class="c-card-body">
					{{ currFeedData.petDesc }}
				</view>
			</view>
			<!-- 领养要求 -->
			<view class="c-card">
				<view class="c-card-header">
					领养要求
				</view>
				<view class="c-card-body">
					{{ currFeedData.adoptionRequest }}
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
import { mapState } from 'vuex'
import uniSwiperDot from '@/library/components/uni-ui/uni-swiper-dot/uni-swiper-dot.vue'
import ImageSwiper from '@/library/components/image-swiper'

export default {
	components: {
		ImageSwiper
	},
	data () {
		return {
			currFeedData: {}
		}
	},
	computed: {
		...mapState('feed', [
			'feedData'
		])
	},
	methods: {
		// 获取领养详情的数据
		fetchFeedData () {
			
		},
		// 返回首页
		backHomePage () {
			uni.switchTab({
				url: '/pages/home/index'
			})
		},
		// 跳转到宠物申请页面
		gotoApplyPage () {
			let { id, petClassId } = this.currFeedData
			uni.navigateTo({
				url: `/pages/feed/apply/index?petId=${id}&petClassId=${petClassId}`
			})
		}
	},
	onLoad (params) {
		// 是否使用store缓存的数据
		if (params.useStore.toString() === 'true' && this.feedData) {
			this.currFeedData = this.feedData
		} else {
			// 获取领养详情的数据
			this.fetchFeedData(params.id)
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
	font-size: 18px;
	line-height: 30px;
	font-weight: bold;
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
	height: 60px;
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
	height: 38px;
	border-radius: 6px;
	font-size: 14px;
	line-height: 38px;
	color: #ffffff;
	background-color: #1897F2;
}
</style>
