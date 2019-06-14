<template>
	<view>
		<c-form ref="cForm" :form="form" :rules="formRules" label-width="82px">
			<c-form-item label="姓名" required no-border-top>
				<c-input v-model="form.name" placeholder="年龄" clear />
			</c-form-item>
			<c-form-item label="年龄">
				<c-input v-model="form.age" placeholder="年龄" clear />
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
			<button @tap="sumbit">submit</button>
		</c-form>
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
				},
				checkedList: [],
				checkedList2: []
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
			}
		}
	}
</script>

<style>
</style>
