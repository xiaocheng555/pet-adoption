<template>
	<view class="upload-image-card">
		<view class="card-header">
			<view class="card-header-title">
				{{ title }}
				<view class="card-header-tip" v-if="uploadingCount !== 0">
					[ 上传中<view class="card-header-loading"></view> ]
				</view>
			</view>
			<view class="card-header-right">
				{{ imgList.length }}/{{ count }}
			</view>
		</view>
		<view class="card-body">
			<upload-image 
				v-model="imgList" 
				ref="uploadImage" 
				:count="count"
				@onBefore="uploadBefore"
				@onSuccess="uploadSuccess"
				@onFail="uploadFail">
			</upload-image>
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
				count: 9,
				// 正在上传的图片个数
				uploadingCount: 0
			}
		},
		methods: {
			// 图片上传前的事件
			uploadBefore (src) {
				this.uploadingCount++
			},
			// 图片上传前的事件
			uploadSuccess (res) {
				this.uploadingCount--
			},
			uploadFail (err) {
				this.uploadingCount--
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
	color: $uni-color-title;
	align-items: center;
}
.card-header-title {
	flex: 1;
}
.card-header-tip {
	display: inline-block;
	font-size: 15px;
	color: $M08;
	margin-left: 12px;
}
.card-header-loading {
	display: inline-block;
  width: 10px;
	height: 10px;
	margin-left: 8px;
	margin-right: 3px;
  animation: circle infinite .75s linear;
  border: 1px solid #1897F2;
  border-top-color: transparent;
  border-radius: 100%;
}
.card-header-right {
	width: 100px;
	text-align: right;
	color: $M08;
}
.card-body {
	padding: 0 16px 10px;
}

@keyframes circle {
  0% {
    transform:rotate(0)
  }
  100% {
    transform:rotate(360deg)
  }
}

</style>
