<template>
	<form>
		<slot></slot>
	</form>
</template>

<script>
	import schema from 'async-validator'
	
	export default {
		props: {
			form: {
				type: Object,
				default: () => ({})
			},
			rules: {
				
			}
		},
		data () {
			return {
				validator: null
			}
		},
		methods: {
			validate (callback) {
				console.log('validate --')
				this.validator.validate(this.form, (errors, fields) => {
					if(errors) {
						console.log(errors, 'error')
						uni.showToast({
							icon: 'none',
							title: errors[0].message
						})
						callback(false, errors)
					} else {
						console.log('true')
						callback(true)
					}
				})
			}
		},
		created () {
			console.log(this.rules, 'this.rules')
			this.validator = new schema(this.rules)
			console.log(JSON.stringify(this.rules), 'json')
		},
		beforeDestroy () {
			this.validator = null
		}
	}
</script>

<style>
</style>
