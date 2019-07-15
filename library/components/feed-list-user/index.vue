<template>
	<view class="feed-list-user">
		<view 
			class="feed-list-item" 
			:class="index === 0 ? 'feed-list-item_first' : ''"
			v-for="(item, index) in list" 
			:key="index"
			@tap="handleItemClick(item, index)">
			<view class="feed-list-body">
				<view class="feed-list-content c-ellipsisLn-6">{{ item.petDesc }}</view>
				<view class="feed-list-date">{{ item.date }}</view>
				<grid-images :list="item.petImages"></grid-images>
			</view>
			<view class="feed-list-footer">
				<view class="feed-list-action"></view>
				<view class="feed-list-delete" @tap.stop="handleDelete(item, index)">删除</view>
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
			handleItemClick (item) {
				this.$emit('item-click', item)
			},
			handleDelete (item, index) {
				this.$emit('item-delete', {
					item, index
				})
			}
		}
	}
</script>

<style lang="scss">
.feed-list-item_first {
	margin-top: 0;
}
.feed-list-item {
	margin-top: 12px;
	padding: 16px;
	padding-bottom: 0;
	background-color: #ffffff;
}
.feed-list-body {
	// padding-top: 10px;
}
.feed-list-content {
	margin-bottom: 6px;
	font-size: 16px;
	color: #000000;
	line-height: 26px;
}
.feed-list-date {
	margin-bottom: 12px;
	font-size: 14px;
	color: $M06;
}
.feed-list-tags {
	margin-bottom: 12px;
}
.feed-list-footer {
	display: flex;
	line-height: 40px;
}
.feed-list-action {
	flex: 1;
}
.feed-list-delete {
	min-width: 50px;
	font-size: 14px;
	color: $A06;
	text-align: right;
}
</style>