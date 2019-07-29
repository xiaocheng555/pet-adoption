<template>
	<c-page 
		title="发布" 
		:has-back="false">
		<view class="publish-card-list">
			<view 
				class="publish-card" 
				v-for="(item,index) in publishList" 
				:key="index"
				@tap="handleTap(item)">
				<image class="publish-card-icon" :src="item.icon"></image>
				<text class="publish-card-title">{{ item.title }}</text>
			</view>
		</view>
	</c-page>
</template>

<script>
	import { mapGetters } from 'vuex'
	
	export default {
		data() {
			return {
				publishList: [
					{
						title: '发布送养',
						icon: '/static/icons/publish__feed.svg',
						url: '/pages/publish/feed/index',
						bgColor: '#f37b1d'
					},
					{
						title: '发布寻宠启示',
						icon: '/static/icons/publish__pet-search.svg',
						url: '/pages/publish/pet-search/index',
						bgColor: '#8dc63f',
						status: 'developing'
					},
					{
						title: '发布寻主启示',
						icon: '/static/icons/publish__search-owner.svg',
						url: '/pages/publish/owner-search/index',
						bgColor: '#1cbbb4',
						status: 'developing'
					}
				]
			}
		},
		computed:{
			...mapGetters([
				'hasLogin'
			])
		},
		methods: {
			handleTap (item) {
				if (item.status === 'developing') {
					return uni.showToast({
						icon: 'none',
						title: '努力开发中，敬请期待...'
					})
				}
				if (!this.hasLogin) {
					return uni.showToast({
						icon: 'none',
						title: '请先登录'
					})
				}
				uni.navigateTo({
					url: item.url
				})
			}
		}
	}
</script>

<style lang="scss">
.publish-card-list {
	padding: 0 16px 16px;
}
.publish-card {
	display: flex;
	margin-top: 16px;
	padding: 20px;
	border-radius: 8px;
	background-color: #ffffff;
	box-shadow: 3px 3px 4px rgba(26, 26, 26, 0.2);
}
.publish-card-icon {
	width: 65px;
	height: 65px;
	margin-left: 10px;
	margin-right: 25px;
}
.publish-card-title {
	flex: 1;
	margin-top: 20px;
	font-size: 16px;
	color: $A11; 
	font-weight: bold;
}
</style>
