<template>
	<view class="c-page">
		<c-header v-if="hasHeader" :title="title" :has-back="hasBack"></c-header>
		<c-inline-loading align="center" v-if="pageLoading"></c-inline-loading>
		<view v-else>
	  	<slot></slot>
		</view>		
	</view>
</template>

<script>
	export default {
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
		},
		data () {
			return {
				pageLoading: true
			}
		},
		mounted () {
			this.pageLoading = false
		}
	}
</script>
