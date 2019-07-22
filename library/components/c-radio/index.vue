<template>
	<radio-group @change="radioChange">
		<label class="c-radio-item" v-for="(item, index) in options" :key="item.value">
			<view class="c-radio-radio">
				<radio :value="item.value" :checked="index === current" :disabled="disabled" />
			</view>
			<view class="c-radio-label">{{ item.label || item.value }}</view>
		</label>
	</radio-group>
</template>

<script>
	export default {
		props: {
			options: {
				type: Array,
				default: () => []
			},
			value: {
				default: ''
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				current: null
			}
		},
		methods: {
			radioChange (e) {
				this.handleRadioChange(e.target.value)
			},
			handleRadioChange (value) {
				for (let i = 0; i < this.options.length; i++) {
					if (this.options[i].value === value) {
						this.current = i
						this.$emit('input', this.options[i].value)
						break
					}
				}
			}
		},
		watch: {
			value (val) {
				this.handleRadioChange(val)
			}
		},
		created () {
			if (this.value) {
				this.handleRadioChange(this.value)
			}
		}
	}
</script>

<style lang="scss">
.c-radio-item {
	display: flex;
	padding: 8px 0;
	align-items: center;
}
.c-radio-radio {
	margin-right: 10px;
}
.c-radio-label {
	font-size: 16px;
	color: $M10;
}
</style>
