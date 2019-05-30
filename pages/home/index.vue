<template>
	<view>
		<view>content</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {

		},
		mounted () {
			this.$http('news-list', {
				loading: true
			})
		}
	}
</script>

<style lang="scss">

</style>
