<template>
	<view class="cu-bar tabbar bg-white foot">
		<view 
			class="action" 
			v-for="(tab, index) in tabs" 
			:key="index"
			@click="handleClick(tab)">
			<view class="cuIcon-cu-image">
				<text :class="[tab.icon, activeTab === tab.key ? 'text-green' : 'text-grey']"></text>
			</view>
			<view :class="activeTab === tab.key ? 'text-green' : 'text-grey'">{{ tab.name }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			activeTab: {
				type: String,
				default: 'home'
			}
		},
		data () {
			return {
				tabs: [
					{
						name: '首页',
						key: 'home',
						path: '/pages/home/index',
						icon: 'cuIcon-home'
					},
					{
						name: '发布',
						key: 'release',
						path: '/pages/release/index',
						icon: 'cuIcon-write'
					},
					{
						name: '关于我们',
						key: 'about',
						path: '/pages/about/index',
						icon: 'cuIcon-group'
					},
					{
						name: '我的',
						key: 'user',
						path: '/pages/user/index',
						icon: 'cuIcon-people'
					}
				]
			}
		},
		methods: {
			// tab 点击事件
			handleClick (tab) {
				uni.navigateTo({
					url: tab.path
				})
			}
		}
	}
</script>

<style>
</style>
