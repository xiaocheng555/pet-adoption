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
			}
		},
		data () {
			return {
				rules: {}
			}
		},
		methods: {
			initRules (rules) {
				this.rules = rules
			},
			validate (callback) {
				const validator = new schema(this.rules)
				validator.validate(this.form, (errors, fields) => {
					if(errors) {
						uni.showToast({
							icon: 'none',
							title: errors[0].message
						})
						callback(false, errors)
					} else {
						callback(true)
					}
				})
			}
		},
		beforeDestroy () {
			this.validator = null
		}
	}
</script>

<style>
</style>
