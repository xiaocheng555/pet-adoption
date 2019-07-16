export default {
  namespaced: true,
  state: {
    // 刷新首页
    refreshHome: false,
    // 领养数据（领养详情页）
    feedData: {}
  },
  getters: {
    
  },
  mutations: {
    // 更新领养数据
    updateFeedData (state, data) {
      state.feedData = data
    },
    // 更新刷新首页数据
    updateRefreshHome (state, data) {
      state.refreshHome = data
    }
  },
  actions: {
    
  }
}