<template>
  <c-page title="我的送养">
    <c-inline-loading align="center" v-if="listLoading"></c-inline-loading>
    <c-no-data v-else-if="isEmptyData"></c-no-data>
    <feed-list 
      v-else
      :list="feedList" 
      @avatar-bar-click="handleAvatarBarClick"
      @item-click="handleFeedItemClick"
      @item-delete="handleFeedDelete">
    </feed-list>
  </c-page>
</template>

<script>
import { mapMutations } from 'vuex'
import { adapterFeedList } from '@/library/utils/adapter-data'
import FeedList from '@/library/components/feed-list-user'
  
export default {
  components: {
    FeedList
  },
  data() {
    return {
      feedList: [],
      listLoading: true,
      isEmptyData: false
    }
  },
  methods: {
    ...mapMutations('feed', [
      'updateFeedData'
    ]),
    // 获取领养列表
    fetchFeedList () {
      this.$http.get('/pet/api/v1/adoption/pet').then(res => {
        this.listLoading = false
        if (res !== null) {
          this.feedList = adapterFeedList(res)
        } else {
          this.isEmptyData = true
        }
      })
    },
    // 某条领养点击事件
    handleFeedItemClick (item) {
      this.updateFeedData(item)
      uni.navigateTo({
        url: `/pages/feed/detail/index?id=${item.id}&useStore=true`
      })
    },
    // 某条领养删除事件
    handleFeedDelete (data) {
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
            this.feedList.splice(index, 1)
          }).catch(() => {
            uni.showToast({
              icon: 'none',
              title: '删除失败'
            })
          })
        }
      })
    },
    // 申请人头像bar点击事件
    handleAvatarBarClick (item) {
      uni.navigateTo({
        url: `/pages/apply/list/index`
      })
    }
  },
  onLoad() {
    this.$app.ready(() => {
      this.fetchFeedList()
    })
  }
}
</script>

<style>
</style>
