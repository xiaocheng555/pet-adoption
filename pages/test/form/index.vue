<template>
	<view>
		<c-form ref="cForm" :form="formData">
			<c-form-item label="姓名" required no-border-top>
				<c-input v-model="formData.name" placeholder="年龄" clear />
			</c-form-item>
			<c-form-item label="年龄">
				<c-input v-model="formData.age" placeholder="年龄" clear />
			</c-form-item>
			<c-form-item label="对象">
				<c-input v-model="formData.obj.value" clear />
			</c-form-item>
			<upload-image-card></upload-image-card>
			<c-form-item label="种类(单选)" required no-border-top style="margin-top: 10px;">
				<c-checker v-model="checkedList">
					<c-checker-item value="dog">狗</c-checker-item>
					<c-checker-item value="cat">猫</c-checker-item>
					<c-checker-item value="turst">乌龟</c-checker-item>
					<c-checker-item value="rabbit">兔子</c-checker-item>
					<c-checker-item value="mouse">老鼠</c-checker-item>
					<c-checker-item value="other">其他</c-checker-item>
				</c-checker>
			</c-form-item>
			<c-form-item label="种类(多选)" required>
				<c-checker v-model="checkedList2" multiple>
					<c-checker-item value="dog">狗</c-checker-item>
					<c-checker-item value="cat">猫</c-checker-item>
					<c-checker-item value="other">其他</c-checker-item>
				</c-checker>
			</c-form-item>
			<c-form-item class="c-padding-bottem-sm" label="多选框测试" :required="true" block>
				<c-checkbox :options="checkbox1" v-model="checkboxVal1"></c-checkbox>
			</c-form-item>
			{{checkboxVal1}}
			<button @tap="sumbit">submit</button>
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
					obj: {
						value: ''
					}
				},
				formRules: {
					name: [
						{
							required: true,
							message: '请输入名字'
						},
						{
							min: 3,
							max: 5,
							message: '3-5个字'
						}
					],
					age: {
						required: true,
						message: '请输入年龄'
					},
					obj: {
						type: "object",
						fields: {
							value: [
								{
									validator: validateConfig.nonEmpty, message: `obj不能为空`
								}
							]
						}
					}
				},
				checkedList: [],
				checkedList2: [],
				checkbox1: [
					{ value: '寒暑假、毕业不能带回家，另想办法处理' },
					{ value: '不抛弃不放弃，一直带在身边' }
				],
				checkboxVal1: ['不抛弃不放弃，一直带在身边']
			}
		},
		methods: {
			sumbit () {
				console.log(this.checkedList, this.checkedList2, '===')
				this.$refs.cForm.validate((valid) => {
					if (valid) {
						console.log('提交成功')
					}
				})
			},
		},
		mounted () {
			console.log(this.formRules, 'formRules')
			this.$refs.cForm.initRules(this.formRules)
		}
	}
</script>

<style>
</style>
