<template>
	<view class="apply-list">
		<view 
			v-for="(item, index) in list" 
			:key="index"
			@tap="handleItemClick(item, index)">
			申请{{index}}
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: () => []
		}
	},
	data () {
		return {
		}
	},
	methods: {
		handleItemClick (item) {
			this.$emit('item-click', item)
		}
	}
}
</script>

<style lang="scss">

</style>
