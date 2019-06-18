import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: {
			nickName: null,
			avatarUrl: null,
			code: null,
			token: null
		},
		loginPopupShow: false
	},
	getters: {
		hasLogin (state) {
			console.log(!!state.userInfo.nickName, '========')
			return !!state.userInfo.nickName
		}
	},
	mutations: {
		setUserInfo (state, data) {
			Object.assign(state.userInfo, data)
		},
		changeLoginPopupShow (state, data) {
			state.loginPopupShow = data
		}
	},
	actions: {
		
	}
})

export default store
