<template>
	<checkbox-group @change="checkboxChange">
		<label class="c-checkbox-item" v-for="item in checkboxOptions" :key="item.value">
			<view class="c-checkbox-checkbox">
				<checkbox :value="item.value" :checked="item.checked" :disabled="disabled" />
			</view>
			<view class="c-checkbox-label">{{item.name || item.value}}</view>
		</label>
	</checkbox-group>
</template>

<script>
	export default {
		props: {
			options: {
				type: Array,
				default: () => []
			},
			value: {
				type: Array,
				default: () => []
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				checkboxOptions: []
			}
		},
		methods: {
			checkboxChange (e) {
				let values = e.detail.value
				this.$emit('input', values)
				this.updateOptions(values)
			},
			updateOptions (values) {
				this.checkboxOptions.forEach((option, index) => {
					if (values.includes(option.value)) {
						this.$set(this.checkboxOptions[index], 'checked', true)
					} else {
						this.$set(this.checkboxOptions[index], 'checked', false)
					}
				})
			}
		},
		created () {
			this.checkboxOptions = this.options
			if (this.value.length > 0) {
				this.updateOptions(this.value)
			}
		}
	}
</script>

<style lang="scss">
.c-checkbox-item {
	display: flex;
	padding: 8px 0;
	align-items: center;
}
.c-checkbox-checkbox {
	margin-right: 10px;
}
.c-checkbox-label {
	font-size: 16px;
	color: $M10;
}
</style>
