<template>
	<c-page title="发布送养">
		<view class="c-gutter-md"></view>
		<c-form class="c-form_label-width-md" ref="cForm" :form="formData" :rules="formRules">
			<c-form-item label="宠物昵称" required>
				<c-input v-model="formData.petName" :maxlength="20" placeholder="请输入宠物昵称" clear />
			</c-form-item>
			<c-form-item label="宠物年龄" required>
				<picker 
					:value="agePickerIndex" 
					:range="ageOptions" 
					range-key="label" 
					@change="handleAgePickerChange">
					<c-input :value="petAgeLabel" placeholder="请选择宠物年龄" disabled />
				</picker>
			</c-form-item>
			<c-form-item label="宠物种类" required>
				<c-checker v-model="formData.petClass">
					<c-checker-item 
						v-for="option in petClassOptions" 
						:value="option.value"
						:key="option.value">
						{{ option.label }}
					</c-checker-item>
				</c-checker>
			</c-form-item>
			<c-form-item label="宠物品种">
				<c-input v-model="formData.petVariety" :maxlength="20" placeholder="选填" clear />
			</c-form-item>
			<view class="c-gutter-md"></view>
			
			<c-form-item label="宠物性别" required>
				<c-checker v-model="formData.petGender">
					<c-checker-item 
						v-for="option in petGenderOptions" 
						:value="option.value"
						:key="option.value">
						{{ option.label }}
					</c-checker-item>
				</c-checker>
			</c-form-item>
			<c-form-item label="是否绝育" required>
				<c-checker v-model="formData.petSterilization">
					<c-checker-item 
						v-for="option in petSterilizationOptions" 
						:value="option.value"
						:key="option.value">
						{{ option.label }}
					</c-checker-item>
				</c-checker>
			</c-form-item>
			<c-form-item label="是否育苗" required>
				<c-checker v-model="formData.petVaccination">
					<c-checker-item 
						v-for="option in petVaccinationOptions" 
						:value="option.value"
						:key="option.value">
						{{ option.label }}
					</c-checker-item>
				</c-checker>
			</c-form-item>
			<c-form-item label="是否免费" required>
				<c-checker v-model="formData.free">
					<c-checker-item 
						v-for="option in petFreeOptions" 
						:value="option.value"
						:key="option.value">
						{{ option.label }}
					</c-checker-item>
				</c-checker>
			</c-form-item>
			<c-form-item label="地址" required>
				<view @tap="chooseAddress">
					<c-input v-model="formData.address" placeholder="请选择地址" disabled />
				</view>
			</c-form-item>
			<view class="c-gutter-md"></view>

			<c-form-item label="联系人" required>
				<c-input v-model="formData.name" :maxlength="20" placeholder="请输入联系人名称" clear />
			</c-form-item>
			<c-form-item label="手机号" required>
				<c-input v-model="formData.telephone" :maxlength="11" type="number" clear />
			</c-form-item>
			<c-form-item label="微信号" placeholder="选填">
				<c-input v-model="formData.weixin" clear :maxlength="30" />
			</c-form-item>
			
			<c-form-item label="宠物详情" required block>
				<c-input 
					v-model="formData.petDesc" 
					height="110px" 
					type="textarea" 
					placeholder="请输入宠物详情" 
					:maxlength="500" />
			</c-form-item>
			<view class="c-gutter-md"></view>
			
			<c-form-item label="领养要求" required block>
				<c-input 
					v-model="formData.adoptionDesc" 
					height="110px" 
					type="textarea" 
					placeholder="请输入领养要求" 
					:maxlength="500" />
			</c-form-item>
			<view class="c-gutter-md"></view>
			
			<upload-image-card ref="uploadImageCard" title="宠物图片"></upload-image-card>
			<button class="c-submit-button" @tap="sumbitForm">提交</button>
		</c-form>
		<!-- 省市区选择器 -->
		<mpvue-city-picker 
			:themeColor="themeColor" 
			ref="mpvueCityPicker" 
			:pickerValueDefault="cityPickerValueDefault"
			@onConfirm="handleCityPickerConfirm">
		</mpvue-city-picker>
	</c-page>
</template>

<script>
	import uploadImageCard from '@/library/components/upload-image-card'
	import validateConfig from '@/config/validate'
	import mpvueCityPicker from '@/library/components/mpvue-citypicker/mpvueCityPicker.vue'
	import { 
		ageOptions,
		petGenderOptions,
		petSterilizationOptions,
		petVaccinationOptions,
		petFreeOptions
	} from '@/library/constant'
	
	export default {
		components: {
			uploadImageCard,
			mpvueCityPicker
		},
		data () {
			return {
				formData: {
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
					imgList: []
				},
				formRules: {
					a: validateConfig.nonEmpty, 
					petName: [
						{ validator: validateConfig.nonEmpty, message: '请输入宠物昵称' }
					],
					// petClass: [
					// 	{ validator: validateConfig.nonEmpty, message: '请选择宠物类型' },
					// ],
					petGender: [
						{ validator: validateConfig.nonEmpty, message: '请选择宠物性别' }
					],
					petSterilization: [
						{ validator: validateConfig.nonEmpty, message: '请选择是否绝育' }
					],
					petVaccination: [
						{ validator: validateConfig.nonEmpty, message: '请选择是否育苗' }
					],
					free: [
						{ validator: validateConfig.nonEmpty, message: '请选择是否免费' }
					],
					// name: [
					// 	{ validator: validateConfig.nonEmpty, message: '请输入联系人名称' }
					// ],
					// telephone: [
					// 	{ validator: validateConfig.nonEmpty, message: '请输入电话号' },
					// 	{ validator: validateConfig.telephone, message: '请输入正确的电话' }
					// ],
					petDesc: [
						{ validator: validateConfig.nonEmpty, message: '请输入宠物特征' }
					],
					adoptionDesc: [
						{ validator: validateConfig.nonEmpty, message: '请输入领养要求' }
					],
					imgList: [
						{ validator: validateConfig.nonEmpty, message: '请选择宠物图片' }
					]
				},
				ageOptions,
				petGenderOptions,
				petSterilizationOptions,
				petVaccinationOptions,
				petFreeOptions,
				petClassOptions: [],
				agePickerIndex: null,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF'
			}
		},
		computed: {
			// 显示选中的年龄
			petAgeLabel () {
				const ageOption = this.ageOptions[this.agePickerIndex]
				return ageOption ? ageOption.label : ''
			}
		},
		methods: {
			// 获取宠物类型
			fetchPetClassList () {
				this.$http.get('/pet/api/v1/pet/class').then(res => {
					let list = res || []
					this.petClassOptions = list.map(item => {
						return {
							label: item.name,
							value: item.uuid
						}
					})
				})
			},
			// 获取中国省市区数据
			fetchChinaAddressData () {
				this.$http.get('/pet/api/v1/locality').then(res => {
					console.log(res, 'res')
				}).catch(error => {
					console.log(error)
				})
			},
			// 年龄选择器确定事件
			handleAgePickerChange (e) {
				this.agePickerIndex = e.target.value
			},
			// 选择地址
			chooseAddress () {
				this.$refs.mpvueCityPicker.show()
			},
			// 地址选择器确定事件
			handleCityPickerConfirm (data) {
				// data: cityCode、label、value
				this.formData.address = data.label
			},
			// 提交表单
			sumbitForm () {
				this.formData.imgList = this.$refs.uploadImageCard.getImgList()
				
				this.$refs.cForm.validate((valid) => {
					console.log('submit succwss')
					if (valid) {
						console.log('提交完成')
						const postData = this.adapterPostData()
						this.$http.post('/pet/api/v1/adoption/pet').then(res => {
							console.log(res, '提交成功')
							// uni.showToast({
							// 	title: '提交成功'
							// })
							// uni.navigateTo({
							// 	url: '/pages/home'
							// })
						})
					}
				})
			},
			// 适配表单提交的数据
			adapterPostData () {
				let { 
					petName, 
					petAge, 
					petClass, 
					petVariety, 
					address, 
					petGender, 
					petSterilization,
					petVaccination,
					free,
					petDesc,
					adoptionDesc,
					imgList
			  } = this.formData
				
				return {
					pet_name: petName,
					pet_age: petAge[0],
					pet_classid: petClass[0],
					pet_variety: petVariety[0],
					// 地址id
					locality_id: '',
					pet_gender: petGender[0],
					free: free[0],
					pet_vaccine: petVaccination[0],
					pet_sterilization: petSterilization[0],
					pet_disposition: petDesc,
					// todo xx: adoptionDesc
					pet_images: imgList
				}
			}
		},
		onLoad () {
			console.log(this.formRules, 'validateConfig.number')
			this.$app.ready(() => {
				this.fetchPetClassList()
				this.fetchChinaAddressData()
			})
		}
	}
</script>
