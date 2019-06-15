<template>
	<view>
		<c-header title="发布寻宠"></c-header>
		<view class="c-gutter-md"></view>
		<c-form class="c-form_label-width-md" ref="cForm" :form="formData" :rules="formRules">
			<c-form-item label="联系人" required no-border-top>
				<c-input v-model="formData.name" :maxlength="20" placeholder="请输入联系人名称" clear />
			</c-form-item>
			<c-form-item label="手机号" required>
				<c-input v-model="formData.telephone" :maxlength="11" type="number" clear />
			</c-form-item>
			<c-form-item label="微信号">
				<c-input v-model="formData.weixin" clear :maxlength="30" />
			</c-form-item>
			<view class="c-gutter-md"></view>
			
			<c-form-item class="c-gutter-md" label="宠物种类" required no-border-top>
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
			<c-form-item label="丢失位置" required>
				<view @tap="chooseLocation">
					<c-input v-model="formData.address" placeholder="点击此处选择" disabled />
				</view>
			</c-form-item>
			<view class="c-gutter-md"></view>
			
			<c-form-item label="宠物特征" required block no-border-top>
				<c-input 
					v-model="formData.petDesc" 
					height="140px" 
					type="textarea" 
					placeholder="请输入宠物特征" 
					:maxlength="500" />
			</c-form-item>
			<view class="c-gutter-md"></view>
			
			<upload-image-card ref="uploadImageCard" title="宠物图片"></upload-image-card>
			<button class="c-submit-button" @tap="sumbitForm">提交</button>
		</c-form>
	</view>
</template>

<script>
	import uploadImageCard from '@/library/components/upload-image-card'
	import validateConfig from '@/config/validate'

	export default {
		components: {
			uploadImageCard
		},
		data () {
			return {
				formData: {
					name: '',
					telephone: '',
					weixin: '',
					petType: [],
					petSex: [],
					petDesc: '',
					address: '',
					imgList: []
				},
				formRules: {
					name: [
						{ validator: validateConfig.nonEmpty, message: '请输入联系人名称' },
					],
					telephone: [
						{ validator: validateConfig.nonEmpty, message: '请输入电话号' },
						{ validator: validateConfig.telephone, message: '请输入正确的电话' }
					],
					petType: [
						{ validator: validateConfig.nonEmpty, message: '请选择宠物类型' },
					],
					petSex: [
						{ validator: validateConfig.nonEmpty, message: '请选择宠物性别' },
					],
					address: [
						{ validator: validateConfig.nonEmpty, message: '请选择宠物丢失的地址' },
					],
					petDesc: [
						{ validator: validateConfig.nonEmpty, message: '请输入宠物特征' },
					],
					imgList: [
						{ validator: validateConfig.nonEmpty, message: '请选择宠物图片' },
					]
				},
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
				]
			}
		},
		methods: {
			// 选择地理位置
			chooseLocation () {
				uni.chooseLocation({
					success: (res) => {
						// res.longitude, res.latitude
						this.formData.address = res.address
					}
				})
			},
			// 提交表单
			sumbitForm () {
				this.formData.imgList = this.$refs.uploadImageCard.getImgList()
				
				this.$refs.cForm.validate((valid) => {
					if (valid) {
						console.log('提交成功')
					}
				})
			}
		}
	}
</script>
