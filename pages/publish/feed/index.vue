<template>
	<c-page title="发布送养">
		<template v-if="!showSuccessTip">
			<view class="c-gutter-md"></view>
			<c-form class="c-form_label-width-md" ref="cForm" :form="formData">
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
					<!-- 省市区选择器 -->
					<citypicker 
						v-if="cityData" 
						:city-data="cityData" 
						@confirm="handleCitypickerConfirm">
						<c-input v-model="formData.address" placeholder="请选择地址" disabled />
					</citypicker>
				</c-form-item>
				<view class="c-gutter-md"></view>

				<!-- <c-form-item label="联系人" required>
					<c-input v-model="formData.name" :maxlength="20" placeholder="请输入联系人名称" clear />
				</c-form-item>
				<c-form-item label="手机号" required>
					<c-input v-model="formData.telephone" :maxlength="11" type="number" clear />
				</c-form-item>
				<c-form-item label="微信号" placeholder="选填">
					<c-input v-model="formData.weixin" clear :maxlength="30" />
				</c-form-item> -->
				
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
		</template>
		<template v-else>
			<submit-tip-bar />
		</template>
	</c-page>
</template>

<script>
	import uploadImageCard from '@/library/components/upload-image-card'
	import SubmitTipBar from '@/library/components/submit-tip-bar'
	import Citypicker from '@/library/components/citypicker'
	import validateConfig from '@/config/validate'
	import { mapState } from 'vuex'
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
			SubmitTipBar,
			Citypicker
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
					petName: [
						{ validator: validateConfig.nonEmpty, message: '请输入宠物昵称' }
					],
					petAge:  [
						{ validator: validateConfig.nonEmpty, message: '请选择宠物年龄' }
					],
					petClass: [
						{ validator: validateConfig.nonEmpty, message: '请选择宠物类型' },
					],
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
					address: [
						{ validator: validateConfig.nonEmpty, message: '请选择地址' }
					],
					// name: [
					// 	{ validator: validateConfig.nonEmpty, message: '请输入联系人名称' }
					// ],
					// telephone: [
					// 	{ validator: validateConfig.nonEmpty, message: '请输入电话号' },
					// 	{ validator: validateConfig.telephone, message: '请输入正确的电话' }
					// ],
					petDesc: [
						{ validator: validateConfig.nonEmpty, message: '请输入宠物描述' }
					],
					adoptionDesc: [
						{ validator: validateConfig.nonEmpty, message: '请输入领养要求' }
					],
					imgList: [
						// { validator: validateConfig.nonEmpty, message: '请选择宠物图片' }
					]
				},
				ageOptions,
				petGenderOptions,
				petSterilizationOptions,
				petVaccinationOptions,
				petFreeOptions,
				agePickerIndex: null,
				localityId: null,
				// 是否显示提交成功的提示
				showSuccessTip: false
			}
		},
		computed: {
			...mapState([
	      'cityData',
	      'petClassOptions'
	    ]),
			// 显示选中的年龄
			petAgeLabel () {
				const ageOption = this.ageOptions[this.agePickerIndex]
				return ageOption ? ageOption.label : ''
			}
		},
		methods: {
			// 年龄选择器确定事件
			handleAgePickerChange (e) {
				this.agePickerIndex = e.target.value
				const ageOption = this.ageOptions[this.agePickerIndex]
				this.formData.petAge = ageOption.value
			},
			// 地址选择器的确认事件
			handleCitypickerConfirm ({labels, values}) {
				this.formData.address = labels.join('-')
				this.localityId = values[2]
			},
			// 提交表单
			sumbitForm () {
				this.formData.imgList = this.$refs.uploadImageCard.getImgList()
				
				this.$refs.cForm.validate((valid) => {
					if (valid) {
						const postData = this.adapterPostData()
						uni.showLoading({
							title: '正在提交'
						})
						this.$http.post('/pet/api/v1/adoption/pet', postData).then(() => {
							uni.hideLoading()
							this.showSuccessTip = true
						}).catch(error => {
							uni.showToast({
								icon: 'none',
								title: '提交失败'
							})
							console.error('提交失败:', error)
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
					pet_age: petAge,
					pet_classid: petClass[0],
					pet_variety: petVariety[0],
					// 地址id
					locality_name: address,
					locality_id: this.localityId,
					pet_gender: petGender[0],
					free: free[0],
					pet_vaccine: petVaccination[0],
					pet_sterilization: petSterilization[0],
					pet_disposition: petDesc,
					adoption_request: adoptionDesc,
					pet_images: imgList
				}
			}
		},
		onLoad () {
			this.$app.ready(() => {
				this.$refs.cForm.initRules(this.formRules)
			})
		}
	}
</script>
