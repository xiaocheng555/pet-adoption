<template>
	<c-page title="我的申请">
		<c-inline-loading align="center" v-if="listLoading"></c-inline-loading>
    <c-no-data v-else-if="isEmptyData"></c-no-data>
		<apply-list 
      v-else
      :list="applyList" 
      @item-click="handleApplyItemClick"
      @item-delete="handleApplyDelete">
    </apply-list>
	</c-page>
</template>

<script>
import ApplyList from '@/library/components/apply-list'

export default {
	components: {
		ApplyList
	},
	data() {
		return {
			applyList: [],
	    listLoading: true,
	    isEmptyData: false
		}
	},
	methods: {
		// 获取申请领养列表
		fetchApplyList () {
			this.$http.get('/pet/api/v1/adoption/application').then(res => {
				this.listLoading = false
				if (res !== null) {
					this.applyList = adapterApplyList(res)
				} else {
					this.isEmptyData = true
				}
			})
		},
		// 某条申请领养点击事件
    handleApplyItemClick (item) {
      this.updateApplyData(item)
      uni.navigateTo({
        url: `/pages/apply/detail/index?id=${item.id}&useStore=true`
      })
    },
    // 某条申请领养删除事件
    handleApplyDelete (data) {
      let { item, index } = data
      this.$promisify(uni.showModal)({ 
        title: '提示',
        content: '确定删除？'
      }).then(res => {
        if (res.confirm) {
          this.$http.delete(`/pet/api/v1/adoption/pet/${item.id}`, null, {
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
