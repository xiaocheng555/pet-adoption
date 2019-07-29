<template>
	<view class="feed-list-home">
		<view 
			class="feed-list-item c-1px-b" 
			:class="index === 0 ? 'feed-list-item_first' : ''"
			v-for="(item, index) in list" 
			:key="index"
			@tap="handleItemClick(item, index)">
			<view class="feed-list-header">
				<image class="feed-list-avatar" :src="item.avatar"></image>
				<div class="feed-list-header-main">
					<view class="feed-list-name">{{ item.name }}</view>
					<view class="feed-list-date">{{ item.date }}</view>
				</div>
			</view>
			<view class="feed-list-body">
				<view class="feed-list-content c-ellipsisLn-6">{{ item.petDesc }}</view>
				<grid-images :list="item.petImages" :limit="3"></grid-images>
				<view class="feed-list-tags">
					<c-tag>{{ item.petFree }}</c-tag>
					<c-tag>{{ item.petSterilization }}</c-tag>
					<c-tag>{{ item.petVaccine }}</c-tag>
				</view>
				<view class="feed-list-address">
					<image class="feed-list-location-icon" :src="locationIcon"></image>
					{{ item.address }}
				</view>
			</view>
		</view>
		<slot></slot>
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
		}
	}
}
</script>

<style lang="scss">
.feed-list-item {
	background-color: #ffffff;
	padding: 16px;
}
.feed-list-item_first {
	margin-top: 0;
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
.feed-list-header-main {
	flex: 1;
	width: 0;
	margin-left: 10px;
}
.feed-list-name {
	font-size: 14px;
	color: $M10;
}
.feed-list-date {
	margin-top: 6px;
	font-size: 12px;
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
