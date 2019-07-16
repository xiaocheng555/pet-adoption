<template>
  <c-page title="申请人列表">
    <view class="apply-list">
      <view 
        class="apply-list-item c-1px-b"
  			v-for="(item, index) in applyList"
  			:key="index"
  			@tap="handleApplyItemClick(item)">
        <image class="apply-list-avatar" :src="item.src"></image>
        <view class="apply-list-main">
          <view class="apply-list-name">{{ item.name }}</view>
          <view class="apply-list-date">{{ item.date }}</view>
        </view>
        <image class="apply-list-arrow" src="/static/icons/arrow-right.svg"></image>
      </view>
    </view>
  </c-page>
</template>

<script>
export default {
  data () {
    return {
      applyList: [
				{
					id: 1,
          src: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIBNWMbATA1z48yPkpaf9W8qOfCf3FicZaVHU0xGaulOQfnDOBRJCwLazo5Ue5GPPicnQgcSmQgKfsQ/132',
          name: '张焕城',
          date: '2019-02-19'
				},
				{
					id: 2,
          src: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIBNWMbATA1z48yPkpaf9W8qOfCf3FicZaVHU0xGaulOQfnDOBRJCwLazo5Ue5GPPicnQgcSmQgKfsQ/132',
          name: '张小明',
          date: '2019-02-19'
				},
				{
					id: 2,
          src: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIBNWMbATA1z48yPkpaf9W8qOfCf3FicZaVHU0xGaulOQfnDOBRJCwLazo5Ue5GPPicnQgcSmQgKfsQ/132',
          name: '张小明',
          date: '2019-02-19'
				}
			]
    }
  },
  methods: {
    handleApplyItemClick (item) {
      uni.navigateTo({
				url: `/pages/apply/detail/index`
			})
    }
  }
}
</script>

<style lang='scss'>
.apply-list {
  background-color: #ffffff;
}
.apply-list-item {
  display: flex;
  padding: 8px 16px;
  height: 60px;
  align-items: center;
}
.apply-list-avatar {
  width: 40px;
  height: 40px;
  border-radius: 100px;
}
.apply-list-main {
  padding-left: 16px;
  flex: 1;
}
.apply-list-name {
  font-size: 16px;
  line-height: 28px;
}
.apply-list-date {
  margin-top: 5px;
  font-size: 14px;
  color: $M08;
  line-height: 14px;
}
.apply-list-arrow {
  width: 8px;
  height: 13.5px;
  margin-left: 5px;
}
</style>