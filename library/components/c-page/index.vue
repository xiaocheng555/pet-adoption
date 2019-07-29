<template>
	<view class="c-page">
		<c-header v-if="hasHeader" :title="title" :has-back="hasBack"></c-header>
		<c-inline-loading align="center" v-if="pageLoading"></c-inline-loading>
		<view v-else>
	  	<slot></slot>
		</view>		
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			hasBack: {
				type: Boolean,
				default: true
			},
			hasHeader: {
				type: Boolean,
				default: true
			}
		},
		data () {
			return {
				pageLoading: true
			}
		},
		methods: {
			// 隐藏个人中心下所有子页面的分享菜单
			hidePagesShareMenu () {
				let pages = getCurrentPages()
				let curPage = pages[pages.length-1]
				let curPath = curPage.route
				if (/^pages\/user\/(.+)\/(.+)/.test(curPath)) {
					console.log('hidePagesShareMenu')
					uni.hideShareMenu()
				}
			}
		},
		created () {
			this.hidePagesShareMenu()
		},
		mounted () {
			this.pageLoading = false
		}
	}
</script>
