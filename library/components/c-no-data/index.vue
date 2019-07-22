<template>
  <view class="no-data">
    <image class="no-data-image" src="/static/icons/no-data.svg"></image>
    <view class="no-data-tip">
      <slot>暂无数据</slot>
    </view>
  </view>
</template>

<script>
export default {
}
</script>

<style lang='scss'>
.no-data {
  padding-top: 30px;
  padding-bottom: 30px;
  text-align: center;
}
.no-data-image {
  position: relative;
  left: 10px;
  display: inline-block;
  width: 200px;
}
.no-data-tip {
  font-size: 14px;
  color: $M08;
}
</style>