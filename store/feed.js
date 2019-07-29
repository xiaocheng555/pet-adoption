export default {
  namespaced: true,
  state: {
    // 刷新首页
    refreshHome: false,
    // 领养数据（领养详情页）
    feedData: null,
    // 填写发布领养的表单数据
    feedFormData: {
      petName: '',
      petAge: '',
      petClass: [],
      petVariety: '',
      address: '',
      petGender: [],
      petSterilization: [],
      petVaccination: [],
      free: [],
      // name: '',
      // telephone: '',
      // weixin: '',
      petDesc: '',
      adoptionDesc: '',
      imgList: [],
      agePickerIndex: null
    },
    // 刷新我的领养-申请人列表
    refreshApplyApproval: false
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
    },
    // 清空领养的表单数据
    clearFeedFormData(state) {
      state.feedFormData = {
        petName: '',
        petAge: '',
        petClass: [],
        petVariety: '',
        address: '',
        petGender: [],
        petSterilization: [],
        petVaccination: [],
        free: [],
        // name: '',
        // telephone: '',
        // weixin: '',
        petDesc: '',
        adoptionDesc: '',
        imgList: [],
        agePickerIndex: null
      }
    },
    // 更新refreshApplyApproval数据
    updateRefreshApplyApproval (state, data) {
      state.refreshApplyApproval = data
    }
  },
  actions: {
    
  }
}