<template>
	<view class="grid-images">
		<block v-for="(item, index) in list" :key="index">
			<view class="grid-images-item" v-if="index <= limit - 1">
				<view class="grid-images-inner">
					<view class="grid-images-box">
						<image 
							class="grid-images-image" 
							:src="item" 
							:mode="mode"
							:lazy-load="lazy"
							@tap.stop="previewImage"></image>
							<view 
								class="grid-images-flag" 
								v-if="list.length > limit && index === limit - 1">
								{{ list.length }}张
							</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
			},
			mode: {
				type: String,
				default: 'aspectFill'
			},
			lazy: {
				type: Boolean,
				default: true
			},
			limit: {
				type: Number,
				default: 9
			}
		},
		methods: {
			// 预览图片
			previewImage (index) {
				uni.previewImage({
					current: index || 0,
					urls: this.list
				})
			}
		}
	}
</script>

<style lang="scss">
.grid-images {
	margin: -5px;
	margin-bottom: 9px;
}
.grid-images-item {
	display: inline-block;
	box-sizing: border-box;
	width: 33.33%;
	padding: 5px;
	vertical-align: top;
}
.grid-images-inner {
	position: relative;
	width: 100%;
	padding-bottom: 100%;
}
.grid-images-box {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.grid-images-image {
	display: block;
	width: 100%;
	height: 100%;
	border-radius: 6px;
}
.grid-images-flag {
	position: absolute;
	bottom: 0;
	right: 0;
	padding: 5px 10px;
	border-radius: 6px 0 6px 0;
	font-size: 14px;
	line-height: 14px;
	font-weight: 500;
	color: #ffffff;
	background-color: rgba(0, 0, 0, .4);
}
</style>
