<template>
	<c-page title="我的申请">
		<c-inline-loading align="center" v-if="listLoading"></c-inline-loading>
    <c-no-data v-else-if="isEmptyData"></c-no-data>
		<apply-list 
      v-else
      :list="applyList" 
      @item-head-click="handleApplyItemHeadClick"
      @item-click="handleApplyItemClick"
      @item-delete="handleApplyDelete">
    </apply-list>
	</c-page>
</template>

<script>
import ApplyList from '@/library/components/apply-list'
import { PET_APPLY_STATE } from '@/library/constant'
import { dateFormat } from '@/library/utils/date'
import { adapterFeedList } from '@/library/utils/adapter-data'
import { mapMutations } from 'vuex'

export default {
	components: {
		ApplyList
	},
	data() {
		return {
      PET_APPLY_STATE,
			applyList: [],
	    listLoading: true,
	    isEmptyData: false
		}
	},
	methods: {
    ...mapMutations('feed', [
      'updateFeedData'
    ]),
		// 获取申请领养列表
		fetchApplyList () {
			this.$http.get('/pet/api/v1/adoption/application').then(res => {
				this.listLoading = false
				if (res !== null) {
					this.applyList = this.adapterApplyList(res)
				} else {
					this.isEmptyData = true
				}
			})
    },
    // 适配申请领养列表
    adapterApplyList (list) {
      return list.map(item => {
        let stateObj = this.getApplyStateObj(item.state)
        let pet = [item.pet]
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
          petData: item.pet ? adapterFeedList([item.pet])[0] : {}
        }
      })
    },
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
    // 跳转申请详情
    handleApplyItemHeadClick (item) {
      uni.navigateTo({
        url: `/pages/user/apply/detail/index?applyId=${item.applyId}`
      })
    },
		// 某条申请领养点击事件
    handleApplyItemClick (item) {
      let useStore = false
      if (item.petData) {
        this.updateFeedData(item.petData)
        useStore = true
      }
      uni.navigateTo({
        url: `/pages/feed/detail/index?id=${item.petId}&useStore=${useStore}`
      })
    },
    // 某条申请领养删除事件
    handleApplyDelete (data) {
      let { item, index } = data
      console.log(item, 'item')
      this.$promisify(uni.showModal)({ 
        title: '提示',
        content: '确定删除？'
      }).then(res => {
        if (res.confirm) {
          this.$http.delete(`/pet/api/v1/adoption/pet/${item.petId}/application/${item.applyId}`, null, {
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(() => {
            this.applyList.splice(index, 1)
          }).catch(() => {
            uni.showToast({
              icon: 'none',
              title: '删除失败'
            })
          })
        }
      })
    }
	},
	onLoad () {
		this.$app.ready(() => {
      this.fetchApplyList()
    })
	}
}
</script>

<style lang="less">

</style>
