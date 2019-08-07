<template>
  <c-page title="申请人列表">
		<c-inline-loading align="center" v-if="listLoading"></c-inline-loading>
    <c-no-data v-else-if="isEmptyData">暂无申请人~</c-no-data>
    <view class="apply-list" v-else>
      <view 
        class="apply-list-item c-1px-b"
  			v-for="(item, index) in applyList"
  			:key="index"
  			@tap="handleApplyItemClick(item)">
        <image class="apply-list-avatar" :src="item.avatarUrl"></image>
        <view class="apply-list-main">
          <view class="apply-list-name">{{ item.nickName }}</view>
          <view class="apply-list-date">提交时间：{{ item.date }}</view>
        </view>
        <view class="apply-list-state" :class="[item.stateClass]">{{ item.stateLabel }}</view>
        <image class="apply-list-arrow" src="/static/icons/arrow-right.svg"></image>
      </view>
    </view>
  </c-page>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { PET_APPLY_STATE } from '@/library/constant'
import { dateFormat } from '@/library/utils/date'

export default {
  data () {
    return {
	    listLoading: false,
	    isEmptyData: false,
      applyList: [],
      petId: null
    }
  },
  computed: {
    ...mapState('feed', [
      'refreshApplyApproval'
    ])
  },
  methods: {
    ...mapMutations('feed', [
			'updateRefreshApplyApproval'
		]),
    // 获取申请领养列表
		fetchApplyList (petId) {
      this.applyList = []
      this.listLoading = true
			this.$http.get(`/pet/api/v1/adoption/pet/${petId}/application`).then(res => {
				this.listLoading = false
				if (res !== null) {
					this.applyList = this.adapterApplyList(res || [])
				} else {
					this.isEmptyData = true
				}
			})
    },
    // 适配申请领养列表
    adapterApplyList (list) {
      return list.map(item => {
        let stateObj = this.getApplyStateObj(item.state)
        return {
          applyId: item.uuid,
          petId: item.pet_id,
          userId: item.user_id,
          state: item.state,
          stateClass: stateObj.class,
          stateLabel: stateObj.label,
          remark: item.remark,
          infos: item.infos,
          nickName: item.user.nick_name,
          avatarUrl: item.user.avatar_url,
          date: dateFormat(item.created, 'YYYY-MM-DD hh:mm'),
        }
      })
    },
    // 获取审批状态的对象
		getApplyStateObj (state) {
			let stateObj = {}
			Object.values(PET_APPLY_STATE).some(item => {
				console.log(item, 'value')
				if (item.value === state) {
					stateObj = item
					return true
				}
			})
			return stateObj
		},
    // 某条申请人点击事件
    handleApplyItemClick (item) {
      uni.navigateTo({
				url: `/pages/user/feed/apply-approval/index?applyId=${item.applyId}`
			})
    }
  },
  onLoad (params) {
    this.petId = params.petId
		this.$app.ready(() => {
      this.fetchApplyList(this.petId)
    })
  },
  onShow (params) {
    // 从申请人审批更新了审批状态，返回该页面时，需要刷新申请人列表
    if (this.refreshApplyApproval) {
      this.fetchApplyList(this.petId)
      this.updateRefreshApplyApproval(false)
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
.apply-list-state {
  padding-left: 5px;
  padding-right: 2px;
  font-size: 14px;
}
.apply-list-arrow {
  width: 8px;
  height: 13.5px;
  margin-left: 5px;
}
</style>