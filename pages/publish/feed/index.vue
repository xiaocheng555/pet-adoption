<template>
	<c-page title="发布送养">
		<view class="c-gutter-md"></view>
		<c-form class="c-form_label-width-md" ref="cForm" :form="formData" :rules="formRules">
			<c-form-item label="宠物昵称" required no-border-top>
				<c-input v-model="formData.petName" :maxlength="20" placeholder="请输入宠物昵称" clear />
			</c-form-item>
			<c-form-item label="宠物年龄" required no-border-top>
				<picker 
					:value="agePickerIndex" 
					:range="ageOptions" 
					range-key="label" 
					@change="handleAgePickerChange">
					<c-input :value="petAgeLabel" placeholder="请选择宠物年龄" disabled />
				</picker>
			</c-form-item>
			<c-form-item label="宠物种类" required>
				<c-checker v-model="formData.petType">
					<c-checker-item 
						v-for="option in petTypeOptions" 
						:value="option.value"
						:key="option.value">
						{{ option.label }}
					</c-checker-item>
				</c-checker>
			</c-form-item>
			<c-form-item label="宠物性别" required>
				<c-checker v-model="formData.petSex">
					<c-checker-item 
						v-for="option in petSexOptions" 
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
			<view class="c-gutter-md"></view>
			
			<c-form-item label="联系人" required no-border-top>
				<c-input v-model="formData.name" :maxlength="20" placeholder="请输入联系人名称" clear />
			</c-form-item>
			<c-form-item label="地址" required no-border-top>
				<view @tap="chooseAddress">
					<c-input v-model="formData.address" placeholder="请选择地址" disabled />
				</view>
			</c-form-item>
			<c-form-item label="手机号" required>
				<c-input v-model="formData.telephone" :maxlength="11" type="number" clear />
			</c-form-item>
			<c-form-item label="微信号">
				<c-input v-model="formData.weixin" clear :maxlength="30" />
			</c-form-item>
			<view class="c-gutter-md"></view>
			
			<c-form-item label="宠物特征" required block no-border-top>
				<c-input 
					v-model="formData.petDesc" 
					height="110px" 
					type="textarea" 
					placeholder="请输入宠物特征" 
					:maxlength="500" />
			</c-form-item>
			<view class="c-gutter-md"></view>
			
			<c-form-item label="领养要求" required block no-border-top>
				<c-input 
					v-model="formData.feedDesc" 
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
	import Vue from 'vue'
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
					petType: [],
					petSex: [],
					petSterilization: [],
					petVaccination: [],
					name: '',
					telephone: '',
					address: '',
					weixin: '',
					petDesc: '',
					feedDesc: '',
					imgList: []
				},
				formRules: {
					petName: [
						{ validator: validateConfig.nonEmpty, message: '请输入宠物昵称' },
					],
					petType: [
						{ validator: validateConfig.nonEmpty, message: '请选择宠物类型' },
					],
					petSex: [
						{ validator: validateConfig.nonEmpty, message: '请选择宠物性别' },
					],
					petSterilization: [
						{ validator: validateConfig.nonEmpty, message: '请选择是否绝育' },
					],
					petVaccination: [
						{ validator: validateConfig.nonEmpty, message: '请选择是否育苗' },
					],
					name: [
						{ validator: validateConfig.nonEmpty, message: '请输入联系人名称' },
					],
					telephone: [
						{ validator: validateConfig.nonEmpty, message: '请输入电话号' },
						{ validator: validateConfig.telephone, message: '请输入正确的电话' }
					],
					petDesc: [
						{ validator: validateConfig.nonEmpty, message: '请输入宠物特征' },
					],
					feedDesc: [
						{ validator: validateConfig.nonEmpty, message: '请输入领养要求' },
					],
					imgList: [
						{ validator: validateConfig.nonEmpty, message: '请选择宠物图片' },
					]
				},
				agePickerIndex: 1,
				ageOptions: [
					{
						label: '1岁',
						value: 0,
					},
					{
						label: '2岁',
						value: 1,
					}
				],
				// 宠物类型选项
				petTypeOptions: [
					{
						label: '猫',
						value: 0,
					},
					{
						label: '狗',
						value: 1,
					},
					{
						label: '其他',
						value: 2,
					}
				],
				// 宠物性别选项
				petSexOptions: [
					{
						label: '男孩',
						value: 0
					},
					{
						label: '女孩',
						value: 1
					},
					{
						label: '不详',
						value: 2
					}
				],
				petSterilizationOptions: [
					{
						label: '是',
						value: 0
					},
					{
						label: '否',
						value: 1
					},
					{
						label: '不详',
						value: 2
					}
				],
				petVaccinationOptions: [
					{
						label: '是',
						value: 0
					},
					{
						label: '否',
						value: 1
					},
					{
						label: '不详',
						value: 2
					}
				],
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF'
			}
		},
		computed: {
			petAgeLabel () {
				const ageOption = this.ageOptions[this.agePickerIndex]
				return ageOption ? ageOption.label : ''
			}
		},
		methods: {
			// 获取中国省市区数据
			fetchChinaAddressData () {
				this.$http.get('/pet/api/v1/locality').then(res => {
					console.log(res, 'res')
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
				console.log('==========')
				this.formData.imgList = this.$refs.uploadImageCard.getImgList()
				
				this.$refs.cForm.validate((valid) => {
					if (valid) {
						console.log('提交成功')
					}
				})
			}
		},
		onLoad () {
			this.$app.ready(() => {
				console.log(Vue.prototype.$store.state.userInfo.token, 'store')
				this.fetchChinaAddressData()
			})
		}
	}
</script>
