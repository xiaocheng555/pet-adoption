<template>
	<c-page title="申请领养">
		<c-form class="form c-form_label-row" ref="cForm" :form="formData">
			<view v-for="(item, key) in formData" :key="key">
				<view class="c-gutter-md"></view>
				<c-form-item :label="item.label" :required="item.required" block>
					<c-input 
						v-model="item.value" 
						height="110px" 
						type="textarea" 
						:placeholder="item.placeholder" 
						:maxlength="500" />
				</c-form-item>
			</view>
		</c-form>
		<view class="c-submit-button-fixed">
			<button class="c-submit-button" @tap="sumbitForm">提交</button>
		</view>
	</c-page>
</template>

<script>
	import validateConfig from '@/config/validate'
	import dogFormData from './form-data/dog.js'

	export default {
		data () {
			return {
				formData: {},
				formRules: {}
			}
		},
		methods: {
			// 初始化formData数据
			initFormData (form) {
				console.log(form, 'dog')
				const _formData = {}
				form.forEach((item, index) => {
					let key = 'question' + index
					_formData[key] = {} 
					// 输入值
					_formData[key].value = ''
					// 题号
					_formData[key].no = index + 1
					// label值 = 题号+问题
					_formData[key].label = `${index + 1}. ${item.label}`
					// 是否必填
					_formData[key].required = !(item.required === false)
					// 占位符文字
					if (item.placeholder) {
						_formData[key].placeholder = item.placeholder
					} else {
						_formData[key].placeholder = _formData[key].required ? '请输入' : '选填'
					}
				})
				this.formData = _formData
			},
			initFormRules () {
				for (const [key, item] of Object.entries(this.formData)) {
					if (item.required) {
						this.formRules[key] = {
							type: 'object',
							fields: {
								value: [
									{
										validator: validateConfig.nonEmpty, message: `第${item.no}题不能为空`
									}
								]
							}
						}
					}
				}
				this.$refs.cForm.initRules(this.formRules)
			},
			sumbitForm () {
				this.$refs.cForm.validate((valid) => {
					if (valid) {
						console.log('submit succwss')
					} else {
						console.log('error')
					}
				})
			}
		},
		created () {
			this.$nextTick(() =>{
				this.initFormData(dogFormData)
				this.initFormRules()
			})
		}
	}
</script>

<style>
.form {
	padding-bottom: 100px;
}
</style>
