<template>
	<view>
		<feed-list-home 
			v-if="type === 'home'" 
			:list="list"
			@item-click="handleItemClick">
		</feed-list-home>
		<feed-list-user 
			v-if="type === 'user'" 
			:list="list"
			@item-click="handleItemClick">
		</feed-list-user>
	</view>
</template>

<script>
	import FeedListHome from './feed-list-home'
	import FeedListUser from './feed-list-user'
	
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
			},
			type: {
				type: String,
				default: 'home'
			}
		},
		components: {
			FeedListHome,
			FeedListUser
		},
		methods: {
			handleItemClick (...arg) {
				this.$emit('item-click', ...arg)
			}
		}
	}
</script>

<style lang="scss">
</style>
