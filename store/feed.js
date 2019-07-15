/*
 * File: feed.js
 * File Created: 2019-07-15 9:00:22 am
 * Author: zhanghc11 (huancheng.zhang@meicloud.com)
 * Copyright: 2017 - 2019 Copyright (c), 深圳美云智数科技有限公司
 * -----
 * Last Modified: 2019-07-15 9:47:13 am
 * Modified By: zhanghc11 (huancheng.zhang@meicloud.com>)
 */

export default {
  namespaced: true,
  state: {
    // 领养数据（领养详情页）
    feedData: {}
  },
  getters: {
    
  },
  mutations: {
    // 更新领养数据
    updateFeedData (state, data) {
      state.feedData = data
    }
  },
  actions: {
    
  }
}