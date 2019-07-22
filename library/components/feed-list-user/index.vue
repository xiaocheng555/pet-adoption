<template>
	<view class="feed-list-user">
		<view 
			class="feed-list-item" 
			:class="index === 0 ? 'feed-list-item_first' : ''"
			v-for="(item, index) in list" 
			:key="index"
			@tap="handleItemClick(item, index)">
			<view class="feed-list-header c-1px-b" @tap.stop="handleAvatarBarClick(item)">
				<view class="feed-list-state-box">
					<text class="feed-list-state-text" :class="[getFeedStateObj(item.petState).class]">
						{{getFeedStateObj(item.petState).label}}
					</text>
				</view>
				<view class="feed-list-header-text">
					查看申请人
				</view>
		    <image class="feed-list-header-arrow" src="/static/icons/arrow-right.svg"></image>
			</view>
			<view class="feed-list-body">
				<view class="feed-list-date">{{ item.date }}</view>
				<view class="feed-list-content c-ellipsisLn-6">{{ item.petDesc }}</view>
				<grid-images :list="item.petImages"></grid-images>
			</view>
			<view class="feed-list-action-wrap c-1px-t">
				<!-- <view class="feed-list-delete" @tap.stop="handleDelete(item, index)">删除</view> -->
				<view 
					v-if="item.petState !== PET_FEED_STATE.processing.value" 
					class="feed-list-cancel" 
					@tap.stop="handleCancel(item, index)">
					取消送养
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import GridImages from '@/library/components/grid-images'
import { PET_FEED_STATE } from '@/library/constant'

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
			PET_FEED_STATE
		}
	},
	methods: {
		// 获取送养状态
		getFeedStateObj (state) {
			let stateObj = {}
			Object.values(PET_FEED_STATE).some(item => {
				if (item.value === state) {
					stateObj = item
					return true
				}
			})
			return stateObj
		},
		handleItemClick (item) {
			this.$emit('item-click', item)
		},
		handleAvatarBarClick (item) {
			this.$emit('avatar-bar-click', item)
		},
		handleDelete (item, index) {
			this.$emit('item-delete', {
				item, index
			})
		},
		handleCancel (item, index) {
			this.$emit('item-cancel', {
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
	position: relative;
	margin: 12px 0;
	padding-bottom: 0;
	background-color: #ffffff;
}
.feed-list-header {
	display: flex;
	height: 50px;
	padding: 0 16px;
  align-items: center;
}
.feed-list-header-text {
	flex: 1;
  font-size: 14px;
  line-height: 24px;
  text-align: right;
  color: $M08;
}
.feed-list-header-arrow {
  width: 8px;
  height: 13.5px;
  margin-left: 8px;
}
.feed-list-body {
	padding: 12px 16px 0;
}
.feed-list-date {
	font-size: 12px;
	color: $M06;
}
.feed-list-state-box {
	position: absolute;
	font-size: 14px;
	top: 16px;
	left: 16px;
}
.feed-list-state-text {
	// margin-left: 5px;
}
.feed-list-content {
	margin-top: 6px;
	margin-bottom: 10px;
	font-size: 16px;
	color: #000000;
	line-height: 26px;
}
.feed-list-action-wrap {
	padding: 0 16px;
	line-height: 50px;
	text-align: right;
}
.feed-list-delete {
	min-width: 50px;
	font-size: 14px;
	color: $A06;
	text-align: right;
}
.feed-list-cancel {
	display: inline-block;
	min-width: 50px;
	padding: 5px 12px;
	border: 1px solid $M04;
	border-radius: 100px;
	font-size: 14px;
	line-height: 20px;
	height: 20px;
	color: $M10;
	text-align: right;
}
</style>