<template>
	<view class="upload-image">
		<view 
			class="image-item" 
			v-for="(img, index) in imgDataList" 
			:key="index">
			<view class="image-item-inner">
				<view class="image-delete-box" @tap="deleteImage(index)">
					<image class="delete-icon" :src="deleteIcon"></image>
				</view>
				<image class="image" :src="img" mode="aspectFill" @tap="viewImage(index)"></image>
			</view>
		</view>
		<view v-if="addIconShow" class="image-item" @tap="chooseImage">
			<view class="image-item-inner">
				<slot name="add">
					<view class="camera-add-box">
						<image class="camera-add-icon" :src="cameraAddIcon"></image>
					</view>
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
	import cameraAddIcon from './assets/camera-add.svg'
	import deleteIcon from './assets/delete.svg'
	
	export default {
		model: {
			prop: 'imgList',
			event: 'changeImgList'
		},
		props: {
			// 图片地址列表
			imgList: {
				type: Array,
				default: () => []
			},
			// 是否显示图片添加的图标
			addIcon: {
				type: String,
				default: 'auto'
			},
			// 图片张数限制
			count: {
				type: Number,
				default: 9
			},
			// 可以指定是原图还是压缩图，默认二者都有
			sizeType: {
				type: Array,
				default: () => ['original', 'compressed']
			},
			// 可以指定是相册选图还是拍照，默认二者都有
			sourceType: {
				type: Array,
				default: () => ['album', 'camera']
			},
			preview: {
				type: Boolean,
				default: true
			}
		},
		data () {
			return {
				cameraAddIcon,
				deleteIcon,
				imgDataList: []
			}
		},
		computed: {
			addIconShow () {
				let isShow = true
				if (this.addIcon === 'none') {
					isShow = false
				} else if (this.addIcon === 'auto') {
					isShow = this.imgDataList.length < this.count
				} else {
					isShow = true
				}
				return isShow
			}
		},
		methods: {
			// 选择图片
			chooseImage () {
				const imglen = this.imgDataList.length
				if (imglen >= this.count) {
					this.$emit('over-count', this.imgDataList)
					return
				}
				uni.chooseImage({
					count: this.count - imglen,
					sizeType: this.sizeType, 
					sourceType: this.sourceType,
					success: (res) => {
						this.imgDataList = [].concat(this.imgDataList, res.tempFilePaths)
						this.$emit('after-choose', this.imgDataList)
					}
				})
			},
			// 预览图片
			viewImage (index) {
				if (!this.preview) return
				
				uni.previewImage({
					urls: this.imgDataList,
					current: index
				})
			},
			// 删除图片
			deleteImage (index) {
				this.imgDataList.splice(index, 1)
			},
			// 上传图片
			upload () {
				
			}
		},
		watch: {
			imgDataList (val) {
				this.$emit('changeImgList', val)
			},
			imgList (val) {
				this.imgDataList = val
			}
		}
	}
</script>

<style lang="scss" scoped>
.upload-image {
	margin: 0 -5px;
}
.image-item {
	position: relative;
	display: inline-block;
	width: 25%;
	padding-bottom: 25%;
	vertical-align: middle;
}
.image-item-inner {
	box-sizing: border-box;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 6px;
}
.image {
	width: 100%;
	height: 100%;
	border-radius: 3px;
	overflow: hidden;
}
.image-delete-box {
	position: absolute;
	top: 6px;
	right: 6px;
	z-index: 1;
	padding: 5px 7px;
	background-color: rgba(0, 0, 0, 0.5);
}
.delete-icon {
	display: block;
	width: 8px;
	height: 8px;
}
.camera-add-box {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	border: 0.5px solid $M04;
	border-radius: 3px;
	overflow: hidden;
	background-color: #ffffff;
}
.camera-add-icon {
	width: 30px;
	height: 30px;
}
</style>