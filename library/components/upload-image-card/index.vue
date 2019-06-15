<template>
	<view class="upload-image-card">
		<view class="card-header">
			<text class="card-header-title">{{ title }}</text>
			<view class="card-header-right">
				{{ imgList.length }}/{{ count }}
			</view>
		</view>
		<view class="card-body">
			<upload-image v-model="imgList" ref="uploadImage" :count="count"></upload-image>
		</view>
	</view>
</template>

<script>
	import uploadImage from '@/library/components/upload-image'
	
	export default {
		components: {
			uploadImage
		},
		props: {
			title: {
				type: String,
				default: '图片上传'
			}
		},
		data () {
			return {
				imgList: [],
				count: 9
			}
		},
		methods: {
			// 上传图片
			upload () {
				return this.$refs.uploadImage.upload()
			},
			// 获取图片列表
			getImgList () {
				return this.imgList
			}
		}
	}
</script>

<style lang="scss" scoped>
.upload-image-card {
	background-color: #ffffff;
}
.card-header {
	display: flex;
	padding: 0 16px;
	font-size: 16px;
	line-height: 54px;
	color: $M10;
	align-items: center;
}
.card-header-title {
	flex: 1;
}
.card-header-right {
	width: 100px;
	text-align: right;
	color: $M08;
}
.card-body {
	padding: 0 16px 10px;
}

</style>
