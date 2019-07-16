<template>
	<c-page title="申请领养">
		<template v-if="!showSuccessTip">
			<c-form class="c-form_label-row" ref="cForm" :form="formData">
				<view v-for="(item, key) in formData" :key="key">
					<view class="c-gutter-md"></view>
					<!-- 单选框 radio -->
					<template v-if="item.type === 'radio'">
						<c-form-item class="c-padding-bottem-sm" :label="item.label" :required="item.required" block>
							<c-radio :options="item.options" v-model="item.value"></c-radio>
						</c-form-item>
					</template>
					<!-- 多选框 -->
					<template v-else-if="item.type === 'checkbox'">
						<c-form-item class="c-padding-bottem-sm" :label="item.label" :required="item.required" block>
							<c-checkbox :options="item.options" v-model="item.value"></c-checkbox>
						</c-form-item>
					</template>
					<!-- 富文本框 textarea -->
					<template v-else>
						<c-form-item :label="item.label" :required="item.required" block>
							<c-input 
								v-model="item.value" 
								:height="item.height || '110px'" 
								type="textarea" 
								:placeholder="item.placeholder" 
								:maxlength="500" />
						</c-form-item>
					</template>
				</view>
			</c-form>
			<view class="footer"></view>
			<view class="c-submit-button-fixed">
				<button class="c-submit-button" @tap="sumbitForm">提交</button>
			</view>
		</template>
		<template v-else>
			<submit-tip-bar />
		</template>
	</c-page>
</template>

<script>
	import SubmitTipBar from '@/library/components/submit-tip-bar'
	import validateConfig from '@/config/validate'
	import dogFormData from './form-data/dog.js'
	import catFormData from './form-data/cat.js'
	import otherFormData from './form-data/other.js'
	import { PET_CLASS_ID, PET_APPLY_STATE } from '@/library/constant'
	
	export default {
		components: {
			SubmitTipBar
		},
		data () {
			return {
				formData: {},
				formRules: {},
				petClassId: null,
				petId: null,
				showSuccessTip: false
			}
		},
		methods: {
			// 初始化formData数据
			initFormData () {
				let form
				if (this.petClassId === PET_CLASS_ID.dog) {
					form = dogFormData
				} else if (this.petClassId === PET_CLASS_ID.cat) {
					form = catFormData
				} else {
					form = otherFormData
				}
				
				const _formData = {}
				form.forEach((item, index) => {
					let key = 'question' + index + 1
					_formData[key] = {}
					// 题号
					_formData[key].no = index + 1
					// label值 = 题号+问题
					_formData[key].label = `${index + 1}. ${item.label}`
					// 是否必填
					_formData[key].required = !(item.required === false)
					// 富文本高度
					_formData[key].height = item.height
					// 富文本占位符文字
					if (item.placeholder) {
						_formData[key].placeholder = item.placeholder
					} else {
						_formData[key].placeholder = _formData[key].required ? '请输入' : '选填'
					}
					// 类型，支持radio、textarea、checkbox
					_formData[key].type = item.type
					// 选项，仅用于radio、checkbox
					_formData[key].options = item.options
					// 输入值
					_formData[key].value = item.type === 'checkbox' ? [] : ''
				})
				this.formData = _formData
			},
			// 初始化表单验证规则
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
			// 提交表单
			sumbitForm () {
				this.$refs.cForm.validate((valid) => {
					if (valid) {
						this.$http.post(`/pet/api/v1/adoption/pet/${this.petId}/application`, {
							state: PET_APPLY_STATE.wait,
							infos: JSON.stringify(this.formData),
						}).then(() => {
							this.showSuccessTip = true
						}).catch(() => {
							uni.showToast({
								icon: 'none',
								title: '提交失败'
							})
						})
					}
				})
			}
		},
		onLoad (params) {
			this.petClassId = params.petClassId
			this.petId = params.petId
		},
		created () {
			this.$nextTick(() => {
				this.initFormData()
				this.initFormRules()
			})
		}
	}
</script>

<style>
	.footer {
		padding-bottom: 80px;
	}
</style>
