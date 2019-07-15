import Vue from 'vue'
import Vuex from 'vuex'
import CONFIG from '@/config'
import feedModule from './feed'

Vue.use(Vuex)

// 获取token
function getToken(code) {
	return Vue.prototype.$http.get('/pet/auth/wx', {
		js_code: code
	}).then(res => {
		return res.token
	}).catch(err => {
		console.error('获取token失败：', err)
	})
}

// 获取宠物类型
function fetchPetClass() {
	return Vue.prototype.$http.get('/pet/api/v1/pet/class').then(res => {
		return res.map(item => {
			return {
				label: item.name,
				value: item.uuid
			}
		})
	})
}

// 获取中国地址数据
function fetchChinaAddressData() {
	return Vue.prototype.$http.get('/pet/api/v1/locality').then(res => {
		let provinces = res || []
		// 遍历省
		provinces = provinces.map(province => {
			let citys = province.citys || []
			// 遍历市
			citys = citys.map(city => {
				let localities = city.localities || []
				// 遍历区
				localities = localities.map(locality => {
					return {
						label: locality.locality_name,
						value: locality.locality_uuid
					}
				})
				return {
					label: city.city_name,
					value: city.city_uuid,
					children: localities
				}
			})
			return {
				label: province.province_name,
				value: province.province_uuid,
				children: citys
			}
		})
		return provinces
	})
}

const store = new Vuex.Store({
	// 模块
	modules: {
		feed: feedModule
	},
	state: {
		userInfo: {
			nickName: null,
			avatarUrl: null,
			code: null,
			token: null
		},
		petClassOptions: [],
		cityData: null
	},
	getters: {
		hasLogin (state) {
			return !!state.userInfo.nickName
		}
	},
	mutations: {
		setUserInfo (state, data) {
			Object.assign(state.userInfo, data)
		},
		changePetClassData(state, data) {
			state.petClassOptions = data
		},
		changeCityData(state, data) {
			state.cityData = data
		}
	},
	actions: {
		// 获取用户信息
		getUserInfo({ commit }) {
			Vue.prototype.$promisify(uni.getUserInfo)({ provider: 'weixin' }).then(result => {
				let userInfo = result.userInfo
				commit('setUserInfo', {
					nickName: userInfo.nickName,
					avatarUrl: userInfo.avatarUrl
				})
			})
		},
		// 授权，从后台获取token
    handleAuth({ dispatch, commit }) {
      // #ifdef H5
      // 加入测试数据，包括token
			commit('setUserInfo', CONFIG.tesUserInfo)
			return dispatch('fetchBaseData').catch((err) => {
				dispatch('showRetryAuthModal', {
					content: '获取基础数据失败，请重试'
				})
			})
      // #endif

      // #ifdef MP-WEIXIN
      return Vue.prototype.$promisify(uni.login)().then(result => {
        console.log(result.code, result, 'result')
				return getToken(result.code).then((token) => {
					commit('setUserInfo', { token })
					return dispatch('fetchBaseData').catch(() => {
						dispatch('showRetryAuthModal', {
							content: '获取基础数据失败，请重试'
						})
					})
        }).catch((err) => {
					dispatch('showRetryAuthModal', {
						content: '获取token，请重试'
					})
				})
      })
			// #endif
    },
    // 获取基础数据
		fetchBaseData({ commit }) {
			const p1 = fetchPetClass().then(data => {
				commit('changePetClassData', data)
			}).catch((err) => {
				console.error('获取宠物类型失败:', err)
			})
			const p2 = fetchChinaAddressData().then((data) => {
				commit('changeCityData', data)
			}).catch((err) => {
				console.error('获取省市区地址失败:', err)
			})
			return Promise.all([p1, p2])
		},
		// 显示重新授权的弹框
		showRetryAuthModal({ dispatch }, {content}) {
			Vue.prototype.$promisify(uni.showModal)({
				title: '提示',
				content: content
			}).then(res => {
				if (res.confirm) {
					dispatch('handleAuth')
				}
			})
		}
	}
})

export default store
