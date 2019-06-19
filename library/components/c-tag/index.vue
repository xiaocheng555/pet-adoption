<template>
	<view class="c-tag">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			
		}
	}
</script>

<style lang="scss">
.c-tag {
	display: inline-block;
	padding: 6px 8px;
	margin-right: 8px;
	border-radius: 6px;
	color: $A06;
	font-size: 14px;
	line-height: 14px;
	background-color: $A01;
}
</style>
