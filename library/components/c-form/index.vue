<template>
	<form>
		<slot></slot>
	</form>
</template>

<script>
	import schema from 'async-validator'
	
	export default {
		model: {
			prop: 'formData',
			event: 'changeFormData'
		},
		provide () {
			return {
				'cForm': this
			}
		},
		props: {
			formData: {
				type: Object,
				default: () => ({})
			},
			rules: {
				type: Object,
				default: () => ({})
			},
			labelWidth: {
				type: String
			}
		},
		data () {
			return {
				validator: null
			}
		},
		methods: {
			validate (callback) {
				this.validator.validate(this.formData, (errors, fields) => {
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
		created () {
			this.validator = new schema(this.rules)
		},
		beforeDestroy () {
			this.validator = null
		}
	}
</script>

<style>
</style>
