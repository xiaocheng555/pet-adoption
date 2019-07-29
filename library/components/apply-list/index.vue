<template>
	<view class="apply-list-user">
		<view 
			class="apply-list-item" 
			:class="index === 0 ? 'apply-list-item_first' : ''"
			v-for="(item, index) in list" 
			:key="index"
			@tap="handleItemClick(item, index)">
			<view class="apply-list-header c-1px-b" @tap.stop="handleHeaderClick(item)">
				<view class="apply-list-state-box">
					<text class="apply-list-state-text" :class="[getApplyStateObj(item.state).class]">
						{{getApplyStateObj(item.state).label}}
					</text>
				</view>
				<view class="apply-list-header-text">
					查看申请内容
				</view>
		    <image class="apply-list-header-arrow" src="/static/icons/arrow-right.svg"></image>
			</view>
			<view class="apply-list-body">
				<image v-if="item.petData.petImages && item.petData.petImages.length > 0" class="apply-list-body-img" :src="item.petData.petImages[0]"></image>
				<view class="apply-list-body-content">
					{{ item.petData.petDesc }}
				</view>
			</view>
			<view class="apply-list-action-wrap c-1px-t">
				<view class="apply-list-delete" @tap.stop="handleDelete(item, index)">删除</view>
			</view>
		</view>
	</view>
</template>

<script>
import GridImages from '@/library/components/grid-images'
import { PET_APPLY_STATE } from '@/library/constant'

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
			PET_APPLY_STATE
		}
	},
	methods: {
		// 获取审批状态的对象
		getApplyStateObj (state) {
			let stateObj = {}
			Object.values(PET_APPLY_STATE).some(item => {
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
		handleHeaderClick (item) {
			this.$emit('item-head-click', item)
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
.apply-list-item_first {
	margin-top: 0;
}
.apply-list-item {
	position: relative;
	margin: 12px 0;
	padding-bottom: 0;
	background-color: #ffffff;
}
.apply-list-header {
	display: flex;
	height: 50px;
	padding: 0 16px;
  align-items: center;
}
.apply-list-header-text {
	flex: 1;
  font-size: 14px;
  line-height: 24px;
  text-align: right;
  color: $M08;
}
.apply-list-header-arrow {
  width: 8px;
  height: 13.5px;
  margin-left: 8px;
}
.apply-list-body {
	display: flex;
	padding: 12px 16px 12px;
}
.apply-list-body-img {
	width: 75px;
	height: 75px;
	border-radius: 8px;
	margin-right: 16px;
	background-color: $M03;
}
.apply-list-body-content {
	flex: 1;
	font-size: 15px;
	line-height: 1.6;
	color: $M10;
	
	@include ellipsisLn(3);
}
.apply-list-state-box {
	position: absolute;
	font-size: 14px;
	top: 16px;
	left: 16px;
}
.apply-list-state-text {
	// margin-left: 5px;
}
.apply-list-content {
	margin-top: 6px;
	margin-bottom: 10px;
	font-size: 16px;
	color: #000000;
	line-height: 26px;
}
.apply-list-action-wrap {
	padding: 0 16px;
	line-height: 50px;
	text-align: right;
}
.apply-list-delete {
	min-width: 50px;
	font-size: 14px;
	color: $A06;
	text-align: right;
}
</style>