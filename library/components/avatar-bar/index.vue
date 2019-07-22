<template>
  <view class="avatar-bar c-1px-t">
    <view class="avatar-bar-images">
  		<image 
  			class="avatar-bar-image" 
  			v-for="(item, index) in list"
  			:key="index"
  			:src="item.src">
  		</image>
    </view>
		<view class="avatar-bar-right">
			<slot></slot>
		</view>
    <image class="avatar-bar-arrow" src="/static/icons/arrow-right.svg"></image>
	</view>
</template>

<script>
export default {
  props: {
		list: {
			type: Array,
			default: () => []
		}
	}
}
</script>

<style lang='scss'>
.avatar-bar {
  display: flex;
  height: 60px;
  // padding: 0 16px;
  align-items: center;
}
.avatar-bar-images {
  flex: 1;
}
.avatar-bar-image {
  width: 30px;
  height: 30px;
  border-radius: 100px;
  margin-right: 5px;
}
.avatar-bar-right {
  flex: 1;
  font-size: 14px;
  line-height: 24px;
  text-align: right;
  color: $M08;
}
.avatar-bar-arrow {
  width: 8px;
  height: 13.5px;
  margin-left: 8px;
}
</style>