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
		petClass: null
	},
	getters: {
		hasLogin (state) {
			return !!state.userInfo.nickName
		}
	},
	mutations: {
		setUserInfo (state, data) {
			Object.assign(state.userInfo, data)
		}
	},
	actions: {
		// 获取宠物类型
		fetchPetClass () {
			return Vue.prototype.$http.get('/pet/api/v1/pet/class').then(res => {
				return res.map(item => {
					return {
						label: item.name,
						value: item.uuid
					}
				})
			})
		},
		// 获取中国地址数据
		fetchChinaAddressData () {
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
	}
})

export default store
