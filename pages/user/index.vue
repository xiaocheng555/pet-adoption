<template>
	<view>
		<view class="cu-list menu sm-border margin-top">
			<view class="cu-item">
				<navigator class="content" hover-class='none' url="/pages/user/apply/index" navigateTo>
					<text class="cuIcon-like text-red"></text>
					<text class="text-grey">我的申请</text>
				</navigator>
			</view>
			<view class="cu-item">
				<navigator class="content" hover-class='none' url="/pages/user/feed/index" navigateTo>
					<text class="cuIcon-baby text-mauve"></text>
					<text class="text-grey">我的送养</text>
				</navigator>
			</view>
			<view class="cu-item">
				<navigator class="content" hover-class='none' url="/pages/user/owner-search/index" navigateTo>
					<text class="cuIcon-profile text-orange"></text>
					<text class="text-grey">我的寻主启示</text>
				</navigator>
			</view>
			<view class="cu-item">
				<navigator class=" content" hover-class='none' url="/pages/user/pet-search/index" navigateTo>
					<text class="cuIcon-search text-olive"></text>
					<text class="text-grey">我的寻宠启示</text>
				</navigator>
			</view>
		</view>
		<view class="cu-list menu sm-border margin-top">
			<view class="cu-item">
				<view class="content" @tap="previewImage">
					<text class="cuIcon-appreciatefill text-red"></text>
					<text class="text-grey">赞赏支持</text>
					<image src=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import rewardImgUrl from '@/static/reward-qr-code.png'
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {
			previewImage () {
				uni.previewImage({
					current: 0,
					urls: [rewardImgUrl]
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
