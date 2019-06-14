<template>
	<view>
		<c-form ref="cForm" v-model="form" :rules="formRules" label-width="65px">
			<c-form-item label="姓名" required no-border-top>
				<c-input v-model="form.age" placeholder="年龄" clear />
			</c-form-item>
			<c-form-item label="年龄">
				<c-input v-model="form.age" placeholder="年龄" clear />
			</c-form-item>
		</c-form>
		<upload-image-card></upload-image-card>
		<button @tap="sumbit">submit</button>
	</view>
</template>

<script>
	import uploadImageCard from '@/library/components/upload-image-card'
	export default {
		components: {
			uploadImageCard
		},
		data () {
			return {
				form: {
					name: ''
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
					}
				}
			}
		},
		methods: {
			sumbit () {
				this.$refs.cForm.validate((valid) => {
					if (valid) {
						console.log('提交成功')
					}
				})
			}
		}
	}
</script>

<style>
</style>
