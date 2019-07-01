<template>
	<view class="feed-list-home">
		<view 
			class="feed-list-item c-1px-b" 
			v-for="(item, index) in list" 
			:key="index"
			@tap="handleItemClick(item, index)">
			<view class="feed-list-header">
				<image class="feed-list-avatar" :src="item.avatar"></image>
				<text class="feed-list-name">{{ item.name }}</text>
			</view>
			<view class="feed-list-body">
				<view class="feed-list-content c-ellipsisLn-6">{{ item.content }}</view>
				<grid-images :list="item.petImages" :limit="3"></grid-images>
				<view class="feed-list-tags">
					<c-tag>未绝育</c-tag>
					<c-tag>未绝育</c-tag>
					<c-tag>未绝育</c-tag>
				</view>
				<view class="feed-list-address">
					<image class="feed-list-location-icon" :src="locationIcon"></image>
					{{ item.address }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import GridImages from '@/library/components/grid-images'
	import locationIcon from '@/static/icons/location-grey.svg'
	export default {
		components: {
			GridImages
		},
		props: {
			list: {
				type: Array,
				default: () => []
			}
		},
		data () {
			return {
				locationIcon
			}
		},
		methods: {
			handleItemClick (item, index) {
				this.$emit('item-click', item, index)
			}
		}
	}
</script>

<style lang="scss">
.feed-list-home {
	margin-top: -12px;
}
.feed-list-item {
	margin-top: 12px;
	padding: 16px;
	background-color: #ffffff;
}
.feed-list-header {
	display: flex;
	align-items: center;
}
.feed-list-avatar {
	border-radius: 100px;
	width: 35px;
	height: 35px;
}
.feed-list-name {
	flex: 1;
	width: 0;
	margin-left: 10px;
	font-size: 15px;
	color: $M08;
}
.feed-list-body {
	padding-top: 10px;
}
.feed-list-content {
	margin-bottom: 12px;
	font-size: 16px;
	color: #000000;
	line-height: 26px;
}
.feed-list-tags {
	margin-bottom: 12px;
}
.feed-list-address {
	font-size: 12px;
	color: $M08;
}
.feed-list-location-icon {
	position: relative;
	top: 1px;
	margin-right: 5px;
	width: 11px;
	height: 11px;
}
</style>
