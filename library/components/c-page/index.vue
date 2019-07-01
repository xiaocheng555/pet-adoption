<template>
	<view class="c-page">
		<c-header v-if="hasHeader" :title="title" :has-back="hasBack"></c-header>
	  <slot></slot>
	</view>
</template>

<script>
	export default {
		components: {
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			hasBack: {
				type: Boolean,
				default: true
			},
			hasHeader: {
				type: Boolean,
				default: true
			}
		}
	}
</script>
