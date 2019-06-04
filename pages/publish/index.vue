<template>
	<view class="publish-page">
		<scroll-view scroll-y>
			<view class="cu-card">
				<view 
					class="cu-item bg-img shadow-blur" 
					:style="{ 'background-color': item.bgColor }"
				  v-for="(item,index) in publishList" 
				  :key="index"
					@tap="handleTap(item)">
					<view class="card-title">
						{{item.title}}
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				publishList: [
					{
						title: '发布领养',
						image: '',
						url: '/pages/publish/feed/index',
						bgColor: '#f37b1d'
					},
					{
						title: '发布寻宠启示',
						image: '',
						url: '/pages/publish/pet-search/index',
						bgColor: '#8dc63f'
					},
					{
						title: '发布寻主启示',
						image: '',
						url: '/pages/publish/owner-search/index',
						bgColor: '#1cbbb4'
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			handleTap (item) {
				uni.navigateTo({
					url: item.url
				})
			}
		}
	}
</script>

<style lang="less">
.publish-page {
	.card-title {
		color: #fff;
		padding: 90upx 60upx;
		font-size: 40upx;
		font-weight: 300;
		transform: skew(-10deg, 0deg);
		position: relative;
		text-shadow: 0px 0px 6upx rgba(0, 0, 0, 0.3);
		
		&::before {
			content: "";
			position: absolute;
			width: 60upx;
			height: 6upx;
			border-radius: 20upx;
			background-color: #fff;
			display: block;
			top: 60upx;
			left: 50upx;
			transform: skew(10deg, 0deg);
		}
	}
}
</style>
