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
				<image class="image" :src="img" mode="aspectFill" lazy-load @tap="viewImage(index)"></image>
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
	
	// 图片上传使用oss
	const OSS = {
		host: '',
		dir: '',
		policy: null,
		signature: null,
		accessid: null
	}
	
	// 图片查看地址，key后面接上传时的图片名称
	const IMAGE_VIEW_URL = 'https://pet.xpressiot.com/pet/static/img?key='
	
	export default {
		props: {
			// 图片地址列表
			value: {
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
			// 可以指定是原图还是压缩图，默认compressed；【全部['original', 'compressed']】
			sizeType: {
				type: Array,
				default: () => ['compressed']
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
				imgDataList: [],
				oosData: {
					policy: null,
					signature: null,
					accessid: null
				}
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
			// 获取图片上传oos参数
			fetchOosData () {
			  this.$http.get('/pet/api/v1/oss').then(res => {
					OSS.host = `http://${res.dir}.${res.host}`
					OSS.dir = res.dir
					OSS.policy = res.policy
					OSS.signature = res.signature
					OSS.accessid = res.accessid
				})
			},
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
						const chooseImgs = res.tempFilePaths
						console.log(res, 'res image')
						this.uploadImages(chooseImgs)
					}
				})
			},
			// 上传图片
			uploadImages (images) {
				images.forEach(img => {
					this.$emit('onBefore', img)
					const {
						host,
						dir,
						policy,
						signature,
						accessid
					} = OSS
					// 文件扩展名
					let extIndex = img.lastIndexOf('.');
					let ext = img.substring(extIndex)
					// 文件名
					let fileName = new Date().getTime() + ext
					let filekey = `${dir}/${fileName}`
					uni.uploadFile({
						url: host,
						filePath: img,
						fileType: 'image',
						name: 'file',
						formData:{
							name: img,
							'key': filekey,
							//让服务端返回200,不然，默认会返回204
							'success_action_status' : '200', 
							'policy': policy,
							'OSSAccessKeyId': accessid, 
							'signature': signature
						},
						success: (res) => {
							if (res.statusCode === 200) {
								const imgPath = IMAGE_VIEW_URL + fileName
								this.imgDataList.push(imgPath)
								this.$emit('onSuccess', res)
							} else {
								this.$emit('onFail', err)
							}
						},
						fail: (err) => {
							this.$emit('onFail', err)
						}
					})
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
			}
		},
		watch: {
			imgDataList (val) {
				this.$emit('input', val)
			},
			value (val) {
				this.imgDataList = val
			}
		},
		created () {
			this.fetchOosData()
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
	border-radius: 0 3px 0 3px;
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