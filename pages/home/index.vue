<template>
  <c-page title="首页" :has-back="false">
		<div class="home-section">
			<image class="home-banner" src="/static/images/banner.jpg" lazy-load></image>
			<view class="home-nav">
				<view class="home-nav-item c-1px-r">
					<image class="home-nav-icon" src="/static/icons/publish__pet-search.svg"></image>
	        <text class="home-nav-text">寻宠启示</text>
				</view>
				<view class="home-nav-item">
					<image class="home-nav-icon" src="/static/icons/publish__search-owner.svg"></image>
	        <text class="home-nav-text">寻主启示</text>
				</view>
			</view>
		</div>
		<filter-bar 
			@address-change="filterAddress" 
			@pet-class-change="filterPetClass">
		</filter-bar>
		<feed-list :list="feedList" @item-click="handleFeedItemClick">
		</feed-list>
		<view style="margin-top: -70px;" v-if="isEmptyData">
    	<c-no-data>暂时没有数据，敬请期待~</c-no-data>
		</view>
		<uni-load-more 
			v-else
			:status="loadmoreStatus" 
			:content-text="loadmoreContent" 
			color="#6C7880" />
	</c-page>
</template>

<script>
import FilterBar from '@/library/components/filter-bar'
import FeedList from '@/library/components/feed-list-home'
import uniLoadMore from '@/library/components/uni-ui/uni-load-more/uni-load-more.vue'
import { adapterFeedList } from '@/library/utils/adapter-data'
import {  LOADMORE_STATUS, LOADMORE_CONTENT_TEXT } from '@/library/constant'
import { mapState, mapMutations } from 'vuex'

export default {
	components: {
		FeedList,
		FilterBar,
		uniLoadMore
	},
  data () {
    return {
			isEmptyData: false,
			// 领养列表
			feedList: [],
			// 领养列表请求参数
			feedListParams: {
				// '676334de-4a94-45f7-a308-5d70b93a45db'
				city_id: undefined,
				// c451e95f-be2b-4f1a-8817-71e72e0704b2
				locality_id: undefined,
				petClass_id: undefined,
				page: 1,
				page_size: 10
			},
			// 值：more、loading、noMore
			loadmoreStatus: LOADMORE_STATUS.loading,
			loadmoreContent: LOADMORE_CONTENT_TEXT
    }
	},
	computed: {
		...mapState('feed', [
			'refreshHome'
		])
	},
	methods: {
		...mapMutations('feed', [
			'updateFeedData',
			'updateRefreshHome'
		]),
		// 获取领养列表
		fetchFeedList () {
			this.$http.get('/pet/api/v1/adoption', {
				...this.feedListParams
			}).then(res => {
				if (res !== null) {
					const newFeedList = adapterFeedList(res)
					this.feedList = this.feedList.concat(newFeedList)
				} else {
					this.loadmoreStatus = LOADMORE_STATUS.noMore
				}
				this.isEmptyData = this.feedList.length === 0
			})
		},
		// 地址筛选
		filterAddress (data) {
			const values = data.values
			this.feedListParams.city_id = values[1]
			this.feedListParams.locality_id = values[2]
			this.refreshFeedList()
		},
		// 宠物种类筛选
		filterPetClass (data) {
			this.feedListParams.petClass_id = data
			this.refreshFeedList()
		},
		// 刷新列表数据
		refreshFeedList () {
			this.loadmoreStatus = LOADMORE_STATUS.loading
			this.feedListParams.page = 1
			this.feedList = []
			this.fetchFeedList()
		},
		// 列表点击事件
		handleFeedItemClick (item) {
			this.updateFeedData(item)
			uni.navigateTo({
				url: `/pages/feed/detail/index?id=${item.id}&useStore=true`
			})
		}
	},
	onReachBottom () {
		if (this.loadmoreStatus !== LOADMORE_STATUS.noMore) {
			this.feedListParams.page++
			this.fetchFeedList()
		}
	},
  onLoad () {
    this.$app.ready(() => {
			this.fetchFeedList()
		})
	},
	onShow () {
		console.log(this.refreshHome, 'this.refreshHome')
		if (this.refreshHome) {
			// 刷新首页数据
			this.feedListParams.city_id = undefined
			this.feedListParams.city_id = undefined
			this.feedListParams.petClass_id = undefined
			this.refreshFeedList()
			
			// refreshHome 重置为false
			this.updateRefreshHome(false)
		}
	}
}
</script>

<style lang="scss">
.home-section {
	padding: 14px 16px 0;
	background-color: #ffffff;
}
.home-banner {
	overflow: hidden;
	box-sizing: border-box;
	display: block;
	border-radius: 8px;
	width: 100%;
	height: 150px;
}
.home-nav {
	display: flex;
	border-radius: 8px;
	padding: 16px 0;
	background-color: #ffffff;
}
.home-nav-item {
	flex: 1;
}
.home-nav-icon {
	display: block;
	margin: 0 auto;
	width: 25px;
	height: 25px;
}
.home-nav-text {
	display: block;
	margin-top: 8px;
	font-size: 12px;
	text-align: center;
	color: $M08;
}
</style>

