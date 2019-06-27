<template>
  <c-page title="首页" :has-back="false">
		<image class="home-banner" src="/static/images/banner.jpg" lazy-load></image>
		<!-- <view class="c-gutter-md"></view> -->
		<view class="home-container">
			<c-tab :data="tabList"></c-tab>
			<home-filter 
				@address-change="handleAddressChange" 
				@pet-class-change="handlePetClassChange">
			</home-filter>
			<feed-list :list="feedList" @item-click="handleFeedItemClick"></feed-list>
		</view>
	</c-page>
</template>

<script>
	import FeedList from '@/library/components/feed-list'
	import HomeFilter from '@/library/components/home-filter'
	
  export default {
		components: {
			FeedList,
			HomeFilter
		},
    data () {
      return {
				tabList: [
					{
						label: '宠物领养',
						value: '0'
					},
					{
						label: '寻主启示',
						value: '1'
					},
					{
						label: '寻宠启示',
						value: '2'
					}
				],
				// 筛选项
				filterOptions: {
					address: null,
					petClass: null
				},
				feedList: [
					{
						avatar: 'https://mmbiz.qpic.cn/mmbiz_gif/1qRdrtrbict1lYcqGYFpzS7Y4zYiar4nXeKYNNb34j4SYfhAzoEs1yp1VcDLYKiaYJicNgHs4wyEGX8632Ms2Z7Jxg/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1',
						name: 'zhang先生',
						address: '广东省佛山市顺德区',
						content: '肯德基疯狂星期四”活动时间为6月20日、6月27日。活动日的9:30-23:00（北京市、天津市、南京市、无锡市、湖北省、江西省、广东省、福建省、广西壮族自治区和海南省等部分地区仅限10:30－23:00供应），具体以餐厅实际营业时间为准，到店可享以9.9元优惠价购买薯条（小）2份，以19.9元优惠价购买老北京香辣鸭肉卷2个，以及以19.9元优惠价购买桃之恋乌龙茶2杯。',
						petImages: [
							'https://mmbiz.qpic.cn/mmbiz_gif/1qRdrtrbict1lYcqGYFpzS7Y4zYiar4nXeKYNNb34j4SYfhAzoEs1yp1VcDLYKiaYJicNgHs4wyEGX8632Ms2Z7Jxg/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1',
							'https://mmbiz.qpic.cn/mmbiz_gif/1qRdrtrbict1lYcqGYFpzS7Y4zYiar4nXeKYNNb34j4SYfhAzoEs1yp1VcDLYKiaYJicNgHs4wyEGX8632Ms2Z7Jxg/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1',
							'https://mmbiz.qpic.cn/mmbiz_gif/1qRdrtrbict1lYcqGYFpzS7Y4zYiar4nXeKYNNb34j4SYfhAzoEs1yp1VcDLYKiaYJicNgHs4wyEGX8632Ms2Z7Jxg/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1',
							'https://mmbiz.qpic.cn/mmbiz_gif/1qRdrtrbict1lYcqGYFpzS7Y4zYiar4nXeKYNNb34j4SYfhAzoEs1yp1VcDLYKiaYJicNgHs4wyEGX8632Ms2Z7Jxg/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1',
							'https://mmbiz.qpic.cn/mmbiz_gif/1qRdrtrbict1lYcqGYFpzS7Y4zYiar4nXeKYNNb34j4SYfhAzoEs1yp1VcDLYKiaYJicNgHs4wyEGX8632Ms2Z7Jxg/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1',
						]
					},
					{
						avatar: 'https://mmbiz.qpic.cn/mmbiz_jpg/1qRdrtrbict1R7pMvLMDI1mLRmsWNh5MKiaibCboHLHQ6AD0gUNcsX9dy9M4YuMnY46b5ibL1SkPuiaHmterWI06q5A/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',
						name: 'zhang先生',
						address: '广东省佛山市顺德区',
						content: '肯德基疯狂星期四”活动时间为6月20日、6月27日。活动日的9:30-23:00（北京市、天津市、南京市、无锡市、湖北省、江西省、广东省、福建省、广西壮族自治区和海南省等部分地区仅限10:30－23:00供应），具体以餐厅实际营业时间为准，到店可享以9.9元优惠价购买薯条（小）2份，以19.9元优惠价购买老北京香辣鸭肉卷2个，以及以19.9元优惠价购买桃之恋乌龙茶2杯。',
						petImages: [
							'https://mmbiz.qpic.cn/mmbiz_jpg/1qRdrtrbict1R7pMvLMDI1mLRmsWNh5MKW1K3gselO4ohdf0GBMFEsLPbqXy9Cqe6ZkWl5AJctHHibtQLo7I4ibrw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',
							'https://mmbiz.qpic.cn/mmbiz_gif/1qRdrtrbict1lYcqGYFpzS7Y4zYiar4nXeKYNNb34j4SYfhAzoEs1yp1VcDLYKiaYJicNgHs4wyEGX8632Ms2Z7Jxg/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1',
							'https://mmbiz.qpic.cn/mmbiz_jpg/1qRdrtrbict1R7pMvLMDI1mLRmsWNh5MKiaibCboHLHQ6AD0gUNcsX9dy9M4YuMnY46b5ibL1SkPuiaHmterWI06q5A/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'
						]
					},
					{
						avatar: 'https://mmbiz.qpic.cn/mmbiz_jpg/1qRdrtrbict1R7pMvLMDI1mLRmsWNh5MKiaibCboHLHQ6AD0gUNcsX9dy9M4YuMnY46b5ibL1SkPuiaHmterWI06q5A/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',
						name: 'zhang先生',
						address: '广东省佛山市顺德区',
						content: '肯德基疯狂星期四”活动时间为6月20日、6月27日。活动日的9:30-23:00（北京市、天津市、南京市、无锡市、湖北省、江西省、广东省、福建省、广西壮族自治区和海南省等部分地区仅限10:30－23:00供应），具体以餐厅实际营业时间为准，到店可享以9.9元优惠价购买薯条（小）2份，以19.9元优惠价购买老北京香辣鸭肉卷2个，以及以19.9元优惠价购买桃之恋乌龙茶2杯。',
						petImages: [
							'https://mmbiz.qpic.cn/mmbiz_jpg/1qRdrtrbict1R7pMvLMDI1mLRmsWNh5MKW1K3gselO4ohdf0GBMFEsLPbqXy9Cqe6ZkWl5AJctHHibtQLo7I4ibrw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',
							'https://mmbiz.qpic.cn/mmbiz_gif/1qRdrtrbict1lYcqGYFpzS7Y4zYiar4nXeKYNNb34j4SYfhAzoEs1yp1VcDLYKiaYJicNgHs4wyEGX8632Ms2Z7Jxg/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1',
							'https://mmbiz.qpic.cn/mmbiz_jpg/1qRdrtrbict1R7pMvLMDI1mLRmsWNh5MKiaibCboHLHQ6AD0gUNcsX9dy9M4YuMnY46b5ibL1SkPuiaHmterWI06q5A/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'
						]
					},
					{
						avatar: 'https://mmbiz.qpic.cn/mmbiz_jpg/1qRdrtrbict1R7pMvLMDI1mLRmsWNh5MKiaibCboHLHQ6AD0gUNcsX9dy9M4YuMnY46b5ibL1SkPuiaHmterWI06q5A/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',
						name: 'zhang先生',
						address: '广东省佛山市顺德区',
						content: '肯德基疯狂星期四”活动时间为6月20日、6月27日。活动日的9:30-23:00（北京市、天津市、南京市、无锡市、湖北省、江西省、广东省、福建省、广西壮族自治区和海南省等部分地区仅限10:30－23:00供应），具体以餐厅实际营业时间为准，到店可享以9.9元优惠价购买薯条（小）2份，以19.9元优惠价购买老北京香辣鸭肉卷2个，以及以19.9元优惠价购买桃之恋乌龙茶2杯。',
						petImages: [
							'https://mmbiz.qpic.cn/mmbiz_jpg/1qRdrtrbict1R7pMvLMDI1mLRmsWNh5MKW1K3gselO4ohdf0GBMFEsLPbqXy9Cqe6ZkWl5AJctHHibtQLo7I4ibrw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',
							'https://mmbiz.qpic.cn/mmbiz_gif/1qRdrtrbict1lYcqGYFpzS7Y4zYiar4nXeKYNNb34j4SYfhAzoEs1yp1VcDLYKiaYJicNgHs4wyEGX8632Ms2Z7Jxg/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1',
							'https://mmbiz.qpic.cn/mmbiz_gif/1qRdrtrbict1lYcqGYFpzS7Y4zYiar4nXeKYNNb34j4SYfhAzoEs1yp1VcDLYKiaYJicNgHs4wyEGX8632Ms2Z7Jxg/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1',
							'https://mmbiz.qpic.cn/mmbiz_gif/1qRdrtrbict1lYcqGYFpzS7Y4zYiar4nXeKYNNb34j4SYfhAzoEs1yp1VcDLYKiaYJicNgHs4wyEGX8632Ms2Z7Jxg/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1',
							'https://mmbiz.qpic.cn/mmbiz_gif/1qRdrtrbict1lYcqGYFpzS7Y4zYiar4nXeKYNNb34j4SYfhAzoEs1yp1VcDLYKiaYJicNgHs4wyEGX8632Ms2Z7Jxg/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1',
							'https://mmbiz.qpic.cn/mmbiz_gif/1qRdrtrbict1lYcqGYFpzS7Y4zYiar4nXeKYNNb34j4SYfhAzoEs1yp1VcDLYKiaYJicNgHs4wyEGX8632Ms2Z7Jxg/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1',
							'https://mmbiz.qpic.cn/mmbiz_jpg/1qRdrtrbict1R7pMvLMDI1mLRmsWNh5MKiaibCboHLHQ6AD0gUNcsX9dy9M4YuMnY46b5ibL1SkPuiaHmterWI06q5A/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1'
						]
					}
				]
      }
    },
		methods: {
			// 省市区地址改变事件
			handleAddressChange () {
				
			},
			// 宠物类型改变事件
			handlePetClassChange () {
				
			},
			handleFeedItemClick (item) {
				uni.navigateTo({
					url: '/pages/feed/detail/index'
				})
			} 
		},
    onLoad () {
      this.$app.ready(() => {
				console.log('=============ready================')
			})
    }
  }
</script>

<style lang="scss">
.home-banner {
	display: block;
	width: 100%;
	height: 200px;
}
</style>

