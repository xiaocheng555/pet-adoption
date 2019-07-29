<template>
	<c-page :has-header="false">
		<header-back></header-back>
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
			<!-- 发布人 -->
			<view class="c-card">
				<view class="c-card-header">
					发布人
				</view>
				<view class="c-card-body">
					<view class="publish-info">
						<image class="publish-info-avatar" :src="currFeedData.avatar"></image>
						<view class="publish-info-name">{{ currFeedData.name }}</view>
					</view>
					<view class="publish-info-date">发布于：{{ currFeedData.date }}</view>
				</view>
			</view>
		</view>
		<view class="c-fixed-bottom-bar-wrapper">
			<view class="c-fixed-bottom-bar">
				<view class="bottom-bar-inner">
					<view class="bottom-bar-left" @tap="backHomePage">
						<image class="bottom-bar-home-icon" src="/static/icons/home.svg"></image> 
						返回首页
					</view>
					<view class="bottom-bar-right">
						<button 
							v-if="canApply"
							class="c-button-primary c-button-small" 
							@tap="gotoApplyPage">
							申请领养
						</button>
						<button
							v-else 
							class="c-button-warn c-button-small">
							申请已关闭
						</button>
					</view>
				</view>
			</view>
		</view>
	</c-page>
</template>

<script>
import { mapState } from 'vuex'
import uniSwiperDot from '@/library/components/uni-ui/uni-swiper-dot/uni-swiper-dot.vue'
import ImageSwiper from '@/library/components/image-swiper'
import HeaderBack from '@/library/components/header-back'
import { adapterFeedList } from '@/library/utils/adapter-data'
import { PET_FEED_STATE } from '@/library/constant'

export default {
	components: {
		HeaderBack,
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
		]),
		canApply () {
			return this.currFeedData.petState === PET_FEED_STATE.processing.value
		}
	},
	methods: {
		// 获取领养详情的数据
		fetchFeedData (petId) {
			this.$http.get(`/pet/api/v1/adoption/pet/${petId}`).then(res => {
				this.currFeedData = adapterFeedList([res])[0]
			})
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
page {
	background-color: #ffffff;
}
.feed-detail-main {
	padding-bottom: 20px;
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
	box-shadow: 0 1.5px 6px rgba(0, 0, 0, 0.12);
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
	font-weight: 100;
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
.publish-info {
	display: flex;
	align-items: center;
}
.publish-info-avatar {
	border-radius: 100px;
	width: 25px;
	height: 25px;
}
.publish-info-name {
	flex: 1;
	padding: 0 10px;
	font-size: 14px;
	color: $M10;
}
.publish-info-date {
	margin-top: 6px;
	font-size: 14px;
	color: $M08;
}
.bottom-bar-inner {
	display: flex;
	align-items: center;
}
.bottom-bar-left {
	width: 40%;
	color: $M10;
	font-size: 14px;
	line-height: 26px;
}
.bottom-bar-right {
	flex: 1;
}
.bottom-bar-home-icon {
	position: relative;
	top: 4px;
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
