<template>
	<view>
		<c-header title="发布寻宠"></c-header>
		<view class="c-gutter-md"></view>
		<c-form ref="cForm" :form="formData" :rules="formRules" label-width="82px">
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
					<c-input v-model="formData.address" disabled />
				</view>
			</c-form-item>
			<c-form-item label="宠物特征" required>
				<c-input 
					v-model="formData.petDesc" 
					height="140px" 
					type="textarea" 
					placeholder="请输入宠物特征" 
					:maxlength="500" />
			</c-form-item>
			<view class="c-gutter-md"></view>
			
			<upload-image-card title="宠物图片"></upload-image-card>
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
					address: ''
				},
				formRules: {
					name: [  ],
					age: {
						required: true,
						message: '请输入年龄'
					}
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
			// 提交表单
			sumbitForm () {
				this.$refs.cForm.validate((valid) => {
					if (valid) {
						console.log('提交成功')
					}
				})
			},
			chooseLocation () {
				uni.chooseLocation({
					success: (res) => {
						// res.longitude, res.latitude
						this.formData.address = res.address
					}
				})
			}
		}
	}
</script>

<style lang="less">

</style>
