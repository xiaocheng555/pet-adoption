<template>
	<view>
		<loading-test></loading-test>
		<form-test></form-test>
	</view>
</template>

<script>
	import FormTest from './form'
	import LoadingTest from './loading'
	export default {
		components: {
			FormTest,
			LoadingTest
		},
		created () {
			
		}
	}
</script>

<style>
</style>
